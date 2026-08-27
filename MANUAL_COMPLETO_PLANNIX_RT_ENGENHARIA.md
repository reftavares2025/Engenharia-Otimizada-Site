# 📘 MANUAL COMPLETO DE OPERAÇÃO E LANÇAMENTO NO PLANNIX ERP
**Sistema:** Plannix — Controle Ágil para Pré-Fabricados (Versão 14.00.01 db 195)  
**Empresa:** Régis Tavares Engenharia Civil (Engenharia Otimizada)  
**Data:** Agosto / 2026  
**Documento PDF Gerado:** [`MANUAL_COMPLETO_PLANNIX_RT_ENGENHARIA.pdf`](file:///D:/Engenharia-Otimizada-Site/MANUAL_COMPLETO_PLANNIX_RT_ENGENHARIA.pdf)

---

## 🧭 MAPA GERAL DOS 6 MÓDULOS DO PLANNIX

A partir das telas oficiais do seu sistema, o Plannix organiza a fábrica nos 6 módulos da barra superior:

| Módulo | Cor da Interface | Função Principal |
|---|:---:|---|
| **1. GERAL** | Azul Escuro | Cadastros Mestres (Obras, Usuários, Materiais), Etiquetas, Inventário e Indicadores |
| **2. PROJETO** | Roxo | Detalhamento de Peças, Integração BIM/CAD (TQS/Tekla), Programação de Projetos |
| **3. FABRICAÇÃO** | Bordô / Vermelho | PCP, Fôrmas/Pistas, Programação Diária, Armação, Aço e Gestão de Lotes |
| **4. LOGÍSTICA** | Laranja | Programação de Cargas, Romaneios, Conferência de Saída e Estoque de Pátio |
| **5. MONTAGEM** | Verde | Sequência de Montagem em Campo, Equipes de Guindaste e Diário de Obra |
| **6. QUALIDADE** | Amarelo Ouro | Checklists NBR 9062, Rompimento de Corpos de Prova (CPs) e Certificados |

---

## 1. 📋 MÓDULO GERAL (Setup e Cadastros Mestres)

### 🔹 Cadastros:
- **Cadastro de Obras:** Criação dos contratos das obras (Cliente, Localidade da Obra, Cronograma de Entrega, Engenheiro Responsável).
- **Cadastro de Usuários:** Gestão dos operadores, encarregados, engenheiros e permissões de acesso.
- **Cadastro de Materiais:** Insumos da fábrica (Cimento, Brita, Areia, Aditivos químicos, Aço CA-50, Cordoalhas CP-190).
- **Parâmetros:** Configurações de horários de turno de concretagem, tolerâncias dimensionais e regras de negócio.
- **Alertas:** Configuração de notificações automáticas para prazos, rupturas de concreto e pendências.

### 🔹 Registros & Gestão:
- **Impressão de Etiquetas:** Emissão de etiquetas físicas com QR Code / Código de Barras para colagem nas peças recém-desmoldadas.
- **Transf. e Reapro. (Transferência e Reaproveitamento):** Remanejamento de peças entre diferentes obras ou reaproveitamento de estoque.
- **Inventário:** Auditoria física e contagem de peças no pátio de estocagem.
- **Programado X Realizado:** Relatório comparativo em tempo real de metas físicas e financeiras da fábrica.

---

## 2. 📐 MÓDULO PROJETO (Engenharia e Detalhamento)

### 🔹 Registros & Integração:
- **Registro de Projeto:** Cadastro detalhado de cada elemento que compõe a obra:
  - *Pilares:* $P_1, P_2, \dots$ com consoles, dentes e cálices.
  - *Vigas:* $V_1, V_2, \dots$ (Vigas I, Vigas T, Vigas Calha, Vigas de Rolamento).
  - *Lajes & Painéis:* Painéis maciços, painéis alveolares verticais e lajes alveolares protendidas.
- **Integração de Projetos:** Importador de arquivos de projetos estruturais (IFC / XML / TQS / Tekla).
- **Programação de Projeto:** Cronograma de liberação das pranchas técnicas para o setor de armação e formas.
- **Controle de Tarefas:** Distribuição e acompanhamento do fluxo de desenho e cálculo.

---

## 3. 🏭 MÓDULO FABRICAÇÃO (PCP, Armação e Concretagem)

### 🔹 Cadastros:
- **Cadastro de Formas / Pistas:** Cadastro das pistas de protensão e fôrmas metálicas (comprimento total útil, largura, altura e se é protendida ou concreto armado).
- **Cadastro de Equipes:** Equipes de corte/dobra, armação, montagem de fôrma, concretagem e desmoldagem.

### 🔹 Registros (Fluxo Diário do PCP):
- **Planejamento de Fabricação:** Cronograma macro semanal de ocupação das pistas da fábrica.
- **Programação de Fabricação (Ocupação de Pistas):** 
  - O operador visualiza graficamente a pista (ex: pista de 60 metros).
  - Seleciona as peças pendentes da obra e "encaixa" no comprimento da pista (ex: 3 pilares de 18m).
  - O sistema valida a ocupação e emite a **Ordem de Produção (OP)**.
- **Estoque de Armação & Planilha de Aço:** Relação de corte e dobra das barras de aço CA-50 e metragem de cordoalhas CP-190.
- **Registro de Complementos:** Controle de chumbadores, inserts metálicos, bainhas e consolos embutidos.
- **Gestão de Lote:** Agrupamento das peças produzidas na mesma betonada/corrida para rastreabilidade de resistência do concreto.

---

## 4. 🚚 MÓDULO LOGÍSTICA (Expedição e Transporte)

### 🔹 Registros:
- **Registro de Cargas & Programação de Cargas:** Montagem da carga da carreta/caminhão munck selecionando as peças prontas do estoque, respeitando os limites de peso e comprimento rodoviário.
- **Conferência de Cargas (Conf. de Cargas):** Bipagem dos QR Codes na saída da fábrica para garantir que nenhuma peça vá trocada para a obra.
- **Registro de Acabamento:** Liberação da peça após retoques finos, desmoldagem e hidratação/cura.
- **Estoque de Peças:** Mapa do pátio com localização de cada peça pronta.

---

## 5. 🏗️ MÓDULO MONTAGEM (Canteiro de Obras)

### 🔹 Registros:
- **Planejamento e Programação de Montagem:** Ordem cronológica de içamento (Fundação/Cálices ➔ Pilares ➔ Vigas ➔ Lajes/Painéis).
- **Registro de Montagem:** Apontamento das peças que foram içadas e fixadas com grauteamento na obra.
- **Diário de Obra:** Registro de condições de tempo (chuva/vento), horas de guindaste paradas e ocorrências do canteiro.

---

## 6. 🧪 MÓDULO QUALIDADE (Laboratório e Normas NBR)

### 🔹 Registros & Relatórios:
- **Controle de Corpo de Prova (CP):** Cadastro dos corpos de prova moldados em cada caminhão betoneira/betonada.
- **Análise de Corpo de Prova:** Lançamento das rupturas da prensa hidráulica ($F_{ck}$ com 1 dia, 7 dias e 28 dias).
- **Checklists de Fabricação, Acabamento e Montagem:** Inspeção dimensional, cobrimento de armadura e ausência de fissuras.
- **Controle de Certificados & Gráficos Não Conforme:** Emissão do laudo de qualidade final entregue ao cliente junto com a ART.

---

## 🚀 ROTEIRO RESUMIDO: COMO LANÇAR UMA OBRA DO ZERO

```text
[Passo 1: GERAL]      ➔ Criar a Obra em "Cadastro de Obras" com datas e cliente.
[Passo 2: PROJETO]    ➔ Lançar as Peças em "Registro de Projeto" (dimensões, m³ e kg de aço).
[Passo 3: FABRICAÇÃO] ➔ Programar a Pista em "Programação de Fabricação" e emitir a OP.
[Passo 4: QUALIDADE]  ➔ Cadastrar os CPs da concretagem e registrar os ensaios de rompimento.
[Passo 5: LOGÍSTICA]  ➔ Montar a carga do caminhão em "Programação de Cargas" e bipar no pátio.
[Passo 6: MONTAGEM]   ➔ Apontar as peças içadas em "Registro de Montagem" no canteiro.
```
