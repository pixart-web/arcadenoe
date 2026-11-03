# Centro Veterinário Arca de Noé — proposta de redesign (PIXART)

Demonstração navegável do novo website do Centro Veterinário Arca de Noé, em São Bartolomeu de Messines.
**Não é o site oficial e não está pronto para produção**: está em `noindex`, identificada como «Proposta de redesign — PIXART», e o formulário não envia pedidos.

## Comandos

```bash
npm install
npm run dev            # desenvolvimento em http://localhost:3000/pt/
npm run build          # exportação estática para out/ (inclui verificação de tipos e lint)
npm start              # serve out/ em http://localhost:3000
npm run typecheck      # TypeScript
npm run lint           # ESLint (next/core-web-vitals + typescript)
npm run test:e2e       # 137 verificações em browser (precisa de npm start a correr e de Playwright)
npm run test:contrast  # contraste WCAG das combinações de cor usadas
npm run preview:bundle # gera preview/: cópia com caminhos relativos, para alojar numa subpasta
```

Configuração em `.env.example` (`NEXT_PUBLIC_DEMO`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BOOKING_MODE`, `NEXT_PUBLIC_BOOKING_ENDPOINT`). Não há credenciais no cliente.

## Estrutura

```
src/
  app/(site)/[lang]/            páginas PT/EN (layout, início, [slug] para as páginas interiores)
  app/(root)/                   raiz → /pt/ (português por defeito)
  app/sitemap.ts, robots.ts     sitemap com hreflang; robots fechado em modo demo
  app/globals.css               tokens (cor, tipografia, raios, espaçamento, movimento) e estilos
  components/                   Header (menu móvel), Footer, MobileBar, BookingForm, Photo, secções, ícones
  components/pages/             composição de cada página
  content/pt.ts, en.ts          todos os textos por idioma (menu, botões, formulário, erros, metadados)
  content/routes.ts             slugs por idioma — o seletor PT/EN mantém a página equivalente
  data/images.ts                fotografias usadas e símbolo do logótipo
  data/clinic.ts                fonte única de contactos, morada, horário, serviços, produtos e motivos
  lib/booking.ts                interface de envio substituível (demo / api)
  lib/validation.ts             validação do pedido de consulta
  lib/seo.ts                    metadados, canonical, hreflang, JSON-LD VeterinaryCare
public/images/                  fotografias otimizadas (JPEG + WebP, 2 larguras) e símbolo do logótipo
public/fonts/                   Manrope e Inter (subconjunto latino variável) + licenças OFL
docs/CONTEUDOS-E-FONTES.md      origem e estado de cada dado (confirmado / por confirmar / editorial)
docs/RESUMO-COMERCIAL.md        resumo comercial (8 linhas)
scripts/                        testes e2e, contraste, capturas e geração do preview portátil
```

Rotas: `/pt/`, `/pt/a-clinica/`, `/pt/servicos/`, `/pt/produtos/`, `/pt/contactos/`, `/pt/privacidade/` e equivalentes `/en/`, `/en/the-clinic/`, `/en/services/`, `/en/products/`, `/en/contact/`, `/en/privacy/`.

## Fontes e limitação

O ambiente de desenvolvimento na nuvem não tem acesso a vet-arcadenoe.com (o proxy recusa a ligação com «403 Forbidden»). Em 20/10/2026 as páginas início, serviços, produtos, localização e /en (com as subpáginas inglesas) foram descarregadas no computador do Tiago, só em leitura, juntamente com o logótipo e as fotografias. Os contactos, o horário e as listas de serviços e produtos coincidem com o briefing. O mapa atual forneceu as coordenadas usadas nas direções. O estado de cada dado está em `docs/CONTEUDOS-E-FONTES.md`. Não foi feita uma inspeção visual do site atual em desktop/mobile.

## Imagens e licenças

> **Autorização (20/10/2026):** o Tiago (PIXART) confirmou que a agência tem autorização para usar o logótipo e as fotografias publicados em vet-arcadenoe.com nesta proposta.

- **Logótipo**: o ficheiro publicado é um GIF de 100×100 px (não há SVG nem versão maior). Para o cabeçalho recortou-se o **símbolo** (o barco laranja), com o fundo branco tornado transparente (`public/images/logo-simbolo.png`), ao lado do nome composto em texto. O texto «CENTRO VETERINÁRIO» do logótipo original fica ilegível a esse tamanho. Original guardado em `public/images/logo-original.png`. **Pedir à clínica o ficheiro vetorial** antes do lançamento. O laranja do apontamento quente foi ajustado ao do logótipo (#E8741C; #9C4A0C para texto). O favicon é uma letra «A» provisória.
- **Fotografias** (todas do site atual, 1920×1080, recortadas e otimizadas em JPEG + WebP):

  | Ficheiro | Original | Onde |
  |---|---|---|
  | `consulta-*` | home-hero.jpg (recorte vertical centrado no cão) | Hero da homepage, prioridade de carregamento |
  | `tosquia-*` | servicos-tosquia.jpg | Homepage, bloco «A clínica» |
  | `cao-perfil-*` | localizacao-cao.jpg | A Clínica |
  | `banho-*` | produtos-banho.jpg | Produtos |

  Pelo aspeto, parecem ser fotografias de banco de imagens. Por isso, os textos alternativos descrevem a cena sem as apresentar como equipa ou instalações da clínica, e o recorte do hero deixa o rosto do profissional fora do enquadramento. **Confirmar a licença de origem** (a autorização da clínica pode não cobrir a licença do banco de imagens) e, de preferência, substituí-las por fotografias reais da clínica.
- **Não usadas**: recortes pequenos em fundo branco (145–591 px: cão de bata, gato em consulta, grupo de animais, veterinária com golden, cão e gato, faixa de 5 cães), porque a resolução é insuficiente e o estilo não acompanha a direção visual. Também ficaram de fora o ícone do Facebook e o favicon de 16 px.
- **Fontes**: Manrope e Inter, ficheiros variáveis com o subconjunto latino, alojados em `public/fonts/` (SIL Open Font License 1.1, licenças incluídas) e pré-carregados. Não há pedidos a serviços externos e existe fallback de sistema.

## Decisões

- Next.js 15 (App Router) + TypeScript, exportação estática; CSS próprio com tokens em vez de Tailwind (menos dependências).
- Páginas totalmente estáticas; só o menu móvel, a barra inferior e o formulário são componentes cliente.
- Links internos com `<a>` (navegação completa) para manter o site simples e portátil.
- Horário estático, sem «Aberto agora» (feriados e exceções desconhecidos).
- WhatsApp desativado (`clinic.whatsappEnabled = false`) até confirmação.
- Urgência: só mensagem moderada a remeter para o telefone; o formulário avisa que não é canal de urgência.
- Direções: link do Google Maps com as coordenadas do mapa incorporado no site atual (37.25538, -8.29077), aberto só por ação do visitante, sem mapa embebido.
- Rodapé com link para o Livro de Reclamações eletrónico, que já existe no site atual.
- Sem analytics, trackers ou cookies não essenciais.
- Dados estruturados `VeterinaryCare` só com nome, morada, telefone, email e horário. Sem avaliações nem preços; as coordenadas ficam de fora até a clínica confirmar o ponto.
- Corrigido «Chek-ups» → «Check-ups».

## Formulário de pedido de consulta

- Campos: nome do tutor, telefone (obrigatórios), email, nome do animal, motivo (obrigatório), data preferida (identificada como preferência sujeita a confirmação; domingos e datas passadas são rejeitados) e mensagem (máx. 500 caracteres).
- Erros junto ao campo, resumo de erros com foco, `aria-invalid`/`aria-describedby`, dados preservados. Sem `alert()`.
- Motivo pré-selecionado por URL (`?motivo=prevencao|diagnostico|cirurgia|higiene|produtos|outro`) a partir dos CTA de Serviços e Produtos.
- **Modo demo** (predefinido): não há qualquer pedido de rede; mostra um resumo local com «Nada foi enviado» e os contactos reais.
- **Modo api**: `POST` JSON para `NEXT_PUBLIC_BOOKING_ENDPOINT`. «Pedido enviado» só aparece com resposta 2xx e corpo `{"ok": true}`. Sem endpoint configurado mostra «Pedido online indisponível» com alternativa por telefone; em erro mantém os dados.

Para ativar em produção: escolher o serviço de receção (função serverless, serviço de formulários ou email transacional), proteção anti-spam, política de retenção, aviso de privacidade final e testar envio, falha e indisponibilidade sem usar contactos reais da clínica.

## Testes realizados (20/10/2026)

| Verificação | Resultado |
|---|---|
| `next build` (tipos + lint incluídos), `tsc --noEmit`, `eslint .` | Sem erros |
| `npm run test:e2e` — Chromium headless | 137/137: 12 rotas 200, um H1 por página, `lang`, noindex, hreflang, seletor PT/EN na página equivalente, links internos, tel/mailto/direções, sem scroll horizontal a 360/390/768/1024/1440 px, menu móvel (foco, Escape, devolução de foco), skip link, formulário inválido/válido/edição, EN traduzido, **nenhum pedido externo** e sem erros de consola |
| `npm run test:contrast` | Todas as combinações usadas ≥ 4,5:1 (texto) e ≥ 3:1 (bordas de campo) |
| Lighthouse 12 (mobile, servidor local **com gzip**, como em alojamento real) | Início 97, Contactos 99, Serviços 99 em desempenho; acessibilidade 100 e boas práticas 100 nas três. Sem compressão, o desempenho desce para 76–87 (LCP de cerca de 4 s). O SEO fica em 69 **apenas por causa do noindex intencional** (a auditoria «is-crawlable» falha de propósito) |
| Revisão visual por capturas | 360, 390, 768, 1024 e 1440 px |
| Preview portátil numa subpasta | Navegação, menu, CTA com motivo, formulário e seletor de idioma sem erros |

Não testado: leitores de ecrã reais (VoiceOver/NVDA), Safari/Firefox e dispositivos físicos, Lighthouse no alojamento e CDN de produção.

## Pendências para lançamento

1. Logótipo em formato vetorial (o publicado tem 100×100 px); validar com a clínica o uso do símbolo e a paleta ajustada.
2. Confirmar a licença das fotografias do site atual, que parecem ser de banco de imagens. Idealmente, substituí-las por fotografias reais da clínica (equipa só com autorização).
3. Revalidar todos os dados com a clínica: morada normalizada (a versão inglesa do site atual mostra também «Travessa Rua Doutor António C Carneiro Lote 2-r/c-D»), telefones, email, horário, feriados, serviços, produtos e o ponto do mapa.
4. Política de urgências: existe contacto ou atendimento fora de horas? Até lá, manter a mensagem moderada.
5. WhatsApp: ativar só com confirmação e número indicado pela clínica.
6. Textos de privacidade e cookies: completar (NIF, fundamento jurídico, prazos, subcontratantes) e validar juridicamente.
7. Integração do formulário (ver acima) e testes ponta a ponta.
8. Equipa, biografias e galeria: só após confirmação e autorização.
9. Domínio, `NEXT_PUBLIC_DEMO=false`, `NEXT_PUBLIC_SITE_URL`, redirecionamentos das URLs atuais, Search Console e sitemap — só no lançamento autorizado.
10. Ligação a CMS como melhoria posterior, se a clínica quiser editar conteúdos.
