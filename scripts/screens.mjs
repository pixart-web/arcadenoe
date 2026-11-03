// Capturas de ecrã para revisão visual: node scripts/screens.mjs <saida> [base]
import { chromium } from 'playwright';
const out = process.argv[2] || 'shots';
const base = process.argv[3] || 'http://localhost:3000';
const pages = ['/pt/', '/pt/a-clinica/', '/pt/servicos/', '/pt/produtos/', '/pt/contactos/', '/pt/privacidade/', '/en/'];
const widths = (process.env.WIDTHS || '390,1440').split(',').map(Number);
const browser = await chromium.launch();
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    const name = `${w}${p.replace(/\//g, '_')}`.replace(/_$/, '');
    await page.screenshot({ path: `${out}/${name}.png`, fullPage: process.env.FULL !== '0' });
    const sw = await page.evaluate(() => document.documentElement.scrollWidth);
    if (sw > w) console.log('HORIZONTAL SCROLL', w, p, sw);
  }
  await page.close();
}
await browser.close();
console.log('ok');
