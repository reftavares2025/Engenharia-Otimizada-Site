# ==============================================================================
# 📋 INFORMAÇÕES COMPLETAS DO PROJETO E ATIVIDADES - RT ENGENHARIA CIVIL
# Data de Registro: 26 de Agosto de 2026
# Projeto: Régis Tavares Engenharia Civil (Engenharia Otimizada)
# Site Oficial no Ar: https://rtengenharia.vercel.app
# Repositório GitHub: https://github.com/reftavares2025/Engenharia-Otimizada-Site
# Contato WhatsApp Oficial: +55 19 99015-4309
# ==============================================================================

Este documento contém o dossiê completo, técnico e operacional de todas as implementações, correções, automações e integrações realizadas no projeto. Qualquer inteligência artificial ou desenvolvedor (incluindo Claude ou outro assistente) terá aqui o panorama exato do sistema.

---

## 1. DADOS CADASTRAIS E CONTATOS OFICIAIS DA EMPRESA
- **Razão Social / Nome Fantasia:** Régis Tavares Engenharia Civil (Engenharia Otimizada)
- **Engenheiro Responsável:** Eng. Régis Tavares
- **WhatsApp Oficial de Vendas & Leads:** `+55 19 99015-4309` (ou `5519990154309` nos links da API)
- **Localização da Fábrica / Sede:** Angatuba - SP
- **Área de Atuação Presencial (Obras/Montagem):** Cidades dos Estados de São Paulo (SP) e Paraná (PR)
- **Área de Atuação Online (Projetos):** Brasil inteiro
- **Diferencial Comercial:** Fabricação própria de estruturas pré-fabricadas (concreto e metálica), chalés de luxo em steel/aço, projetos arquitetônicos e estruturais, cobrindo qualquer orçamento concorrente coerente.

---

