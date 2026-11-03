# Conteúdos e fontes

Fonte de referência: https://www.vet-arcadenoe.com/ (páginas início, serviços, produtos, localização e /en).
**Recolha**: em 20/10/2026 as páginas foram descarregadas no computador do Tiago (o ambiente na nuvem não tem acesso ao domínio, porque o proxy responde 403). Os dados «confirmado no site» coincidem com o levantamento do briefing. Nenhum substitui a confirmação final pela clínica.

Estados: **Confirmado no site** · **Por confirmar com o cliente** · **Editorial proposto** (texto da PIXART).

| Dado | Valor usado | Estado | Onde |
|---|---|---|---|
| Nome | Centro Veterinário Arca de Noé | Confirmado no site | `data/clinic.ts` |
| Localidade | São Bartolomeu de Messines, concelho de Silves, Algarve | Confirmado no site | `data/clinic.ts` |
| Morada publicada | Rua Senhora Saúde Lote 2-r/c-D, 8375-138 S. Bart. Messines, Portugal | Confirmado no site | `data/clinic.ts` (`address.published`) |
| Morada normalizada | Rua Senhora Saúde, Lote 2, r/c D, 8375-138 São Bartolomeu de Messines | Por confirmar com o cliente | apresentada no site e no JSON-LD |
| Telefone | +351 282 338 591 | Confirmado no site | `data/clinic.ts` |
| Telemóvel | +351 912 242 222 | Confirmado no site | `data/clinic.ts` |
| Email | cvet.arcanoe@gmail.com | Confirmado no site | `data/clinic.ts` |
| Horário | Seg–Sex 10:00–13:30 e 16:30–19:30; Sáb 10:00–13:30; Dom encerrado | Confirmado no site | `data/clinic.ts` |
| Horário em feriados | «confirme por telefone» | Por confirmar com o cliente | textos |
| Consultas por marcação | sim | Confirmado no site | textos |
| Urgências | o site refere serviços de urgência em caso de necessidade; sem 24h nem contacto dedicado | Por confirmar com o cliente | mensagem moderada nos textos |
| Serviços (11) | banhos, check-ups, vacinações, análises, radiografia/RX, ecografia, eletrocardiografia, cirurgia, desparasitações, internamento, tosquias | Confirmado no site | `data/clinic.ts` |
| Agrupamento dos serviços | Prevenção; Exames de diagnóstico; Cirurgia e internamento; Higiene e bem-estar | Editorial proposto | `data/clinic.ts`, textos |
| Descrições dos serviços | textos curtos sem ampliar a oferta | Editorial proposto | `content/*.ts` |
| Produtos (8) | acessórios, brinquedos, camas, guloseimas, medicamentos, produtos de higiene, rações, vitaminas | Confirmado no site | `data/clinic.ts` |
| «Medicamentos mediante indicação do médico veterinário» | — | Por confirmar com o cliente | textos de Produtos |
| Versões PT e EN | existem no site atual | Confirmado no site | — |
| Destino do mapa | coordenadas do mapa Google incorporado em /localizacao: 37.25538187003568, -8.290771110461034 (etiqueta «R. Sra. da Saúde 2, 8375-138 São Bartolomeu de Messines») | Confirmado no site; confirmar o ponto com a clínica | `data/clinic.ts` (`mapPoint`, `directionsUrl`) |
| Segunda morada (só na versão EN do site atual) | «Travessa Rua Doutor António C Carneiro Lote 2-r/c-D São Bartolomeu de Messines» | Por confirmar com o cliente (não usada) | — |
| Livro de Reclamações | link para livroreclamacoes.pt, como no site atual | Confirmado no site | rodapé |
| Facebook | link publicado parece incompleto | Por confirmar com o cliente (não usado) | — |
| WhatsApp | desativado | Por confirmar com o cliente | `data/clinic.ts` |
| Logótipo | GIF 100×100 do site atual; símbolo recortado e usado com o nome em texto | Autorizado (Tiago/PIXART, 20/10/2026); falta o vetorial | `components/Brand.tsx`, `public/images/logo-*` |
| Fotografias | 4 fotografias 1920×1080 do site atual (aparentemente de banco de imagens) | Autorizado (Tiago/PIXART, 20/10/2026); confirmar licença de origem | `data/images.ts`, `public/images/` |
| Textos do site atual | home, serviços, produtos (PT/EN) | Confirmado no site; não reutilizados literalmente porque fazem afirmações não verificáveis («alta qualidade», «o que de mais moderno existe») | — |
| Conceito «Cuidado próximo. Confiança em cada visita.» | proposta, não slogan oficial | Editorial proposto | A Clínica |
| Títulos, hero, FAQ, «Como trabalhamos» | — | Editorial proposto | `content/*.ts` |
| Privacidade e cookies | estrutura de rascunho, sem revisão jurídica | Por confirmar com o cliente | `content/*.ts` |
| Equipa, anos de atividade, avaliações, testemunhos, marcas, preços | **não incluídos** | — | — |
