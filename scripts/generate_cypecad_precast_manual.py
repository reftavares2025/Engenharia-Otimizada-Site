import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm, mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT
from reportlab.pdfgen import canvas
from reportlab.graphics.shapes import Drawing, Rect, String, Line, Circle, Group

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_decorations(self, page_count):
        if self._pageNumber > 1:
            self.saveState()
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#0F2942"))
            self.drawString(1.8 * cm, 28.5 * cm, "CYPECAD 2027 — MANUAL DE CÁLCULO ESTRUTURAL: PRÉ-FABRICADOS")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748B"))
            self.drawRightString(19.2 * cm, 28.5 * cm, "NBR 9062:2017 & NBR 6118:2023")
            
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.6)
            self.line(1.8 * cm, 28.3 * cm, 19.2 * cm, 28.3 * cm)
            
            self.line(1.8 * cm, 1.8 * cm, 19.2 * cm, 1.8 * cm)
            self.drawString(1.8 * cm, 1.3 * cm, "Régis Tavares Engenharia Civil — Guia Prático Passo a Passo")
            page_text = f"Página {self._pageNumber} de {page_count}"
            self.drawRightString(19.2 * cm, 1.3 * cm, page_text)
            self.restoreState()

def generate_cypecad_precast_pdf():
    pdf_out = r"D:\Engenharia-Otimizada-Site\MANUAL_CYPECAD_2027_PRE_FABRICADOS_CONCRETO.pdf"
    
    doc = SimpleDocTemplate(
        pdf_out,
        pagesize=A4,
        leftMargin=1.8*cm,
        rightMargin=1.8*cm,
        topMargin=2.2*cm,
        bottomMargin=2.2*cm
    )

    styles = getSampleStyleSheet()
    
    # Custom colors
    cype_red = colors.HexColor("#C0392B")
    primary = colors.HexColor("#0F2942")
    secondary = colors.HexColor("#0284C7")
    accent_green = colors.HexColor("#15803D")
    accent_gold = colors.HexColor("#D97706")
    text_dark = colors.HexColor("#1E293B")

    title_cover = ParagraphStyle('CoverT', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=cype_red, alignment=TA_CENTER)
    subtitle_cover = ParagraphStyle('CoverSub', parent=styles['Normal'], fontName='Helvetica', fontSize=10.5, leading=14, textColor=colors.HexColor("#475569"), alignment=TA_CENTER)
    
    h1 = ParagraphStyle('H1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=primary, spaceBefore=10, spaceAfter=4, keepWithNext=True)
    h2 = ParagraphStyle('H2', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=secondary, spaceBefore=7, spaceAfter=2, keepWithNext=True)
    h3 = ParagraphStyle('H3', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=11.5, textColor=colors.HexColor("#334155"), spaceBefore=5, spaceAfter=2, keepWithNext=True)
    
    body = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=text_dark, alignment=TA_JUSTIFY, spaceAfter=3)
    bullet = ParagraphStyle('Bullet', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=text_dark, leftIndent=10, spaceAfter=2)
    step_num = ParagraphStyle('StepNum', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=12, textColor=cype_red)

    story = []

    # ==========================================
    # CAPA TÉCNICA
    # ==========================================
    story.append(Spacer(1, 1.5 * cm))
    
    badge_data = [[Paragraph("<b>CYPECAD 2027</b><br/><font size=9 color='#64748B'>SOFTWARE DE CÁLCULO E DIMENSIONAMENTO ESTRUTURAL</font>", title_cover)]]
    t_badge = Table(badge_data, colWidths=[17.4*cm])
    t_badge.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FDF2F2")),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 14),
        ('BOTTOMPADDING', (0,0), (-1,-1), 14),
        ('BOX', (0,0), (-1,-1), 1.5, cype_red),
    ]))
    story.append(t_badge)
    story.append(Spacer(1, 1 * cm))

    story.append(Paragraph("MANUAL DE CÁLCULO ESTRUTURAL DE PRÉ-FABRICADOS E PRÉ-MOLDADOS DE CONCRETO", title_cover))
    story.append(Spacer(1, 0.3 * cm))
    story.append(Paragraph("GUIA PRÁTICO PASSO A PASSO: DA MODELAGEM À ANÁLISE DE VERIFICAÇÃO CONFORME NBR 9062:2017 E NBR 6118:2023", subtitle_cover))
    story.append(Spacer(1, 1.2 * cm))

    meta_info = [
        [Paragraph("<b>Engenharia:</b> Régis Tavares Engenharia Civil", body), Paragraph("<b>Software:</b> CYPECAD 2027 (CYPE Ingenieros)", body)],
        [Paragraph("<b>Normas Brasileiras:</b> NBR 9062, NBR 6118, NBR 6120, NBR 6123", body), Paragraph("<b>Tipologia:</b> Galpões, Edifícios e Estruturas Pré-Fabricadas", body)],
        [Paragraph("<b>Elementos:</b> Pilares, Consolos, Vigas, Lajes Alveolares, Cálices", body), Paragraph("<b>Data da Edição:</b> Agosto / 2026", body)]
    ]
    t_meta = Table(meta_info, colWidths=[8.7*cm, 8.7*cm])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 1.5 * cm))

    resumo_box = [
        [Paragraph("<b>OBJETIVO DESTE MANUAL:</b><br/>Ensinar o engenheiro passo a passo como iniciar um projeto no CYPECAD 2027, parametrizar as normas brasileiras (NBR 9062 e NBR 6118), lançar pilares com consolos, vigas pré-moldadas, lajes alveolares e cálices de fundação, inserir as ações de vento e acidentais, processar o cálculo e interpretar os relatórios visuais de 'Passou / Não Passou' para garantir a segurança estrutural da obra.", body)]
    ]
    t_box = Table(resumo_box, colWidths=[17.4*cm])
    t_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EFF6FF")),
        ('BOX', (0,0), (-1,-1), 0.8, colors.HexColor("#BFDBFE")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_box)
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 1: CRIAÇÃO DA OBRA E NORMAS
    # ==========================================
    story.append(Paragraph("CAPÍTULO 1: CONFIGURAÇÃO INICIAL E NORMAS BRASILEIRAS NO CYPECAD 2027", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))
    
    story.append(Paragraph("Ao abrir o CYPECAD 2027, o primeiro passo é configurar os dados gerais da obra e assegurar que todos os parâmetros estejam vinculados às normas ABNT vigentes.", body))
    
    story.append(Paragraph("1.1 Passo a Passo para Criar Nova Obra:", h2))
    story.append(Paragraph("1. Clique no menu superior <b>Arquivo > Novo</b>.", bullet))
    story.append(Paragraph("2. Digite o <b>Nome do Arquivo</b> (ex: <i>GALPAO_PREFAB_SP_01</i>) e a <b>Descrição</b> (ex: <i>Galpão Logístico Pré-Fabricado 30x60m</i>).", bullet))
    story.append(Paragraph("3. Selecione a opção <b>Obra Vazia</b> (ou <i>Introdução Automática DXF/DWG</i> se desejar importar a arquitetura no mesmo instante) e clique em <b>Aceitar</b>.", bullet))

    story.append(Paragraph("1.2 Configuração da Janela 'Dados Gerais' (Normas e Materiais):", h2))
    story.append(Paragraph("Na janela de <b>Dados Gerais</b>, configure exatamente as seguintes opções:", body))

    normas_table = [
        [Paragraph("<b>Campo no CYPECAD</b>", body), Paragraph("<b>Configuração Obrigatória (Norma Brasileira)</b>", body), Paragraph("<b>Justificativa Técnica de Engenharia</b>", body)],
        [Paragraph("<b>Norma de Concreto</b>", body), Paragraph("<b>ABNT NBR 6118:2023 / NBR 9062:2017</b>", body), Paragraph("Norma mãe de concreto e norma específica de estruturas pré-moldadas.", body)],
        [Paragraph("<b>Concreto (fck)</b>", body), Paragraph("<b>C35, C40 ou C50 (fck = 35 a 50 MPa)</b>", body), Paragraph("Pré-fabricados exigem fck elevado para desforma rápida e protensão sem fissuras.", body)],
        [Paragraph("<b>Aço Passivo</b>", body), Paragraph("<b>CA-50 (fyk = 500 MPa) e CA-60</b>", body), Paragraph("Aço padrão brasileiro para armaduras longitudinais e estribos.", body)],
        [Paragraph("<b>Aço Ativo (Protendido)</b>", body), Paragraph("<b>CP-190 RB (fptk = 1900 MPa)</b>", body), Paragraph("Cordoalhas de relaxação baixa para lajes alveolares e vigas protendidas.", body)],
        [Paragraph("<b>Agregado Máximo</b>", body), Paragraph("<b>d_max = 19 mm (Brita 1)</b>", body), Paragraph("Garante boa trabalhabilidade e cobrimento nas formas metálicas estreitas.", body)],
        [Paragraph("<b>Classe de Agressividade</b>", body), Paragraph("<b>CAA II (Urbana) ou CAA III (Industrial)</b>", body), Paragraph("Define o cobrimento nominal mínimo: c_nom = 30mm (CAA II) ou 35-40mm (CAA III).", body)]
    ]
    t_normas = Table(normas_table, colWidths=[3.5*cm, 5.5*cm, 8.4*cm])
    t_normas.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_normas)
    story.append(Spacer(1, 0.4 * cm))

    # ==========================================
    # CAPÍTULO 2: NÍVEIS E MÁSCARAS DWG/DXF
    # ==========================================
    story.append(Paragraph("CAPÍTULO 2: DEFINIÇÃO DE PAVIMENTOS E IMPORTAÇÃO DA PLANTA DWG/DXF", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))

    story.append(Paragraph("2.1 Criação dos Pavimentos da Estrutura:", h2))
    story.append(Paragraph("Acesse o menu <b>Introdução > Pavimentos > Novos Pavimentos</b> e insira a tabela de alturas da edificação:", body))

    pav_data = [
        [Paragraph("<b>Pavimento / Nível</b>", body), Paragraph("<b>Cota Z (m)</b>", body), Paragraph("<b>Altura (m)</b>", body), Paragraph("<b>Carga Permanente (g)</b>", body), Paragraph("<b>Sobrecarga (q)</b>", body)],
        [Paragraph("<b>04. Cobertura (Terças/Tesouras)</b>", body), Paragraph("+8.50 m", body), Paragraph("4.00 m", body), Paragraph("0.25 kN/m² (Telha termoacústica)", body), Paragraph("0.25 kN/m² (Manutenção/Vento)", body)],
        [Paragraph("<b>03. Mezanino (Lajes Alveolares)</b>", body), Paragraph("+4.50 m", body), Paragraph("4.50 m", body), Paragraph("1.50 kN/m² (Piso/Revestimento)", body), Paragraph("5.00 kN/m² (Escritório/Depósito)", body)],
        [Paragraph("<b>02. Piso Industrial</b>", body), Paragraph("+0.15 m", body), Paragraph("0.15 m", body), Paragraph("Apoiado no solo (radier/lastro)", body), Paragraph("20.00 kN/m² (Tráfego de carretas)", body)],
        [Paragraph("<b>01. Fundação (Cálice)</b>", body), Paragraph("0.00 m", body), Paragraph("-", body), Paragraph("-", body), Paragraph("-", body)]
    ]
    t_pav = Table(pav_data, colWidths=[4.2*cm, 2.2*cm, 2.2*cm, 4.4*cm, 4.4*cm])
    t_pav.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_pav)
    story.append(Spacer(1, 0.3 * cm))

    story.append(Paragraph("2.2 Importação da Planta de Arquitetura (Máscara DXF/DWG):", h2))
    story.append(Paragraph("1. Clique no ícone de <b>Plantas / Máscaras</b> (ícone de prancheta azul no topo).", bullet))
    story.append(Paragraph("2. Clique no botão <b>+ (Adicionar)</b> e selecione o arquivo DWG/DXF do projeto de arquitetura.", bullet))
    story.append(Paragraph("3. Certifique-se de que a escala de importação seja <b>1 metro = 1 unidade</b> (ou ajuste com o botão <i>Mudar a escala</i>).", bullet))
    story.append(Paragraph("4. Defina a <b>Origem da Planta</b> (ponto 0,0) clicando em uma quina de pilar de referência comum a todos os pavimentos.", bullet))
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 3: LANÇAMENTO DOS ELEMENTOS PRÉ-FABRICADOS
    # ==========================================
    story.append(Paragraph("CAPÍTULO 3: LANÇAMENTO GEOMÉTRICO DOS ELEMENTOS PRÉ-FABRICADOS", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))

    story.append(Paragraph("3.1 Lançamento de Pilares Pré-Moldados com Consolos (NBR 9062):", h2))
    story.append(Paragraph("Acesse a aba <b>Entrada de Pilares > Introdução > Novo Pilar</b>:", body))
    story.append(Paragraph("• <b>Seção do Pilar:</b> Pilares pré-moldados típicos adotam seções retangulares de $40\\times 40\\text{ cm}, 50\\times 50\\text{ cm}$ ou $40\\times 60\\text{ cm}$.", bullet))
    story.append(Paragraph("• <b>Vinculação Exterior:</b> Selecione <i>'Sem Vinculação Exterior'</i> caso vá calcular blocos de fundação com cálices, ou <i>'Com Vinculação Exterior (Engastado)'</i> caso a fundação seja calculada separadamente.", bullet))
    story.append(Paragraph("• <b>Coeficientes de Engastamento:</b> No topo do pilar (apoio de tesouras metálicas), reduza o coeficiente de engastamento para $0.00$ (articulação perfeita) na direção longitudinal e transversal.", bullet))
    story.append(Paragraph("• <b>Consolos Pré-Moldados:</b> Acesse o menu <i>Consolos / Mísulas</i> e defina as cotas Z dos dentes de apoio (ex: apoio de vigas a $+4.30\\text{m}$ e apoio de ponte rolante a $+6.00\\text{m}$). Defina o balanço do consolo ($a \\ge 25\\text{ cm}$) e a altura ($h_1 \\ge 35\\text{ cm}$).", bullet))

    story.append(Paragraph("3.2 Lançamento de Vigas Pré-Fabricadas (Articulações e Almofadas de Neoprene):", h2))
    story.append(Paragraph("Acesse a aba <b>Entrada de Pavimentos > Vigas/Paredes > Entrar Viga</b>:", body))
    story.append(Paragraph("• <b>Tipologia da Viga:</b> Selecione <i>Viga Pré-Fabricada Retangular, Viga I ou Viga T</i>.", bullet))
    story.append(Paragraph("• <b>Articulação de Extremidades (M=0):</b> Como vigas pré-moldadas apoiam sobre consolos sem armadura de continuidade, é <b>obrigatório</b> clicar em <b>Vigas > Articular / Desconectar</b> e clicar nas duas pontas da viga (a extremidade fica com um círculo verde indicando momento nulo $M=0$).", bullet))
    story.append(Paragraph("• <b>Apoio Elastômero (Neoprene):</b> Configure a rigidez do aparelho de apoio de neoprene fretado na aba de propriedades da viga para absorver rotações sem fissurar a quina do consolo.", bullet))

    story.append(Paragraph("3.3 Lançamento de Lajes Alveolares e Vigotas Protendidas:", h2))
    story.append(Paragraph("Acesse o menu <b>Lajes > Gestão de Lajes > Entrar Laje</b>:", body))
    story.append(Paragraph("• Selecione <b>Lajes Pré-Fabricadas Alveolares</b> (ou <i>Lajes de Vigotas Protendidas</i>).", bullet))
    story.append(Paragraph("• Defina a altura do painel alveolar ($h = 16\\text{ cm}, 20\\text{ cm}, 25\\text{ cm}$) e a espessura da capa de concreto moldada in loco ($h_c \\ge 5.0\\text{ cm}$ com $f_{ck} \\ge 25\\text{ MPa}$).", bullet))
    story.append(Paragraph("• Defina a armadura de distribuição da capa: Malha soldada Q-138 (fios de $\\phi 4.2\\text{ mm}$ a cada $10\\text{ cm}$) para garantir o efeito de diafragma rígido exigido pela NBR 9062.", bullet))

    story.append(Paragraph("3.4 Fundações com Cálices Pré-Moldados:", h2))
    story.append(Paragraph("Acesse o menu <b>Fundações > Elementos de Fundação > Novo</b>:", body))
    story.append(Paragraph("• Selecione <b>Bloco sobre Estacas com Cálice Pré-Moldado</b>.", bullet))
    story.append(Paragraph("• Configure a profundidade de embutimento do pilar no cálice conforme a NBR 9062: $l_{emb} \\ge 1.5 \\times h_{pilar}$ para cálices de paredes lisas, ou $l_{emb} \\ge 1.2 \\times h_{pilar}$ para cálices corrugados / dentados.", bullet))
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 4: CARGAS E AÇÕES NORMATIVAS
    # ==========================================
    story.append(Paragraph("CAPÍTULO 4: INSERÇÃO DE CARGAS E AÇÕES NORMATIVAS (VENTO NBR 6123)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))

    story.append(Paragraph("4.1 Vento Automático Conforme NBR 6123:2023:", h2))
    story.append(Paragraph("Acesse <b>Dados Gerais > Ações > Ação do Vento > ABNT NBR 6123</b>:", body))
    story.append(Paragraph("• <b>Velocidade Básica ($V_0$):</b> $V_0 = 40\\text{ a }45\\text{ m/s}$ (conforme o mapa de isopletas do Brasil para São Paulo e Paraná).", bullet))
    story.append(Paragraph("• <b>Fator Topográfico ($S_1$):</b> $S_1 = 1.0$ para terreno plano ou levemente ondulado.", bullet))
    story.append(Paragraph("• <b>Fator de Rugosidade e Dimensões ($S_2$):</b> Selecione <i>Categoria IV (Terreno com obstáculos numerosos - cidades/parques industriais)</i> e <i>Classe B (Estruturas entre 20m e 50m)</i>.", bullet))
    story.append(Paragraph("• <b>Fator Estatístico ($S_3$):</b> $S_3 = 1.0$ (Edificações convencionais de ocupação comercial/industrial - Grupo 2).", bullet))
    story.append(Paragraph("• <b>Coeficientes de Pressão ($C_p$):</b> Defina os coeficientes de arrasto na direção X e Y para galpões fechados ou com aberturas.", bullet))

    story.append(Paragraph("4.2 Cargas Especiais de Içamento e Transporte (Situações Transitórias NBR 9062):", h2))
    story.append(Paragraph("Na fase de içamento na fábrica e transporte em carreta, as peças sofrem inversão de momentos e impactos dinâmicos. Configure os coeficientes de impacto:", body))
    story.append(Paragraph("• <b>Desmoldagem e Içamento em Fábrica:</b> Majorar o peso próprio pelo coeficiente dinâmico $\\gamma_{din} = 1.30$.", bullet))
    story.append(Paragraph("• <b>Transporte Rodoviário em Carreta:</b> Majorar pelo coeficiente $\\gamma_{transp} = 1.50$ para verificar tração no topo das vigas e pilares.", bullet))
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 5: O PROCESSAMENTO E CÁLCULO
    # ==========================================
    story.append(Paragraph("CAPÍTULO 5: O PROCESSAMENTO E CÁLCULO ESTRUTURAL (APERTE O PLAY!)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))

    story.append(Paragraph("Com todos os elementos geométricos, apoios, fck e cargas lançados, é hora de rodar o cálculo estrutural.", body))

    story.append(Paragraph("5.1 Executando o Cálculo no CYPECAD:", h2))
    story.append(Paragraph("1. Acesse o menu superior <b>Calcular > Calcular a obra (inclusive fundações)</b>.", bullet))
    story.append(Paragraph("2. Na janela de opções, selecione:", bullet))
    story.append(Paragraph("   - <b>[x] Redimensionar todas as armaduras</b> (o software calcula as bitolas de aço automaticamente).", bullet))
    story.append(Paragraph("   - <b>[x] Considerar não linearidade geométrica (Efeitos de 2ª Ordem / P-Delta)</b>.", bullet))
    story.append(Paragraph("3. Clique em <b>Aceitar</b> e aguarde o processamento matricial de elementos finitos.", bullet))

    story.append(Spacer(1, 0.4 * cm))
    story.append(Paragraph("5.2 O Relatório de Erros de Entrada (Avisos de Cálculo):", h2))
    story.append(Paragraph("Ao final do processamento, o CYPECAD abre a tela de <b>Relatório de Avisos e Erros</b>:", body))
    story.append(Paragraph("• <b>Avisos Amarelos (Triângulo de Advertência):</b> Não impedem o cálculo, mas alertam sobre armaduras mínimas adotadas, limites de espaçamento de estribos ou folgas de cobrimento. Devem ser analisados.", bullet))
    story.append(Paragraph("• <b>Erros Vermelhos (Círculo de Erro):</b> Indicam peças que violaram as condições de segurança da NBR 6118 / NBR 9062 (esmagamento de biela de concreto, taxa de armadura superior ao limite máximo de 4%, flecha excessiva). <b>Exigem correção imediata!</b>", bullet))
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 6: COMO VERIFICAR SE O PROJETO PASSOU
    # ==========================================
    story.append(Paragraph("CAPÍTULO 6: COMO VERIFICAR SE O PROJETO PASSOU (VERIFICAÇÕES NBR)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))

    story.append(Paragraph("Mude para a aba <b>Resultados</b> no canto inferior da tela para auditar o comportamento da estrutura.", body))

    story.append(Paragraph("6.1 Estabilidade Global da Estrutura (Coeficiente Gama-Z $\\gamma_z$):", h2))
    story.append(Paragraph("Acesse <b>Resultados > Relatórios > Estabilidade Global</b>:", body))
    story.append(Paragraph("• O coeficiente $\\gamma_z$ mede a sensibilidade da estrutura aos efeitos de segunda ordem (deslocamentos laterais provocados pelo vento):", body))
    story.append(Paragraph("  - $\\mathbf{\\gamma_z \\le 1.10}$: <b>ESTRUTURA DE NÓS FIXOS (EXCELENTE)</b>. Os efeitos de 2ª ordem são desprezíveis.", bullet))
    story.append(Paragraph("  - $\\mathbf{1.10 < \\gamma_z \\le 1.30}$: <b>ESTRUTURA DE NÓS MÓVEIS (ACEITÁVEL)</b>. Os efeitos de 2ª ordem devem ser considerados no dimensionamento dos pilares.", bullet))
    story.append(Paragraph("  - $\\mathbf{\\gamma_z > 1.30}$: <b>ESTRUTURA INSTÁVEL (NÃO PASSOU!)</b>. A estrutura é excessivamente flexível. <i>Solução: aumentar a seção dos pilares na direção mais fraca ou engastar cálices de fundação.</i>", bullet))

    story.append(Paragraph("6.2 Verificação dos Pilares Pré-Moldados:", h2))
    story.append(Paragraph("Acesse <b>Resultados > Pilares > Editar Pilar</b> e clique em qualquer pilar:", body))
    story.append(Paragraph("• Clique no botão <b>Verificações E.L.U. e E.L.S. (Ícone de Check Verde)</b>:", bullet))
    story.append(Paragraph("  - O software exibe a lista completa de fórmulas da NBR 6118 / NBR 9062 testadas para todas as combinações de carga.", bullet))
    story.append(Paragraph("  - Se todas as linhas estiverem com <b>[✓ Cumpre]</b> em verde, o pilar está <b>100% APROVADO</b>.", bullet))
    story.append(Paragraph("  - Se houver <b>[✗ Não Cumpre]</b> em vermelho, o CYPECAD aponta exatamente o motivo: <i>Flexo-compressão oblíqua, esbeltez excessiva ($\lambda > 140$) ou taxa de armadura $> 4\%$</i>.", bullet))

    story.append(Paragraph("6.3 Verificação das Vigas Pré-Moldadas e Flechas (ELS):", h2))
    story.append(Paragraph("Acesse <b>Resultados > Vigas/Paredes > Editar Vigas</b>:", body))
    story.append(Paragraph("• <b>Flecha Total no Tempo ($f_{total}$):</b> Verifique se a flecha diferida (com efeito de fluência do concreto) cumpre o limite da NBR 6118: $f_{total} \\le L / 250$ (para pisos) ou $f_{total} \\le L / 350$ (para vigas sob alvenaria).", bullet))
    story.append(Paragraph("• <b>Abertura de Fissuras ($w_k$):</b> O CYPECAD calcula a abertura característica de fissura. Para pré-fabricados em ambiente industrial (CAA III), deve-se garantir $w_k \\le 0.20\\text{ mm}$.", bullet))

    story.append(Paragraph("6.4 Verificação dos Consolos Pré-Moldados (Modelo de Biela e Tirante NBR 9062):", h2))
    story.append(Paragraph("Acesse o módulo de consolos em <b>Resultados > Consolos > Editar</b>:", body))
    story.append(Paragraph("• <b>Tensão na Biela de Compressão do Concreto:</b> $\\sigma_c = \\frac{F_{vd}}{\\sin^2 \\theta \\times b \\times a} \\le 0.60 \\times f_{cd}$.", bullet))
    story.append(Paragraph("• <b>Armadura Principal de Tirante ($A_{st}$):</b> Dimensionada para tracionar a carga superior: $A_{st} = \\frac{F_{vd} \\times \\cot \\theta + F_{hd}}{f_{yd}}$.", bullet))
    story.append(Paragraph("• <b>Estribos Horizontais de Costura:</b> Mínimo de $A_{sw} \\ge 0.40 \\times A_{st}$ distribuídos nos dois terços superiores da altura do consolo.", bullet))
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 7: COMO CORRIGIR SE NÃO PASSAR
    # ==========================================
    story.append(Paragraph("CAPÍTULO 7: GUIA RÁPIDO DE CORREÇÃO DE ERROS ESTRUTURAIS", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))

    erro_table = [
        [Paragraph("<b>Mensagem de Erro no CYPECAD</b>", body), Paragraph("<b>Causa Estrutural</b>", body), Paragraph("<b>Como Corrigir para Fazer o Projeto Passar</b>", body)],
        [
            Paragraph("<b>Pilar: Esbeltez excessiva (lambda > 140)</b>", body),
            Paragraph("Pilar muito fino para a altura do pé-direito.", body),
            Paragraph("Aumentar a dimensão do pilar na direção fraca (ex: passar de 30x30cm para 40x50cm) ou criar travejamento intermediário com vigas de fechamento.", body)
        ],
        [
            Paragraph("<b>Pilar: Esmagamento do concreto / Armadura máxima ultrapassada (> 4%)</b>", body),
            Paragraph("Carga vertical muito alta combinada com momento fletor de vento.", body),
            Paragraph("1. Aumentar a classe do concreto para Fck 40 ou 50 MPa.<br/>2. Aumentar a seção de concreto do pilar.", body)
        ],
        [
            Paragraph("<b>Viga: Flecha ativa excessiva (Não cumpre L/250)</b>", body),
            Paragraph("Viga muito baixa para o vão livre ou inércia insuficiente.", body),
            Paragraph("1. Aumentar a altura da viga (regra prática: h = Vão / 12 a Vão / 10).<br/>2. Utilizar seção de viga I protendida.", body)
        ],
        [
            Paragraph("<b>Consolo: Tensão na biela de compressão superior ao limite</b>", body),
            Paragraph("Reação de apoio da viga muito concentrada na ponta do consolo.", body),
            Paragraph("1. Aumentar a largura 'b' ou a altura 'h' do consolo.<br/>2. Aumentar o fck do pilar.<br/>3. Reduzir o braço de alavanca aproximando o neoprene do pilar.", body)
        ],
        [
            Paragraph("<b>Estrutura: Gama-Z > 1.30</b>", body),
            Paragraph("Instabilidade global sob ação do vento.", body),
            Paragraph("1. Engastar a base dos pilares nos cálices de fundação.<br/>2. Adicionar pórticos rígidos ou contraventamentos metálicos em X nos oitões do galpão.", body)
        ]
    ]
    t_erros = Table(erro_table, colWidths=[4.8*cm, 4.2*cm, 8.4*cm])
    t_erros.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), cype_red),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_erros)
    story.append(Spacer(1, 0.4 * cm))

    # ==========================================
    # CAPÍTULO 8: RELATÓRIOS E PRANCHAS DWG
    # ==========================================
    story.append(Paragraph("CAPÍTULO 8: EXPORTAÇÃO DE RELATÓRIOS, MEMORIAIS E PRANCHAS DWG", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))

    story.append(Paragraph("8.1 Emissão do Memorial de Cálculo Oficial (ART / Prefeitura / Cliente):", h2))
    story.append(Paragraph("1. Acesse o menu superior <b>Arquivo > Relatórios da Obra</b>.", bullet))
    story.append(Paragraph("2. Selecione os relatórios essenciais:", bullet))
    story.append(Paragraph("   - <b>Memória de Cálculo Completa:</b> Contém todas as hipóteses de carregamento, coeficientes de ponderação e formulações da NBR 6118 / NBR 9062.", bullet))
    story.append(Paragraph("   - <b>Quantitativo de Aço e Concreto:</b> Tabela resumida de volume de concreto ($m^3$) por classe de Fck e peso total de aço CA-50 ($kg$) dividido por bitola ($\\phi 6.3, \\phi 8.0, \\phi 10.0, \\phi 12.5, \\phi 16.0, \\phi 20.0, \\phi 25.0\\text{ mm}$).", bullet))
    story.append(Paragraph("   - <b>Relatório de Esforços nas Fundações:</b> Forças normais ($N$), momentos ($M$) e cortantes ($V$) na base para cálculo dos blocos e estacas.", bullet))

    story.append(Paragraph("8.2 Exportação de Pranchas Técnicas em DWG / DXF:", h2))
    story.append(Paragraph("1. Acesse o menu <b>Arquivo > Desenhos</b> (ícone de prancha de desenho).", bullet))
    story.append(Paragraph("2. Clique no botão <b>+ (Novo Desenho)</b> e adicione as pranchas:", bullet))
    story.append(Paragraph("   - <b>Planta de Locação e Cargas de Fundação:</b> Eixos dos pilares com cotas e cargas nominais.", bullet))
    story.append(Paragraph("   - <b>Plantas de Fôrmas de Pavimentos:</b> Geometria de vigas, lajes alveolares e cotas de topo.", bullet))
    story.append(Paragraph("   - <b>Detalhamento de Armaduras de Pilares e Consolos:</b> Cortes verticais e transversais com tabelas de ferro.", bullet))
    story.append(Paragraph("   - <b>Detalhamento de Vigas Pré-Fabricadas:</b> Elevação longitudinal com armadura passiva e ativa.", bullet))
    story.append(Paragraph("3. Clique em <b>Aceitar</b> e selecione o formato <b>AutoCAD DWG (Versão 2018/2020)</b>.", bullet))
    story.append(Spacer(1, 0.8 * cm))

    story.append(Paragraph("<b>RÉGIS TAVARES ENGENHARIA CIVIL — ENGENHARIA OTIMIZADA</b><br/><font size=8 color='#64748B'>Manual Prático de Cálculo Estrutural em CYPECAD 2027 • NBR 9062 & NBR 6118</font>", ParagraphStyle('End', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, textColor=primary, alignment=TA_CENTER)))

    # Build
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Manual CYPECAD Pré-Fabricados gerado com sucesso: {pdf_out}")

if __name__ == '__main__':
    generate_cypecad_precast_pdf()
