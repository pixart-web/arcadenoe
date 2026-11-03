// Testes de fumo sobre a exportação estática servida localmente.
// Uso: npm run build && npm start (noutro terminal) && npm run test:e2e
// Requer Playwright (não é dependência do projeto: usa a instalação global/local disponível).
import { chromium } from 'playwright';

const base = process.env.BASE_URL || 'http://localhost:3000';
const routes = {
  pt: ['/pt/', '/pt/a-clinica/', '/pt/servicos/', '/pt/produtos/', '/pt/contactos/', '/pt/privacidade/'],
  en: ['/en/', '/en/the-clinic/', '/en/services/', '/en/products/', '/en/contact/', '/en/privacy/'],
};
const widths = [360, 390, 768, 1024, 1440];
const failures = [];
const check = (ok, msg) => { if (!ok) failures.push(msg); console.log(`${ok ? '✓' : '✗'} ${msg}`); };

const browser = await chromium.launch();
const context = await browser.newContext();
// Nenhum pedido pode sair do servidor local (formulário, analytics, fontes externas, mapas).
const external = [];
context.on('request', (r) => { if (!r.url().startsWith(base) && !r.url().startsWith('data:')) external.push(r.url()); });
const page = await context.newPage();
const consoleErrors = [];
page.on('console', (m) => m.type() === 'error' && consoleErrors.push(`${page.url()} ${m.text()}`));

// Rotas, H1 único, idioma, noindex, sem scroll horizontal
for (const [lang, list] of Object.entries(routes)) {
  for (const [i, path] of list.entries()) {
    const res = await page.goto(base + path, { waitUntil: 'networkidle' });
    check(res.status() === 200, `${path} responde 200`);
    check((await page.locator('h1').count()) === 1, `${path} tem um único H1`);
    check((await page.getAttribute('html', 'lang')) === (lang === 'pt' ? 'pt-PT' : 'en'), `${path} html lang correto`);
    check((await page.locator('meta[name="robots"][content*="noindex"]').count()) === 1, `${path} em noindex`);
    check((await page.locator('link[rel="alternate"][hreflang]').count()) >= 3, `${path} tem hreflang`);
    const other = lang === 'pt' ? routes.en[i] : routes.pt[i];
    const switchHref = await page.locator('.header-actions .lang-switch a:not([aria-current])').first().getAttribute('href');
    check(switchHref === other, `${path} seletor de idioma aponta para ${other}`);
    const deadButtons = await page.locator('a:not([href]), a[href="#"], a[href=""]').count();
    check(deadButtons === 0, `${path} sem links mortos`);
    const titles = await page.title();
    check(titles.length > 10, `${path} tem title específico`);
  }
}
for (const w of widths) {
  await page.setViewportSize({ width: w, height: 900 });
  for (const path of [...routes.pt, ...routes.en]) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    if (sw > w) check(false, `${path} sem scroll horizontal a ${w}px (scrollWidth ${sw})`);
  }
  check(true, `verificação de scroll horizontal a ${w}px concluída`);
}

// Imagens: todas carregam (força o lazy loading) e têm texto alternativo
for (const path of [...routes.pt, ...routes.en]) {
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = 'eager')));
  await page.waitForLoadState('networkidle');
  const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
  check(broken.length === 0, `${path} imagens carregadas${broken.length ? ': ' + broken.join(', ') : ''}`);
  const noAlt = await page.locator('img:not([alt])').count();
  check(noAlt === 0, `${path} todas as imagens têm alt`);
}

// Links reais
await page.goto(base + '/pt/contactos/');
const hrefs = await page.locator('main a').evaluateAll((as) => as.map((a) => a.getAttribute('href')));
check(hrefs.includes('tel:+351282338591'), 'link tel do telefone');
check(hrefs.includes('tel:+351912242222'), 'link tel do telemóvel');
check(hrefs.includes('mailto:cvet.arcanoe@gmail.com'), 'link mailto');
check(hrefs.some((h) => h?.startsWith('https://www.google.com/maps/dir/')), 'link de direções');
check(!(await page.content()).toLowerCase().includes('whatsapp'), 'WhatsApp desativado');

