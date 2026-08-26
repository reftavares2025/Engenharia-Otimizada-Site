# 📋 REGISTRO DIÁRIO DE ATIVIDADES E CONFIGURAÇÕES - RT ENGENHARIA
**Data:** 26 de Agosto de 2026  
**Projeto:** Régis Tavares Engenharia Civil (Engenharia Otimizada)  
**Domínio Oficial:** [rtengenharia.vercel.app](https://rtengenharia.vercel.app)  
**Repositório GitHub:** `reftavares2025/Engenharia-Otimizada-Site`  
**Contato Oficial WhatsApp:** +55 19 99015-4309  

---

## 1. 🛠️ CORREÇÕES DE CONTATO E INTELIGÊNCIA ARTIFICIAL
- **Telefone Oficial:** Corrigido e padronizado em 100% dos arquivos do projeto o número do WhatsApp comercial para **`+55 19 99015-4309`** (arquivos: `whatsapp.ts`, `server.ts`, `index.html`, `llms.txt`, `llms-full.txt`, `ConsultationModal.tsx`, `Hero.tsx`).
- **Assistente IA (Groq / Qwen 2.5 Coder 32B):** Reescrita da integração em `api/_lib/chat.ts` utilizando a API da Groq com o modelo `qwen-2.5-coder-32b`. A chave de API foi removida do código-fonte e isolada em variável de ambiente `GROQ_API_KEY`.

---

## 2. 🎨 REDESENHO DE UI/UX E LIMPEZA VISUAL (SITE MAIS CLEAN)
- **Remoção de Poluição Visual:**
  - Desativado o componente redundante `PageNavigationHub.tsx` (que ocupava espaço instruindo a rolar para o topo).
  - Desativado o `SocialProofToast.tsx` (alertas flutuantes com dados fictícios).
  - Removido o banner superior excessivamente denso do `Header.tsx`.
- **Novo Hero Section (`Hero.tsx`):**
  - Substituído o mosaico de 4 imagens por uma apresentação de alto padrão com o Chalé Alpino de Luxo.
  - Headline e subtítulo mais diretos e elegantes, mantendo as palavras-chave essenciais para SEO.
- **Tradução Técnica (`TechnicalCredibility.tsx`):**
  - Jargões técnicos foram convertidos em benefícios claros para o cliente leigo:
    - *Certificado CREA* ➔ **Engenharia Certificada (Garantia de Qualidade)**
    - *ART Emitida* ➔ **Obra Regularizada (Segurança Total)**
    - *Normas NBR 8800/9062* ➔ **Materiais Normatizados (Padrão de Excelência)**

---

## 3. 🏗️ CORREÇÃO ESTRUTURAL NO SIMULADOR 3D (THREE.JS / R3F)
- **Correção da Elevação dos Pilotis:**
  - Corrigido o erro em que a opção de terreno com declive desenhava os pilotis no eixo negativo (abaixo do chão).
  - **Nível Zero ($Y = 0$):** Sapatas e blocos de fundação assentados e travados diretamente no solo.
  - **Estrutura Elevada:** Pilares de aço (pilotis) subindo do solo até **$+2.4\text{m}$**, com contraventamentos em X (norma NBR 8800) e escada metálica de acesso frontal até o deck.
  - O chalé (paredes, cobertura, deck e mezanino) agora fica corretamente montado sobre os pilotis.
  - Ajustado `Project3DViewer.tsx` com `<Center disableY>` para que a grade do solo nunca corte o modelo ao meio.

---

## 4. 📈 FUNIL DE VENDAS E INTEGRAÇÃO CRM (GOOGLE SHEETS)
- **Lead Scoring Automático (0 a 10 Pontos):**
  - Criado o módulo `src/utils/leadCapture.ts`.
  - Classificação dinâmica em tempo real:
    - **🔥 LEAD QUENTE (7 a 10 pontos):** Terreno próprio + projeto aprovado/em andamento + SP/PR + laudo SPT.
    - **🟡 LEAD MORNO (4 a 6 pontos):** Terreno em negociação ou fora da área SP/PR.
    - **🧊 LEAD FRIO (0 a 3 pontos):** Fase inicial de pesquisa.
  - A mensagem enviada ao WhatsApp do engenheiro agora inclui a etiqueta no topo (ex: `🔥 *[LEAD QUENTE - 9/10]*`).
- **Captura Silenciosa Anti-Abandono:**
  - No instante em que o lead insere Nome e Telefone, os dados são despachados em segundo plano para o CRM.
  - Mesmo que o visitante feche a aba sem enviar o WhatsApp, o contato fica gravado.
- **Integração Google Apps Script / Planilha Google:**
  - Conectado o Webhook oficial: `https://script.google.com/macros/s/AKfycbyYpQoX34_oatVaGDB82AqFynlZoEE0rgrulHHpQEuDjc9Z4lDW0mW_e7oXcRASpLEr/exec`
  - Testado com disparo em tempo real: **Retorno `{ "status": "success" }` validado**.
- **Rastreamento de Origem UTM:**
  - O sistema captura automaticamente `utm_source`, `utm_campaign` e `utm_medium` da URL e salva na coluna Canal da planilha (ex: `Instagram Ads (chale_3d)`).

---

## 5. 🛡️ AUDITORIA DE SEGURANÇA E PERFORMANCE
- **Cabeçalhos de Segurança:** Criado `vercel.json` com `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection`, `Referrer-Policy`, `Permissions-Policy` e `Strict-Transport-Security (HSTS)`.
- **Scan de Vulnerabilidades:** Executado `npm audit` em 283 pacotes: **0 vulnerabilidades encontradas**.
- **Sanitização de Dados:** Sanitização com `.trim()` e limite de tamanho em todas as entradas/saídas do chat e formulários.
- **Proteção de Segredos:** `.gitignore` bloqueando arquivos `.env*` e criação do `.env.example`.

---

## 6. 🚀 AUTOMAÇÃO DE ANÚNCIOS NO INSTAGRAM (META ADS)
- **Criativos Gerados:**
  - Imagem 1:1 (Feed) - Chalé A-Frame em Steel Frame com Deck e Piscina (`public/assets/ads/instagram_feed_chale.jpg`).
  - Imagem 9:16 (Stories/Reels) - Chalé Alpino sobre Pilotis com Vista Panorâmica (`public/assets/ads/instagram_stories_chale.jpg`).
- **Campanha Criada via Meta Graph API v21:**
  - **Conta de Anúncios:** `act_721687798864771` (Régis Tavares)
  - **Campanha ID:** `120254907994850110` (`RT Engenharia · [Instagram] Simulador 3D Chalés & Pré-Fabricados`)
  - **Conjunto de Anúncios ID:** `120254908000010110`
  - **Segmentação Geográfica:** Estados de São Paulo (SP) e Paraná (PR)
  - **Público:** Idade 28 a 65 anos | Orçamento: R$ 20,00/dia | Status: Pausado para revisão.
- **Script de Automação:** Criado em `scripts/meta_ads_automation.ts`.

---

## 7. 📦 STATUS DE DEPLOY E REPOSITÓRIO
- **Build de Produção:** Testado e aprovado com `npx vite build` (Tempo: 22.6s, 0 erros).
- **GitHub:** Todos os commits sincronizados na branch `main`.
- **Vercel:** Deploy automático ativo em `https://rtengenharia.vercel.app`.
