// Verifica o contraste WCAG das combinações de cor efetivamente usadas no CSS.
const pairs = [
  ['texto / marfim', '#20332e', '#faf8f3'],
  ['texto / branco', '#20332e', '#ffffff'],
  ['texto secundário / marfim', '#4b5f59', '#faf8f3'],
  ['texto secundário / branco', '#4b5f59', '#ffffff'],
  ['texto secundário / sálvia suave', '#4b5f59', '#eef3ec'],
  ['verde / marfim', '#173f38', '#faf8f3'],
  ['verde / sálvia', '#173f38', '#dce8de'],
  ['verde / sálvia suave', '#173f38', '#eef3ec'],
  ['marfim / verde (botão primário)', '#faf8f3', '#173f38'],
  ['eyebrow laranja / marfim', '#9c4a0c', '#faf8f3'],
  ['eyebrow laranja / branco', '#9c4a0c', '#ffffff'],
  ['eyebrow laranja / sálvia suave', '#9c4a0c', '#eef3ec'],
  ['laranja / fundo aviso', '#9c4a0c', '#fbeee2'],
  ['eyebrow em fundo verde', '#f6b783', '#173f38'],
  ['lead em fundo verde', '#cbdad0', '#173f38'],
  ['texto produtos em fundo verde', '#c4d4ca', '#173f38'],
  ['rodapé texto', '#d5e1d9', '#0f2b26'],
  ['rodapé títulos', '#a9bdb2', '#0f2b26'],
  ['faixa demo', '#e9efe9', '#0f2b26'],
  ['erro / fundo erro', '#a3271d', '#fbeeec'],
  ['erro / branco', '#a3271d', '#ffffff'],
  ['texto / aviso', '#20332e', '#fbeee2'],
  ['borda campo / branco (não-texto, ≥3)', '#788a83', '#ffffff'],
];
const lum = (hex) => {
  const [r, g, b] = hex.match(/\w\w/g).map((h) => parseInt(h, 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
let fail = 0;
for (const [name, fg, bg] of pairs) {
  const [a, b] = [lum(fg), lum(bg)].sort((x, y) => y - x);
  const ratio = (a + 0.05) / (b + 0.05);
  const min = name.includes('não-texto') ? 3 : 4.5;
  if (ratio < min) fail++;
  console.log(`${ratio >= min ? '✓' : '✗'} ${ratio.toFixed(2)}:1  ${name}`);
}
process.exit(fail ? 1 : 0);