// Links internos não partidos
const internal = new Set();
for (const path of [...routes.pt, ...routes.en]) {
  await page.goto(base + path);
  for (const h of await page.locator('a[href^="/"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')))) internal.add(h.split('#')[0].split('?')[0]);
}
for (const h of internal) {
  const r = await page.request.get(base + h);
  check(r.status() === 200, `link interno ${h}`);
}

// Menu móvel: abre, foca, Escape fecha e devolve foco
await page.setViewportSize({ width: 390, height: 800 });
await page.goto(base + '/pt/');
await page.click('.menu-toggle');
check(await page.isVisible('#mobile-menu'), 'menu móvel abre');
check(await page.evaluate(() => document.activeElement?.closest('#mobile-menu') !== null), 'foco entra no menu móvel');
await page.keyboard.press('Escape');
check(!(await page.isVisible('#mobile-menu')), 'Escape fecha o menu');
check(await page.evaluate(() => document.activeElement?.classList.contains('menu-toggle')), 'foco volta ao botão do menu');
check(await page.isVisible('.mobile-bar'), 'barra inferior visível em mobile');

// Teclado: skip link é o primeiro elemento focável
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(base + '/pt/');
await page.keyboard.press('Tab');
check(await page.evaluate(() => document.activeElement?.classList.contains('skip-link')), 'skip link é o primeiro foco');

// Formulário: pré-seleção, inválido, válido (demo)
await page.goto(base + '/pt/contactos/?motivo=diagnostico#pedido', { waitUntil: 'networkidle' });
check((await page.inputValue('select[name="reason"]')) === 'diagnostico', 'motivo pré-selecionado por URL');
check(await page.isVisible('text=Demonstração — este formulário não envia pedidos.'), 'aviso de demonstração visível');
await page.selectOption('select[name="reason"]', '');
await page.fill('input[name="ownerName"]', 'A');
await page.fill('input[name="email"]', 'invalido@');
await page.fill('textarea[name="message"]', 'Texto que deve ser preservado.');
await page.click('button[type="submit"]');
check(await page.isVisible('.error-summary'), 'resumo de erros aparece');
check((await page.locator('.field-error').count()) === 4, 'erros junto de nome, telefone, email e motivo');
check((await page.getAttribute('input[name="phone"]', 'aria-invalid')) === 'true', 'aria-invalid no telefone');
check((await page.inputValue('textarea[name="message"]')) === 'Texto que deve ser preservado.', 'dados preservados após erro');
// Domingo é rejeitado
const nextSunday = await page.evaluate(() => { const d = new Date(); d.setDate(d.getDate() + ((7 - d.getDay()) % 7 || 7)); return d.toISOString().slice(0, 10); });
await page.fill('input[name="preferredDate"]', nextSunday);
check(await page.isVisible('text=Ao domingo a clínica está encerrada'), 'domingo rejeitado como data preferida');
await page.fill('input[name="preferredDate"]', '');
await page.fill('input[name="ownerName"]', 'Maria Teste');
await page.fill('input[name="phone"]', '912 345 678');
await page.fill('input[name="email"]', 'maria@example.com');
await page.selectOption('select[name="reason"]', 'prevencao');
await page.click('button[type="submit"]');
check(await page.isVisible('text=Nada foi enviado'), 'submissão válida mostra resumo local «Nada foi enviado»');
check(await page.isVisible('.summary-list >> text=Maria Teste'), 'resumo contém os dados');
await page.click('text=Editar pedido');
check((await page.inputValue('input[name="ownerName"]')) === 'Maria Teste', 'editar mantém os dados');

// EN form
await page.goto(base + '/en/contact/?motivo=produtos', { waitUntil: 'networkidle' });
await page.click('button[type="submit"]');
check(await page.isVisible('text=Please enter the owner’s name.'), 'erros traduzidos em EN');

check(external.length === 0, `nenhum pedido externo durante os testes${external.length ? ': ' + [...new Set(external)].join(', ') : ''}`);
check(consoleErrors.length === 0, `sem erros na consola${consoleErrors.length ? ': ' + consoleErrors.join(' | ') : ''}`);

await browser.close();
console.log(failures.length ? `\n${failures.length} falha(s)` : '\nTodos os testes passaram.');
process.exit(failures.length ? 1 : 0);
