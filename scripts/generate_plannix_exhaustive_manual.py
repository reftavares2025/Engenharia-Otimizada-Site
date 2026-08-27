import os
import sys
import glob
from PIL import Image as PILImage
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm, mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable, Image as RLImage
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT
from reportlab.pdfgen import canvas

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
            self.drawString(1.8 * cm, 28.5 * cm, "PLANNIX ERP — MANUAL TÉCNICO EXAUSTIVO E GUIA ILUSTRADO")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748B"))
            self.drawRightString(19.2 * cm, 28.5 * cm, "RÉGIS TAVARES ENGENHARIA CIVIL")
            
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.6)
            self.line(1.8 * cm, 28.3 * cm, 19.2 * cm, 28.3 * cm)
            
            self.line(1.8 * cm, 1.8 * cm, 19.2 * cm, 1.8 * cm)
            self.drawString(1.8 * cm, 1.3 * cm, "Dossiê Detalhado: Abas, Telas, Popups, Parâmetros e Integrações BIM / Tekla / TQS")
            page_text = f"Página {self._pageNumber} de {page_count}"
            self.drawRightString(19.2 * cm, 1.3 * cm, page_text)
            self.restoreState()

def build_exhaustive_manual():
    img_dir = r"C:\Users\User\Downloads\PLANNIX"
    pdf_out = r"D:\Engenharia-Otimizada-Site\MANUAL_EXAUSTIVO_PLANNIX_RT_ENGENHARIA.pdf"
    
    doc = SimpleDocTemplate(
        pdf_out,
        pagesize=A4,
        leftMargin=1.8*cm,
        rightMargin=1.8*cm,
        topMargin=2.2*cm,
        bottomMargin=2.2*cm
    )

    styles = getSampleStyleSheet()
    
    # Palette
    primary = colors.HexColor("#0F2942")
    secondary = colors.HexColor("#0284C7")
    accent_red = colors.HexColor("#B91C1C")
    accent_purple = colors.HexColor("#7E22CE")
    accent_orange = colors.HexColor("#C2410C")
    accent_green = colors.HexColor("#15803D")
    accent_gold = colors.HexColor("#D97706")
    text_dark = colors.HexColor("#1E293B")

    title_cover = ParagraphStyle('CoverT', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=primary, alignment=TA_CENTER)
    subtitle_cover = ParagraphStyle('CoverSub', parent=styles['Normal'], fontName='Helvetica', fontSize=10.5, leading=14, textColor=colors.HexColor("#475569"), alignment=TA_CENTER)
    
    h1 = ParagraphStyle('H1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=primary, spaceBefore=10, spaceAfter=4, keepWithNext=True)
    h2 = ParagraphStyle('H2', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=secondary, spaceBefore=7, spaceAfter=2, keepWithNext=True)
    h3 = ParagraphStyle('H3', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=11.5, textColor=colors.HexColor("#334155"), spaceBefore=5, spaceAfter=2, keepWithNext=True)
    
    body = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=text_dark, alignment=TA_JUSTIFY, spaceAfter=3)
    bullet = ParagraphStyle('Bullet', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=text_dark, leftIndent=10, spaceAfter=2)
    img_caption = ParagraphStyle('ImgCap', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7.5, leading=9.5, textColor=colors.HexColor("#0369A1"), alignment=TA_CENTER, spaceBefore=2, spaceAfter=4)

    def get_image_flowable(filename, target_width=16.8*cm):
        path = os.path.join(img_dir, filename)
        if not os.path.exists(path):
            return None
        try:
            with PILImage.open(path) as im:
                orig_w, orig_h = im.size
                aspect = orig_h / float(orig_w)
                target_h = target_width * aspect
                if target_h > 8.5 * cm:
                    target_h = 8.5 * cm
                    target_width = target_h / aspect
            return RLImage(path, width=target_width, height=target_h)
        except Exception:
            return None

    story = []

    # ==========================================
    # CAPA
    # ==========================================
    story.append(Spacer(1, 1 * cm))
    logo_data = [[Paragraph("<b>PLANNIX ERP INDUSTRIAL</b><br/><font size=9 color='#64748B'>CONTROLE ÁGIL E RASTREABILIDADE TOTAL PARA PRÉ-FABRICADOS</font>", title_cover)]]
    t_logo = Table(logo_data, colWidths=[17.4*cm])
    t_logo.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
    ]))
    story.append(t_logo)
    story.append(Spacer(1, 0.5 * cm))

    story.append(Paragraph("MANUAL TÉCNICO EXAUSTIVO DE OPERAÇÃO E IMPLANTAÇÃO", title_cover))
    story.append(Spacer(1, 0.2 * cm))
    story.append(Paragraph("GUIA DEFINITIVO COM TODAS AS ABAS, BOTÕES, PARÂMETROS, INTEGRAÇÕES BIM E TELAS REAIS DO SISTEMA", subtitle_cover))
    story.append(Spacer(1, 0.5 * cm))

    cover_img = get_image_flowable("Captura de tela 2026-08-27 083359.png", target_width=15.5*cm)
    if cover_img:
        story.append(cover_img)
        story.append(Paragraph("<i>Figura 01: Tela de Entrada e Painel Geral do Plannix (Versão 14.00.01 db 195)</i>", img_caption))
    story.append(Spacer(1, 0.5 * cm))

    meta_info = [
        [Paragraph("<b>Empresa:</b> Régis Tavares Engenharia Civil", body), Paragraph("<b>Versão do Desktop:</b> 14.00.01 db 195", body)],
        [Paragraph("<b>Usuário Padrão:</b> REGIS TAVARES", body), Paragraph("<b>Aplicação:</b> Pré-Fabricados de Concreto e Aço", body)],
        [Paragraph("<b>Bases de Conhecimento Integradas:</b> 7 Manuais Plannix", body), Paragraph("<b>Total de Imagens Mapeadas:</b> 112 Capturas Oficiais", body)],
        [Paragraph("<b>Data da Edição:</b> Agosto / 2026", body), Paragraph("<b>Escopo:</b> PCP, Fábrica, Logística, Montagem, Qualidade e API", body)]
    ]
    t_meta = Table(meta_info, colWidths=[8.7*cm, 8.7*cm])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
    ]))
    story.append(t_meta)
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 1: MÓDULO GERAL (EXAUSTIVO)
    # ==========================================
    story.append(Paragraph("CAPÍTULO 1: MÓDULO GERAL (Cadastros Mestres, Usuários, Obras, Materiais e Gestão)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=5))

    img_g_main = get_image_flowable("Captura de tela 2026-08-27 083359.png", target_width=16.8*cm)
    if img_g_main:
        story.append(img_g_main)
        story.append(Paragraph("<i>Figura 02: Menu Principal do Módulo Geral com os Blocos Cadastros, Registros, Relatórios e Gestão</i>", img_caption))

    story.append(Paragraph("<b>1.1 BLOCO CADASTROS (Ícones Azuis):</b>", h2))
    story.append(Paragraph("• <b>Cadastros (Gerais):</b> Configuração de tabelas mestres de apoio: Cidades, Estados, Transportadoras cadastradas, Fornecedores de Insumos, Tipos de Veículos (Carretas Pranchas, Extensíveis, Caminhões Munck) e Tipos de Ocorrência.", bullet))
    story.append(Paragraph("• <b>Cadastro de Usuários:</b> Controle rigoroso de operadores de fábrica, apontadores de campo, projetistas e gerentes. Permite bloquear telas e botões de acordo com o perfil de cada colaborador.", bullet))
    story.append(Paragraph("• <b>Cadastro de Obras:</b> Criação oficial do contrato no sistema: Sigla Única da Obra (ex: <i>GALP-01</i>), Razão Social do Cliente, CNPJ, Endereço do Canteiro, Distância em km da fábrica (essencial para cálculo de frete), Responsável Técnico com ART do CREA e Cronograma Contratual.", bullet))
    story.append(Paragraph("• <b>Alertas:</b> Configuração de avisos e notificações automáticas por e-mail e pop-up (atrasos de desforma, peças recusadas na montagem, ruptura de corpos de prova abaixo do fck de projeto).", bullet))
    story.append(Paragraph("• <b>Parâmetros:</b> Central de regras operacionais da indústria (tolerâncias dimensionais, travas de transferência de peças e regras do mobile).", bullet))
    story.append(Paragraph("• <b>Cadastro de Materiais / Insumos:</b> Insumos básicos consumidos pela fábrica: Cimento (CP-V ARI), Agregados (Areia média, Brita 0, Brita 1), Aditivos químicos (Plastificantes, Aceleradores de pega), Aço CA-50 (barras de 6.3 a 32mm) e Cordoalhas CP-190 RB de protensão.", bullet))

    img_g_cad = get_image_flowable("Captura de tela 2026-08-27 093626.png", target_width=16.8*cm)
    if img_g_cad:
        story.append(Spacer(1, 0.2*cm))
        story.append(img_g_cad)
        story.append(Paragraph("<i>Figura 03: Tela de Configuração e Parâmetros do Módulo Geral</i>", img_caption))

    story.append(Paragraph("<b>1.2 BLOCO REGISTROS:</b>", h2))
    story.append(Paragraph("• <b>Impressão de Etiquetas (Zebra ZPL):</b> Geração de etiquetas térmicas em rolo para fixação nas peças pós-desforma. Utiliza driver ZPL oficial, porta USB fixa (ex: USB001), tonalidade (darkness $\\ge 15$) e calibração Feed. A etiqueta traz o QR Code único, Nome da Peça, Obra, Data de Concretagem, Volume ($m^3$), Peso ($kg$) e Traço ($F_{ck}$).", bullet))
    story.append(Paragraph("• <b>Transf. e Reapro. (Transferência e Reaproveitamento):</b> Migração de peças prontas de uma obra cancelada ou excedente para uma nova obra destino, recalculando automaticamente os custos e saldos contratuais.", bullet))
    story.append(Paragraph("• <b>Inventário:</b> Auditoria física e conferência periódica de estoque de peças no pátio de cura e armazenagem.", bullet))
    story.append(Paragraph("• <b>Integração de Processos:</b> Sincronização em lote de dados entre módulos e bases externas via API Plannix.", bullet))

    story.append(Paragraph("<b>1.3 BLOCO RELATÓRIOS E GESTÃO:</b>", h2))
    story.append(Paragraph("• <b>Programado X Realizado:</b> Visão macro comparativa de produtividade diária, semanal e mensal ($m^3$ e toneladas).", bullet))
    story.append(Paragraph("• <b>Indicadores & Central de Informações:</b> Painel executivo de indicadores de fábrica e exportação de dados para BI/Excel.", bullet))
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 2: MÓDULO PROJETO & INTEGRAÇÃO
    # ==========================================
    story.append(Paragraph("CAPÍTULO 2: MÓDULO PROJETO (Detalhamento, Listas e Integração BIM / Tekla / TQS)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_purple, spaceAfter=5))

    img_p_main = get_image_flowable("Captura de tela 2026-08-27 083416.png", target_width=16.8*cm)
    if img_p_main:
        story.append(img_p_main)
        story.append(Paragraph("<i>Figura 04: Menu Principal do Módulo Projeto (Cor Roxa)</i>", img_caption))

    story.append(Paragraph("<b>2.1 DETALHAMENTO DE TODAS AS ABAS DO MÓDULO PROJETO:</b>", h2))
    story.append(Paragraph("• <b>Cadastro de Equipes:</b> Cadastro das equipes de desenhistas, calculistas e modeladores BIM.", bullet))
    story.append(Paragraph("• <b>Registro de Projeto:</b> Tela de cadastro de elementos da obra: Pilares ($P_1..P_n$), Vigas ($V_1..V_n$), Lajes Alveolares, Painéis e Cálices com suas geometrias, volumes e armaduras.", bullet))
    story.append(Paragraph("• <b>Program. de Projeto:</b> Cronograma de liberação das pranchas e desenhos de armação para a fábrica.", bullet))
    story.append(Paragraph("• <b>Integração de Projetos:</b> Importador automático de arquivos IFC / XML de softwares de cálculo estrutural (TQS, Tekla, Revit, AutoCAD ou Excel).", bullet))
    story.append(Paragraph("• <b>Controle de Tarefas:</b> Distribuição de atividades e pendências de detalhamento.", bullet))

    img_p_reg = get_image_flowable("Captura de tela 2026-08-27 093841.png", target_width=16.8*cm)
    if img_p_reg:
        story.append(Spacer(1, 0.2*cm))
        story.append(img_p_reg)
        story.append(Paragraph("<i>Figura 05: Tela de Registro e Detalhamento de Peças de Projeto</i>", img_caption))

    story.append(Paragraph("<b>2.2 MANUAL DE INTEGRAÇÃO DE PROJETOS (Nível 1 vs. Nível 2):</b>", h2))
    story.append(Paragraph("• <b>Nível 1 (Lançamento Final / Macro):</b> Feito via Planilha Excel (.xlsx) padrão com as colunas: <i>Sigla Obra, Etapa, Produto, Grupo, Seção, Nome da Peça, Quantidade, Volume ($m^3$), Comprimento ($m$)</i>. Cria o escopo financeiro e de compras.", bullet))
    story.append(Paragraph("• <b>Nível 2 (Registro de Projeto / Detalhado):</b> Importação via plugin nativo Tekla/TQS com tabela completa de corte/dobra de aço, consolos, inserts metálicos, chumbadores e pesos reais para emissão das Ordens de Produção (OPs).", bullet))
    story.append(Paragraph("• <b>Cálculo de Peso Real:</b> O Plannix não usa o peso teórico de $2500\\text{ kg/m}^3$; ele calcula o somatório exato: $(\\text{Volume real de concreto} \\times \\text{Densidade}) + (\\text{Peso real das bitolas de aço}) + (\\text{Peso dos complementos e chapas metálicas})$.", bullet))
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 3: MÓDULO FABRICAÇÃO & PCP
    # ==========================================
    story.append(Paragraph("CAPÍTULO 3: MÓDULO FABRICAÇÃO (PCP, Fôrmas, Armação, Aço, Lotes e Concretagem)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_red, spaceAfter=5))

    img_f_main = get_image_flowable("Captura de tela 2026-08-27 083424.png", target_width=16.8*cm)
    if img_f_main:
        story.append(img_f_main)
        story.append(Paragraph("<i>Figura 06: Menu Principal do Módulo Fabricação (Cor Vermelha/Bordô)</i>", img_caption))

    story.append(Paragraph("<b>3.1 DETALHAMENTO DE TODAS AS ABAS DO MÓDULO FABRICAÇÃO:</b>", h2))
    story.append(Paragraph("• <b>Cadastro de Formas / Pistas:</b> Cadastro das pistas de protensão (comprimento total, largura, tipo de perfil I/T/Calha/Retangular e força de protensão máxima suportada pelas cabeceiras).", bullet))
    story.append(Paragraph("• <b>Cadastro de Equipes:</b> Equipes de corte/dobra, armação, posicionamento de fôrma, concretagem e desmoldagem.", bullet))
    story.append(Paragraph("• <b>Planejamento de Fabricação:</b> Visão macro do cronograma semanal e mensal da fábrica.", bullet))
    story.append(Paragraph("• <b>Programação de Fabricação (Ocupação de Pistas):</b> Tela gráfica onde o encarregado encaixa as peças no comprimento da pista para a concretagem do dia seguinte e emite a Ordem de Produção (OP).", bullet))
    story.append(Paragraph("• <b>Estoque de Armação & Planilha de Aço:</b> Romaneio com pesos e comprimentos de corte e dobra das barras de aço CA-50 e cordoalhas CP-190.", bullet))
    story.append(Paragraph("• <b>Registro de Complementos:</b> Controle de consolos, chapas embutidas, chumbadores e ganchos de içamento.", bullet))
    story.append(Paragraph("• <b>Gestão de Lote:</b> Agrupamento das peças produzidas na mesma betonada/corrida para rastreabilidade de resistência do concreto.", bullet))
    story.append(Paragraph("• <b>Rateio de Produção & Estoque de Materiais:</b> Apropriação de custos de cimento, aço e mão de obra por peça fabricada.", bullet))

    img_f_prog = get_image_flowable("Captura de tela 2026-08-27 094527.png", target_width=16.8*cm)
    if img_f_prog:
        story.append(Spacer(1, 0.2*cm))
        story.append(img_f_prog)
        story.append(Paragraph("<i>Figura 07: Tela de Programação de Fabricação e Ocupação das Pistas</i>", img_caption))
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 4: MÓDULO LOGÍSTICA & CARGAS
    # ==========================================
    story.append(Paragraph("CAPÍTULO 4: MÓDULO LOGÍSTICA (Expedição, Pátio, Romaneios e Cargas)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_orange, spaceAfter=5))

    img_l_main = get_image_flowable("Captura de tela 2026-08-27 083431.png", target_width=16.8*cm)
    if img_l_main:
        story.append(img_l_main)
        story.append(Paragraph("<i>Figura 08: Menu Principal do Módulo Logística (Cor Laranja)</i>", img_caption))

    story.append(Paragraph("<b>4.1 DETALHAMENTO DE TODAS AS ABAS DO MÓDULO LOGÍSTICA:</b>", h2))
    story.append(Paragraph("• <b>Registro de Cargas & Program. de Cargas:</b> Montagem da carga da carreta (selecionando as peças prontas do estoque respeitando o peso máximo permitido por eixo e o comprimento do veículo).", bullet))
    story.append(Paragraph("• <b>Conf. de Cargas (Conferência via QR Code):</b> Bipagem obrigatória na saída da fábrica. O sistema bloqueia se uma peça pertencer a outra obra ou não estiver liberada pela Qualidade.", bullet))
    story.append(Paragraph("• <b>Registro de Acabamento:</b> Liberação das peças após retoques finos, desmoldagem e hidratação/cura.", bullet))
    story.append(Paragraph("• <b>Estoque de Peças:</b> Mapa visual do pátio mostrando em qual baia/setor cada peça fabricada está estocada.", bullet))
    story.append(Paragraph("• <b>Integração de Cargas & Relatórios:</b> Emissão do Romaneio de Carga oficial que acompanha o motorista até o canteiro.", bullet))

    img_l_conf = get_image_flowable("Captura de tela 2026-08-27 095136.png", target_width=16.8*cm)
    if img_l_conf:
        story.append(Spacer(1, 0.2*cm))
        story.append(img_l_conf)
        story.append(Paragraph("<i>Figura 09: Tela de Montagem e Conferência de Cargas de Transporte</i>", img_caption))
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 5: MÓDULO MONTAGEM & DIÁRIO
    # ==========================================
    story.append(Paragraph("CAPÍTULO 5: MÓDULO MONTAGEM (Canteiro de Obras, Guindastes e Diário de Obra)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_green, spaceAfter=5))

    img_m_main = get_image_flowable("Captura de tela 2026-08-27 083726.png", target_width=16.8*cm)
    if img_m_main:
        story.append(img_m_main)
        story.append(Paragraph("<i>Figura 10: Menu Principal do Módulo Montagem (Cor Verde)</i>", img_caption))

    story.append(Paragraph("<b>5.1 DETALHAMENTO DE TODAS AS ABAS DO MÓDULO MONTAGEM:</b>", h2))
    story.append(Paragraph("• <b>Registro de Montagem:</b> Apontamento em tempo real das peças içadas, aprumadas e grauteadas na fundação.", bullet))
    story.append(Paragraph("• <b>Planejamento & Programação de Montagem:</b> Sequência construtiva de montagem (Cálices ➔ Pilares ➔ Vigas ➔ Lajes/Painéis). Pode ser importada via planilha (.xlsx) ou XML.", bullet))
    story.append(Paragraph("• <b>Diário de Obra:</b> Registro diário de condições climáticas (chuva, vento forte), horas de guindaste paradas, efetivo de montadores e ocorrências de canteiro.", bullet))
    story.append(Paragraph("• <b>Recusa de Peça em Campo:</b> Caso a peça tenha sofrido avaria no transporte, o encarregado registra o motivo no Plannix Mobile com foto, gerando chamado imediato para a fábrica.", bullet))

    img_m_reg = get_image_flowable("Captura de tela 2026-08-27 095432.png", target_width=16.8*cm)
    if img_m_reg:
        story.append(Spacer(1, 0.2*cm))
        story.append(img_m_reg)
        story.append(Paragraph("<i>Figura 11: Tela de Programação e Apontamento de Montagem em Campo</i>", img_caption))
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 6: MÓDULO QUALIDADE & ENSAIOS
    # ==========================================
    story.append(Paragraph("CAPÍTULO 6: MÓDULO QUALIDADE (Laboratório, CPs, Ruptura na Prensa e NBR 9062)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_gold, spaceAfter=5))

    img_q_main = get_image_flowable("Captura de tela 2026-08-27 083742.png", target_width=16.8*cm)
    if img_q_main:
        story.append(img_q_main)
        story.append(Paragraph("<i>Figura 12: Menu Principal do Módulo Qualidade (Cor Amarela/Ouro)</i>", img_caption))

    story.append(Paragraph("<b>6.1 DETALHAMENTO DE TODAS AS ABAS DO MÓDULO QUALIDADE:</b>", h2))
    story.append(Paragraph("• <b>Cadastro de Formulário & Cadastro de Inspetor:</b> Criação de fichas de inspeção e credenciamento dos técnicos de laboratório.", bullet))
    story.append(Paragraph("• <b>Checklist Fabricação, Acabamento e Montagem:</b> Inspeção de cobrimento de armadura, tolerância dimensional, alinhamento de insertos e ausência de fissuras/bicheiras.", bullet))
    story.append(Paragraph("• <b>Controle de Corpo de Prova (CP):</b> Cadastro dos CPs moldados na concretagem por número de lote e caminhão betoneira.", bullet))
    story.append(Paragraph("• <b>Análise de Corpo de Prova (Prensa Hidráulica):</b> Lançamento dos resultados de resistência rompidos aos 1-2 dias (desforma) e aos 28 dias ($F_{ck}$ característico).", bullet))
    story.append(Paragraph("• <b>Controle de Certificados & Gráficos Não Conforme:</b> Emissão do laudo técnico de qualidade final entregue ao cliente junto com a ART.", bullet))

    img_q_cp = get_image_flowable("Captura de tela 2026-08-27 095715.png", target_width=16.8*cm)
    if img_q_cp:
        story.append(Spacer(1, 0.2*cm))
        story.append(img_q_cp)
        story.append(Paragraph("<i>Figura 13: Tela de Controle de Ruptura de Corpos de Prova na Prensa</i>", img_caption))
    story.append(PageBreak())

    # ==========================================
    # CAPÍTULO 7: MANUAL EXAUSTIVO DE PARÂMETROS
    # ==========================================
    story.append(Paragraph("CAPÍTULO 7: MANUAL EXAUSTIVO DE PARÂMETROS DO SISTEMA (Base Oficial Plannix)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))
    
    story.append(Paragraph("Os parâmetros configuram o comportamento exato do software para a realidade operacional da fábrica:", body))

    param_data = [
        [Paragraph("<b>Cód.</b>", body), Paragraph("<b>Módulo</b>", body), Paragraph("<b>Nome do Parâmetro</b>", body), Paragraph("<b>Aplicação e Regra Prática</b>", body)],
        [Paragraph("<b>N1</b>", body), Paragraph("GERAL", body), Paragraph("Apontamento somente com QR Code", body), Paragraph("Obriga que registros no Plannix Mobile sejam feitos exclusivamente por leitura de QR Code, bloqueando digitação manual para evitar erros.", body)],
        [Paragraph("<b>N2</b>", body), Paragraph("GERAL", body), Paragraph("Apontar homem/hora dos processos", body), Paragraph("Habilita campos de quantidade de homens e horas gastas por subprocesso para cálculo do custo real de mão de obra.", body)],
        [Paragraph("<b>N3</b>", body), Paragraph("GERAL", body), Paragraph("Bloqueio de obra na etiqueta", body), Paragraph("Impede a impressão de etiquetas para obras com status financeiro ou contratual bloqueado.", body)],
        [Paragraph("<b>N4</b>", body), Paragraph("GERAL", body), Paragraph("Mudar peça de item no lançamento final", body), Paragraph("Permite alterar o agrupamento/item de uma peça já cadastrada.", body)],
        [Paragraph("<b>N6</b>", body), Paragraph("GERAL", body), Paragraph("Justificativa para reimpressão", body), Paragraph("Obriga o operador a digitar o motivo sempre que uma etiqueta for reimpressa (evita duplicação de peças físicas).", body)],
        [Paragraph("<b>N7</b>", body), Paragraph("GERAL", body), Paragraph("Trava de transferência por saldo", body), Paragraph("Impede transferir mais peças do que o saldo contratado no lançamento final da obra.", body)],
        [Paragraph("<b>P1</b>", body), Paragraph("PROJETO", body), Paragraph("Sugestão de volume por peça", body), Paragraph("Calcula e sugere automaticamente o volume ($b \\times h \\times L$) no cadastro da peça.", body)],
        [Paragraph("<b>P4</b>", body), Paragraph("PROJETO", body), Paragraph("Liberar edição após programar carga", body), Paragraph("Permite revisar projetos mesmo após inclusão em carga (recalcula pesos e dimensões automaticamente).", body)],
        [Paragraph("<b>P9</b>", body), Paragraph("PROJETO", body), Paragraph("Planilha de aço no registro de projeto", body), Paragraph("Abre popup para detalhar tipo de dobra, ganchos e estribos ao cadastrar posições de aço.", body)],
        [Paragraph("<b>F1</b>", body), Paragraph("FABRICAÇÃO", body), Paragraph("Processos obrigatórios por produto", body), Paragraph("Define quais etapas (Armação, Fôrma, Concretagem) são obrigatórias antes da desforma de cada tipologia.", body)],
        [Paragraph("<b>F3</b>", body), Paragraph("FABRICAÇÃO", body), Paragraph("Horário de início de turno", body), Paragraph("Padroniza o fechamento da produção diária para apontamentos no aplicativo mobile.", body)],
        [Paragraph("<b>L1</b>", body), Paragraph("LOGÍSTICA", body), Paragraph("Trava de Peso Máximo por Carga", body), Paragraph("Impede a emissão do romaneio de transporte se a carga ultrapassar o limite legal do caminhão.", body)],
        [Paragraph("<b>M1</b>", body), Paragraph("MONTAGEM", body), Paragraph("Sequenciamento obrigatório", body), Paragraph("Bloqueia o apontamento de vigas e lajes se os pilares de apoio ainda não estiverem montados e grauteados.", body)]
    ]

    t_param = Table(param_data, colWidths=[1.5*cm, 2.2*cm, 4.5*cm, 9.2*cm])
    t_param.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_param)
    story.append(Spacer(1, 0.8 * cm))

    story.append(Paragraph("<b>RÉGIS TAVARES ENGENHARIA CIVIL — ENGENHARIA OTIMIZADA</b><br/><font size=8 color='#64748B'>Enciclopédia Completa de Operação e Implantação Plannix ERP • Uso Técnico Interno</font>", ParagraphStyle('End', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, textColor=primary, alignment=TA_CENTER)))

    # Build
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Manual Exaustivo gerado com sucesso: {pdf_out}")

if __name__ == '__main__':
    build_exhaustive_manual()