## 2. ARQUITETURA TÉCNICA DO SISTEMA
- **Frontend:** React 18 + TypeScript + Vite + TailwindCSS + Lucide Icons.
- **Renderização 3D:** Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`).
- **Backend / Serverless:** Vercel Serverless Functions (`api/chat.ts`, `api/_lib/chat.ts`).
- **Motor de IA (Chatbot Engª Olívia):** Groq API executando modelo `qwen-2.5-coder-32b` com isolamento de chave em variável `GROQ_API_KEY`.
- **Hospedagem & Deploy Contínuo:** Vercel com integração direta na branch `main` do GitHub.
- **Porta de Desenvolvimento Local:** Porta `2015` (definida em `server.ts` para não conflitar com portas de outros serviços como OpenWA na 3000).

---

## 3. CORREÇÕES E MELHORIAS DE UI/UX IMPLEMENTADAS HOJE
1. **Redução de Poluição Visual e Redesign Clean:**
   - Desativado o componente `PageNavigationHub.tsx` (que ocupava espaço desnecessário com botões repetidos).
   - Desativado o `SocialProofToast.tsx` (que exibia notificações flutuantes com nomes falsos de clientes).
   - Removido o banner superior excessivamente denso no `Header.tsx`.
   - Redesenhado o `Hero.tsx` com visual de alto padrão e imagem única do Chalé Alpino de Luxo.
   - Traduzidos os jargões técnicos em `TechnicalCredibility.tsx` para benefícios comerciais claros ao cliente leigo (ex: ART, NBRs).

2. **Correção Estrutural no Simulador 3D (`ChaletAFrame3D.tsx`, `ChaletAlpino3D.tsx`, `Project3DViewer.tsx`):**
   - **Problema anterior:** Quando o usuário selecionava terreno em declive, os pilotis eram desenhados abaixo do solo (eixo negativo).
   - **Solução aplicada:**
     - Nível $Y = 0$: Sapatas de concreto assentadas e travadas diretamente no solo.
     - Elevação: Pilares metálicos (pilotis) subindo do solo $Y = 0$ até $+2.4\text{m}$.
     - Travamento: Contraventamentos metálicos em X (conforme NBR 8800).
     - Acesso: Escada metálica frontal ligando o solo ao deck do chalé.
     - Visualizador: Configurado `<Center disableY>` no Drei para impedir que a grade corte o modelo.

---

## 4. FUNIL DE VENDAS E CRM AUTOMÁTICO (GOOGLE SHEETS)
1. **Lead Scoring Técnico (0 a 10 Pontos) em `src/utils/leadCapture.ts`:**
   - **🔥 LEAD QUENTE (7 a 10 pontos):** Cliente com terreno próprio, projeto aprovado/em andamento, obra em SP/PR e laudo SPT. Ação: Contato prioritário em até 15 minutos.
   - **🟡 LEAD MORNO (4 a 6 pontos):** Cliente com terreno em negociação ou fora de SP/PR. Ação: Envio de portfólio e follow-up em 48-72h.
   - **🧊 LEAD FRIO (0 a 3 pontos):** Curioso em fase inicial sem terreno. Ação: Lista de transmissão informativa.
   - A mensagem do WhatsApp gerada já chega formatada com a etiqueta no topo (ex: `🔥 *[LEAD QUENTE - ALTA PRIORIDADE (Score: 9/10)]*`).

2. **Captura Silenciosa Anti-Abandono:**
   - No momento em que o visitante digita Nome e Telefone no assistente 3D ou no Modal de Visita Técnica, os dados são despachados em segundo plano via `fetch` (com backup no `localStorage` do navegador). Mesmo se o cliente fechar a aba sem clicar no WhatsApp, o lead fica registrado.

3. **Integração com Planilha Google (Apps Script Webhook):**
   - **URL do Webhook Ativo:** `https://script.google.com/macros/s/AKfycbyYpQoX34_oatVaGDB82AqFynlZoEE0rgrulHHpQEuDjc9Z4lDW0mW_e7oXcRASpLEr/exec`
   - **Código do Google Apps Script configurado na planilha:**
     ```javascript
     function doPost(e) {
       try {
         var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
         var data = JSON.parse(e.postData.contents);
         sheet.appendRow([
           new Date().toLocaleString("pt-BR"),
           data.nome || "",
           data.telefone || "",
           data.email || "",
           data.cidade || "",
           data.tipoProjeto || "",
           data.areaM2 || "",
           data.terreno || "",
           data.aprovacao || "",
           data.sondagemSPT || "",
           data.pontuacao || "",
           data.classificacao || "",
           data.canal || ""
         ]);
         return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
           .setMimeType(ContentService.MimeType.JSON);
       } catch (err) {
         return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
           .setMimeType(ContentService.MimeType.JSON);
       }
     }
     ```
   - **Teste de Disparo:** Realizado e validado com retorno `{"status":"success"}` gravando os dados na planilha.

---

