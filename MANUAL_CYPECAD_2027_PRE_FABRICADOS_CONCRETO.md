# 🏗️ MANUAL CYPECAD 2027 — CÁLCULO ESTRUTURAL DE PRÉ-FABRICADOS DE CONCRETO
**Normas Brasileiras:** ABNT NBR 9062:2017 & ABNT NBR 6118:2023  
**Software:** CYPECAD 2027 (CYPE Ingenieros)  
**Empresa:** Régis Tavares Engenharia Civil (Engenharia Otimizada)  
**Arquivo PDF Oficial:** [`MANUAL_CYPECAD_2027_PRE_FABRICADOS_CONCRETO.pdf`](file:///D:/Engenharia-Otimizada-Site/MANUAL_CYPECAD_2027_PRE_FABRICADOS_CONCRETO.pdf)

---

## 🧭 FLUXO GERAL DE TRABALHO NO CYPECAD 2027

```
[1. Configuração de Normas NBR] ➔ [2. Pavimentos & DWG] ➔ [3. Lançamento dos Elementos] ➔ [4. Cargas & Vento] ➔ [5. Cálculo] ➔ [6. Auditoria Passou/Não Passou] ➔ [7. Relatórios & DWG]
```

---

## 1. ⚙️ CONFIGURAÇÃO INICIAL E NORMAS BRASILEIRAS

### 1.1 Criar a Obra:
1. Abra o CYPECAD 2027 e vá em **Arquivo > Novo**.
2. Digite o nome da obra (ex: `GALPAO_PREFAB_30x60`) e selecione **Obra Vazia**.
3. Clique em **Aceitar**.

### 1.2 Configurar 'Dados Gerais' (Materiais e Normas ABNT):
- **Norma de Concreto:** Selecionar **ABNT NBR 6118:2023 / NBR 9062:2017**.
- **Concreto (fck):** Adotar **C35, C40 ou C50** ($f_{ck} = 35\text{ a }50\text{ MPa}$).
- **Aço Passivo:** **CA-50** ($f_{yk} = 500\text{ MPa}$) e **CA-60** para estribos finos.
- **Aço Ativo (Protensão):** **CP-190 RB** ($f_{ptk} = 1900\text{ MPa}$) para lajes alveolares e vigas protendidas.
- **Agregado Máximo:** $d_{max} = 19\text{ mm}$ (Brita 1).
- **Classe de Agressividade Ambiental (CAA):** **CAA II** (Urbana, cobrimento $c_{nom} = 30\text{ mm}$) ou **CAA III** (Industrial, cobrimento $c_{nom} = 35\text{ a }40\text{ mm}$).

---

## 2. 📐 DEFINIÇÃO DE PAVIMENTOS E MÁSCARAS DWG/DXF

### 2.1 Criar Pavimentos (Introdução > Pavimentos > Novos Pavimentos):
- **04. Cobertura (Z = +8.50m):** Altura 4.00m | Carga perm.: $0.25\text{ kN/m}^2$ | Sobrecarga: $0.25\text{ kN/m}^2$.
- **03. Mezanino (Z = +4.50m):** Altura 4.50m | Carga perm.: $1.50\text{ kN/m}^2$ | Sobrecarga: $5.00\text{ kN/m}^2$.
- **02. Piso Industrial (Z = +0.15m):** Apoiado no solo ($20.00\text{ kN/m}^2$).
- **01. Fundação / Cálices (Z = 0.00m):** Nível zero.

### 2.2 Importar Arquitetura (Máscara DXF/DWG):
1. Clique no ícone **Plantas / Máscaras** (prancheta azul no topo).
2. Clique em **+** e selecione o arquivo DWG da arquitetura.
3. Ajuste a escala para **1 metro = 1 unidade**.
4. Defina a **Origem da Planta (0,0)** em uma quina de pilar de referência.

---

## 3. 🏗️ LANÇAMENTO GEOMÉTRICO DOS ELEMENTOS PRÉ-FABRICADOS

### 3.1 Pilares Pré-Moldados com Consolos:
- Na aba **Entrada de Pilares > Introdução > Novo Pilar**:
  - Seção: $40\times 40\text{ cm}, 50\times 50\text{ cm}$ ou $40\times 60\text{ cm}$.
  - Vinculação: *Com Vinculação Exterior* (engastado) ou *Sem Vinculação Exterior* (com blocos de cálices).
  - Coeficiente de engastamento no topo = $0.00$ (articulado para receber tesoura/viga metálica).
  - **Consolos / Mísulas:** Definir a cota Z de cada consolo (ex: $+4.30\text{m}$), balanço ($a \ge 25\text{ cm}$) e altura ($h_1 \ge 35\text{ cm}$).

### 3.2 Vigas Pré-Fabricadas e Apoios Articulados:
- Na aba **Entrada de Pavimentos > Vigas/Paredes > Entrar Viga**:
  - Selecionar *Viga Pré-Fabricada Retangular, Viga I ou Viga T*.
  - **Articular Extremidades (M=0):** Vá em **Vigas > Articular / Desconectar** e clique nas pontas das vigas (aparece um círculo verde indicando momento fletor nulo, simulando o apoio livre sobre o consolo).
  - Configurar almofada de **Neoprene Fretado** nas propriedades de apoio da viga.

### 3.3 Lajes Alveolares e Vigotas Protendidas:
- Vá em **Lajes > Gestão de Lajes > Entrar Laje**:
  - Selecionar **Lajes Pré-Fabricadas Alveolares**.
  - Altura do painel ($h = 16, 20\text{ ou }25\text{ cm}$) + Capa de concreto moldada in loco ($h_c \ge 5.0\text{ cm}$ com $f_{ck} \ge 25\text{ MPa}$).
  - Armadura de distribuição da capa: Malha soldada Q-138 ($\phi 4.2\text{ mm}$ a cada $10\text{ cm}$) para garantir o **diafragma rígido**.

### 3.4 Fundações com Cálices Pré-Moldados:
- Vá em **Fundações > Elementos de Fundação > Novo**:
  - Selecionar **Bloco sobre Estacas com Cálice Pré-Moldado**.
  - Embutimento conforme NBR 9062: $l_{emb} \ge 1.5 \times h_{pilar}$ (parede lisa) ou $l_{emb} \ge 1.2 \times h_{pilar}$ (parede dentada).

---

## 4. 💨 CARGAS E AÇÕES NORMATIVAS (VENTO NBR 6123)

1. Vá em **Dados Gerais > Ações > Ação do Vento > ABNT NBR 6123**.
2. **Velocidade Básica ($V_0$):** $40\text{ a }45\text{ m/s}$ (conforme a região de SP/PR).
3. **Fator Topográfico ($S_1$):** $1.0$ (terreno plano).
4. **Fator de Rugosidade ($S_2$):** Categoria IV (industrial/urbano), Classe B ($20\text{ a }50\text{m}$).
5. **Fator Estatístico ($S_3$):** $1.0$ (edificações industriais/comerciais convencionais).
6. **Situações Transitórias de Içamento e Transporte (NBR 9062):**
   - Desmoldagem e Içamento na fábrica: $\gamma_{din} = 1.30$.
   - Transporte em carreta: $\gamma_{transp} = 1.50$.

---

## 5. ⚡ O PROCESSAMENTO E CÁLCULO ESTRUTURAL

1. Acesse o menu superior **Calcular > Calcular a obra (inclusive fundações)**.
2. Marque:
   - `[x]` **Redimensionar todas as armaduras**.
   - `[x]` **Considerar não linearidade geométrica (Efeitos de 2ª Ordem / P-Delta)**.
3. Clique em **Aceitar** e aguarde o cálculo por elementos finitos.

---

## 6. 🔍 COMO VERIFICAR SE O PROJETO PASSOU OU DEU ERRO

Mude para a aba **Resultados** no rodapé do CYPECAD:

### 6.1 Estabilidade Global (Coeficiente Gama-Z $\gamma_z$):
- Vá em **Resultados > Relatórios > Estabilidade Global**.
  - $\mathbf{\gamma_z \le 1.10}$: **ESTRUTURA DE NÓS FIXOS (EXCELENTE)**.
  - $\mathbf{1.10 < \gamma_z \le 1.30}$: **ESTRUTURA DE NÓS MÓVEIS (ACEITÁVEL)**.
  - $\mathbf{\gamma_z > 1.30}$: **ESTRUTURA INSTÁVEL (NÃO PASSOU!)**. Aumente a seção dos pilares ou engaste as fundações.

### 6.2 Verificação dos Pilares (Verificações ELU e ELS):
- Vá em **Resultados > Pilares > Editar Pilar** e clique no pilar desejado.
- Clique no ícone de **Check Verde (Verificações NBR)**:
  - Se todas as linhas estiverem com **`[✓ Cumpre]`** em verde, o pilar está **APROVADO**.
  - Se houver **`[✗ Não Cumpre]`** em vermelho: Verificar flexo-compressão oblíqua, esbeltez ($\lambda > 140$) ou taxa de armadura $> 4\%$.

### 6.3 Verificação das Vigas e Flechas (ELS):
- Vá em **Resultados > Vigas/Paredes > Editar Vigas**:
  - **Flecha Total:** Deve cumprir $f_{total} \le L/250$ (para pisos) ou $L/350$ (sob alvenaria).
  - **Fissuração ($w_k$):** Em ambiente industrial (CAA III), deve cumprir $w_k \le 0.20\text{ mm}$.

### 6.4 Verificação dos Consolos Pré-Moldados (Biela e Tirante NBR 9062):
- Vá em **Resultados > Consolos > Editar**:
  - **Tensão na Biela de Concreto:** $\sigma_c \le 0.60 \times f_{cd}$ (evita esmagamento do concreto).
  - **Tirante de Aço ($A_{st}$):** Armadura principal tracionada dimensionada.
  - **Estribos de Costura:** $A_{sw} \ge 0.40 \times A_{st}$ distribuídos nos $2/3$ superiores.

---

## 7. 🛠️ GUIA DE CORREÇÃO DE ERROS ESTRUTURAIS

| Erro no CYPECAD | Causa | Solução de Engenharia |
|---|---|---|
| **Esbeltez do Pilar ($\lambda > 140$)** | Pilar muito fino para o pé-direito | Aumentar a dimensão do pilar na direção fraca (ex: de $30\times 30$ para $40\times 50\text{ cm}$) ou criar vigas de travamento. |
| **Esmagamento do Concreto no Pilar** | Carga vertical + momento de vento muito altos | 1. Aumentar o $f_{ck}$ para $40\text{ ou }50\text{ MPa}$.<br/>2. Aumentar a seção do pilar. |
| **Viga com Flecha Excessiva ($> L/250$)** | Altura da viga insuficiente para o vão | 1. Aumentar a altura da viga ($h \approx \text{Vão}/10$).<br/>2. Adotar seção I protendida. |
| **Consolo com Esmagamento de Biela** | Carga da viga concentrada | 1. Aumentar largura/altura do consolo.<br/>2. Aumentar $f_{ck}$.<br/>3. Aproximar o neoprene do pilar. |
| **Gama-Z $> 1.30$** | Instabilidade sob vento | 1. Engastar pilares no cálice.<br/>2. Adicionar contraventamentos em X nos oitões. |

---

## 8. 📄 EXPORTAÇÃO DE RELATÓRIOS E PRANCHAS DWG

1. **Memória de Cálculo Completa:** Menu **Arquivo > Relatórios da Obra > Memória de Cálculo** (emite o laudo com formulações e ART).
2. **Quantitativo de Materiais:** Tabela resumida de concreto ($m^3$) e aço CA-50 ($kg$) dividido por bitola.
3. **Pranchas em DWG:** Menu **Arquivo > Desenhos** > Exportar Formas, Locação e Detalhamento de Armaduras para AutoCAD DWG.
