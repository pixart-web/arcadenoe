// Gera preview/ — cópia da exportação estática (out/) com caminhos relativos,
// para abrir a demonstração em qualquer subpasta ou alojamento de ficheiros estáticos
// (por exemplo, um Artifact ou um link de pré-visualização) sem configurar basePath.
// Uso: npm run build && npm run preview:bundle
import { cpSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const src = 'out';
const dest = 'preview';
rmSync(dest, { recursive: true, force: true });
cpSync(src, dest, { recursive: true });
// Alguns alojamentos reservam nomes começados por "_": os recursos passam de _next/ para assets/.
renameSync(join(dest, '_next'), join(dest, 'assets'));
for (const f of ['404.html', 'index.txt', 'sitemap.xml']) rmSync(join(dest, f), { force: true });
rmSync(join(dest, '404'), { recursive: true, force: true });
rmSync(join(dest, '_not-found'), { recursive: true, force: true });
// Chunks que as páginas exportadas não usam (rotas internas do Next e manifestos do Pages Router).
const chunks = join(dest, 'assets', 'static', 'chunks');
for (const d of ['pages', 'app/_not-found', 'app/(root)', 'app/robots.txt', 'app/sitemap.xml']) rmSync(join(chunks, d), { recursive: true, force: true });
for (const d of readdirSync(join(dest, 'assets', 'static'))) {
  if (!['chunks', 'css', 'media'].includes(d)) rmSync(join(dest, 'assets', 'static', d), { recursive: true, force: true });
}

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

/** "/pt/servicos/?motivo=x#y" -> "<root>pt/servicos/index.html?motivo=x#y" */
const toRelative = (root, url) => {
  const m = url.match(/^\/([^?#]*)([?#].*)?$/);
  if (!m) return url;
  let [, path, rest = ''] = m;
  if (path === '' || path.endsWith('/')) path += 'index.html';
  return root + path + rest;
};

// O runtime do webpack carrega chunks a partir de "/_next/": passa a derivar o caminho do próprio script.
for (const file of walk(join(dest, 'assets'))) {
  if (!file.endsWith('.js')) continue;
  const js0 = readFileSync(file, 'utf8');
  // U+FFFD literal (polyfill de TextDecoder) passa a escape, para alojamentos que rejeitam esse carácter.
  const js = js0.replaceAll('/_next/', '/assets/').replaceAll('\uFFFD', '\\uFFFD');
  if (!/webpack-[\w-]+\.js$/.test(file)) { if (js !== js0) writeFileSync(file, js); continue; }
  const patched = js.replace(
    /\.p="\/assets\/"/,
    '.p=(function(){try{var s=document.currentScript&&document.currentScript.src;if(s)return s.replace(/static\\/chunks\\/.*$/,"")}catch(e){}return"/assets/"})()',
  );
  if (patched === js) console.warn('Aviso: publicPath não encontrado em', file);
  writeFileSync(file, patched);
}

// As folhas de estilo referem as fontes com caminhos absolutos.
for (const file of walk(join(dest, 'assets', 'static', 'css'))) {
  writeFileSync(file, readFileSync(file, 'utf8').replaceAll('url(/_next/static/', 'url(../').replaceAll("url('/fonts/", "url('../../../fonts/").replaceAll('url(/fonts/', 'url(../../../fonts/'));
}

let count = 0;
for (const file of walk(dest)) {
  if (!file.endsWith('.html')) { if (file.endsWith('.txt')) rmSync(file); continue; }
  const depth = relative(dest, file).split(sep).length - 1;
  const root = depth === 0 ? './' : '../'.repeat(depth);
  let html = readFileSync(file, 'utf8').replaceAll('/_next/', '/assets/');
  html = html.replace(/(href|src)="(\/(?!\/)[^"]*)"/g, (_, attr, url) => `${attr}="${toRelative(root, url)}"`);
  html = html.replace(/srcset="([^"]*)"/gi, (_, list) => `srcSet="${list.replace(/(^|,\s*)\/(?!\/)/g, `$1${root}`)}"`);
  // Referências a recursos dentro do payload RSC (folhas de estilo e chunks que o React volta a inserir).
  html = html.replace(/(\\?")\/(assets\/|fonts\/|images\/|favicon\.svg)/g, (_, q, rest) => `${q}${root}${rest}`);
  // Links criados depois da hidratação (React) mantêm caminhos absolutos: interceta-os no clique.
  const shim = `<script>(function(){var R=${JSON.stringify(root)};document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="/"]');if(!a||a.target||e.metaKey||e.ctrlKey||e.shiftKey||e.button!==0)return;var u=a.getAttribute('href');if(u.slice(0,2)==='//')return;var m=u.match(/^\\/([^?#]*)([?#].*)?$/);var p=m[1];if(p===''||p.slice(-1)==='/')p+='index.html';e.preventDefault();location.href=R+p+(m[2]||'');},true);})();</script>`;
  html = html.replace('</head>', `${shim}</head>`);
  writeFileSync(file, html);
  count++;
}
// A raiz da demonstração é uma página mínima que encaminha para a versão portuguesa.
writeFileSync(
  join(dest, 'index.html'),
  `<title>Arca de Noé — novo site</title>
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=pt/index.html">
<style>
  :root { --bg: #faf8f3; --fg: #173f38; }
  body { background: var(--bg); color: var(--fg); font: 16px/1.5 system-ui, sans-serif; padding-block: 24px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
  a { color: var(--fg); font-weight: 600; }
</style>
<p>Proposta de redesign — PIXART · <a href="pt/index.html">Abrir a demonstração do Centro Veterinário Arca de Noé</a></p>
`,
);
console.log(`preview/ gerado: ${count} páginas HTML com caminhos relativos.`);