## 5. AUDITORIA DE SEGURANÇA E PERFORMANCE
- **Headers de Segurança (`vercel.json`):**
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Strict-Transport-Security (HSTS): max-age=63072000; includeSubDomains; preload`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- **Scan de Dependências:** `npm audit` executado em 283 pacotes: **0 vulnerabilidades**.
- **Sanitização:** Entradas e saídas de chat tratadas com `.trim().slice(0, 800)` e timeout de 12 segundos.
- **Proteção de Segredos:** Arquivo `.env*` adicionado ao `.gitignore` e criado `.env.example`.

---

## 6. META ADS & INSTAGRAM ADS (DETALHES E STATUS ATUAL)

### Identificadores da Conta:
- **ID da Conta de Anúncios Meta:** `act_721687798864771` (Nome: Régis Tavares)
- **ID da Página do Facebook:** `1146206911905578` (Projetos BIM CAD)
- **ID da Conta de Instagram Business:** `17841451386926204`
- **Campanha Criada via API:** ID `120254907994850110` (`RT Engenharia · [Instagram] Simulador 3D Chalés & Pré-Fabricados`)
- **Conjunto de Anúncios (AdSet):** ID `120254908000010110` (`Público Quente SP/PR · Terrenos & Arquitetura (28-65 anos)`)
- **Segmentação Geográfica:** Estados de São Paulo (SP) e Paraná (PR).
- **Orçamento Diário:** R$ 20,00 / dia.
- **Hash da Imagem do Anúncio (Chalé 3D):** `f9a14248aabec49d79fe61edfa1ea1ab` (salva na conta).

### Arquivos de Criativos Gerados:
- `public/assets/ads/instagram_feed_chale.jpg` (Quadrado 1:1 para Feed)
- `public/assets/ads/instagram_stories_chale.jpg` (Vertical 9:16 para Stories e Reels)

### Script de Automação Meta:
- Localizado em [`scripts/meta_ads_automation.ts`](file:///D:/Engenharia-Otimizada-Site/scripts/meta_ads_automation.ts).

### Diagnóstico do Erro no Gerenciador da Meta:
- **Mensagem do Gerenciador:** `"Não é possível adicionar conjuntos de anúncios a campanhas arquivadas."`
- **Causa:** No painel do Meta Ads Manager, o usuário tentou publicar rascunhos de campanhas antigas/arquivadas ("Novo conjunto de anúncios de Leads").
- **Como Resolver:**
  1. No [Gerenciador de Anúncios (adsmanager.facebook.com)](https://adsmanager.facebook.com), filtre a visualização para **"Campanhas Ativas / Pausadas"** (desmarque campanhas arquivadas).
  2. Localize a campanha criada pelo nosso script: **`RT Engenharia · [Instagram] Simulador 3D Chalés & Pré-Fabricados`**.
  3. Descarte ou apague os rascunhos vermelhos com erro (que pertencem a campanhas antigas arquivadas).
  4. Na campanha `RT Engenharia`, basta ativar a chave para "Ativo" e publicar.

### Link Rastreável de Anúncio:
```text
https://rtengenharia.vercel.app/?utm_source=instagram&utm_medium=ads&utm_campaign=chale_3d#assistente-ia
```
*(Quando o cliente clica neste link e simula o projeto, a Planilha Google grava automaticamente `Instagram Ads (chale_3d)` na coluna Canal).*

---

## 7. ESTRUTURA DE ARQUIVOS CHAVE DO PROJETO
```text
D:/Engenharia-Otimizada-Site/
├── api/
│   ├── _lib/chat.ts                <-- Integração Groq Qwen 2.5 Coder 32B segura
│   └── chat.ts                     <-- Endpoint Serverless Vercel
├── public/
│   ├── assets/ads/                 <-- Imagens oficiais de anúncios Instagram
│   ├── llms.txt & llms-full.txt    <-- Documentação técnica para IAs
│   ├── robots.txt & sitemap.xml    <-- Indexação SEO do Google
├── src/
│   ├── components/
│   │   ├── BotQualification.tsx    <-- Assistente Engª Olívia com Lead Scoring
│   │   ├── ConsultationModal.tsx   <-- Modal de Visita Técnica presencial
│   │   ├── Hero.tsx                <-- Seção principal simplificada e clean
│   │   ├── Project3DViewer.tsx     <-- Visualizador 3D com controle de solo
│   │   └── r3f/models/
│   │       ├── ChaletAFrame3D.tsx  <-- Modelo 3D A-Frame com pilotis +2.4m
│   │       └── ChaletAlpino3D.tsx  <-- Modelo 3D Alpino com pilotis +2.4m
│   └── utils/
│       ├── leadCapture.ts          <-- Lead Scoring 0-10 e Webhook Google Sheets
│       └── whatsapp.ts             <-- Construtor de links de WhatsApp oficiais
├── scripts/
│   └── meta_ads_automation.ts      <-- Automação de anúncios via Meta Graph API
├── vercel.json                     <-- Cabeçalhos de segurança (HSTS, CSP, etc.)
├── INFORMACOES_RT_26-08-2026.md    <-- Este dossiê completo em Markdown
└── INFORMACOES_RT_26-08-2026.txt   <-- Este dossiê em formato texto puro (.txt)
```

==============================================================================
# FIM DO DOSSIÊ TÉCNICO
==============================================================================
