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
            self.drawString(1.8 * cm, 28.5 * cm, "PLANNIX ERP — MANUAL VISUAL ILUSTRADO PASSO A PASSO")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748B"))
            self.drawRightString(19.2 * cm, 28.5 * cm, "RÉGIS TAVARES ENGENHARIA CIVIL")
            
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.6)
            self.line(1.8 * cm, 28.3 * cm, 19.2 * cm, 28.3 * cm)
            
            self.line(1.8 * cm, 1.8 * cm, 19.2 * cm, 1.8 * cm)
            self.drawString(1.8 * cm, 1.3 * cm, "Guia Prático com Telas Oficiais • Base de Conhecimento e Parâmetros")
            page_text = f"Página {self._pageNumber} de {page_count}"
            self.drawRightString(19.2 * cm, 1.3 * cm, page_text)
            self.restoreState()

def create_visual_manual():
    img_dir = r"C:\Users\User\Downloads\PLANNIX"
    pdf_out = r"D:\Engenharia-Otimizada-Site\MANUAL_VISUAL_ILUSTRADO_PLANNIX.pdf"
    
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
    
    h1 = ParagraphStyle('H1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=13, leading=16, textColor=primary, spaceBefore=12, spaceAfter=4, keepWithNext=True)
    h2 = ParagraphStyle('H2', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=secondary, spaceBefore=8, spaceAfter=3, keepWithNext=True)
    
    body = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=text_dark, alignment=TA_JUSTIFY, spaceAfter=3)
    bullet = ParagraphStyle('Bullet', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=text_dark, leftIndent=12, spaceAfter=2)
    img_caption = ParagraphStyle('ImgCap', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.HexColor("#0369A1"), alignment=TA_CENTER, spaceBefore=3, spaceAfter=6)

    def get_image_flowable(filename, target_width=16.8*cm):
        path = os.path.join(img_dir, filename)
        if not os.path.exists(path):
            return None
        with PILImage.open(path) as im:
            orig_w, orig_h = im.size
            aspect = orig_h / float(orig_w)
            target_h = target_width * aspect
            # Limit height so it fits page nicely
            if target_h > 9.5 * cm:
                target_h = 9.5 * cm
                target_width = target_h / aspect
        return RLImage(path, width=target_width, height=target_h)

    story = []

    # ==========================================
    # CAPA ILUSTRADA
    # ==========================================
    story.append(Spacer(1, 1 * cm))
    logo_data = [[Paragraph("<b>PLANNIX ERP</b><br/><font size=9 color='#64748B'>CONTROLE ÁGIL PARA PRÉ-FABRICADOS DE CONCRETO</font>", title_cover)]]
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
    story.append(Spacer(1, 0.8 * cm))

    story.append(Paragraph("MANUAL VISUAL E OPERACIONAL PASSO A PASSO", title_cover))
    story.append(Spacer(1, 0.2 * cm))
    story.append(Paragraph("GUIA PRÁTICO COM AS TELAS REAIS DO SISTEMA • CADASTROS • PCP • LOGÍSTICA • MONTAGEM • QUALIDADE", subtitle_cover))
    story.append(Spacer(1, 0.6 * cm))

    cover_img = get_image_flowable("Captura de tela 2026-08-27 083359.png", target_width=15.5*cm)
    if cover_img:
        story.append(cover_img)
        story.append(Paragraph("<i>Figura 01: Painel Principal do Plannix Desktop (Versão 14.00.01 db 195)</i>", img_caption))
    story.append(Spacer(1, 0.6 * cm))

    meta_info = [
        [Paragraph("<b>Unidade:</b> Régis Tavares Engenharia Civil", body), Paragraph("<b>Versão do Sistema:</b> Plannix v14.00.01 db 195", body)],
        [Paragraph("<b>Usuário:</b> REGIS TAVARES", body), Paragraph("<b>Aplicação:</b> Indústria de Pré-Fabricados & Metálica", body)],
        [Paragraph("<b>Conteúdo:</b> 6 Módulos + Telas Passo a Passo", body), Paragraph("<b>Data da Edição:</b> Agosto / 2026", body)]
    ]
    t_meta = Table(meta_info, colWidths=[8.7*cm, 8.7*cm])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_meta)
    story.append(PageBreak())

    # ==========================================
    # SEÇÃO 1: MÓDULO GERAL (TELA & CADASTROS)
    # ==========================================
    story.append(Paragraph("SEÇÃO 1: MÓDULO GERAL (Cadastros Mestres, Obras e Materiais)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))
    
    story.append(Paragraph("O <b>Módulo Geral</b> é o ponto de entrada da fábrica no Plannix. Ele concentra os cadastros que alimentam todas as etapas produtivas.", body))
    
    img_geral = get_image_flowable("Captura de tela 2026-08-27 083359.png", target_width=16.8*cm)
    if img_geral:
        story.append(img_geral)
        story.append(Paragraph("<i>Figura 02: Menu Principal do Módulo Geral — Cadastros, Registros, Relatórios e Gestão</i>", img_caption))

    story.append(Paragraph("<b>1.1 Cadastros Fundamentais:</b>", h2))
    story.append(Paragraph("• <b>Cadastro de Obras:</b> Cadastro do contrato (Nome do Cliente, Endereço de entrega, Distância em km para frete, Engenheiro Responsável e ART).", bullet))
    story.append(Paragraph("• <b>Cadastro de Usuários:</b> Perfis de acesso para operadores desktop e apontadores mobile com QR Code.", bullet))
    story.append(Paragraph("• <b>Cadastro de Materiais:</b> Insumos básicos (Cimento CP-V ARI, Areia, Britas, Aditivos químicos, Aço CA-50 e Cordoalhas CP-190).", bullet))
    story.append(Paragraph("• <b>Parâmetros:</b> Tolerâncias normativas, casas decimais e travas de segurança.", bullet))
    
    # Sub-screen sample from sequence
    img_param = get_image_flowable("Captura de tela 2026-08-27 093626.png", target_width=16.8*cm)
    if img_param:
        story.append(Spacer(1, 0.2*cm))
        story.append(img_param)
        story.append(Paragraph("<i>Figura 03: Tela de Parâmetros Gerais e Configurações de Trabalho</i>", img_caption))
    
    story.append(Paragraph("<b>1.2 Impressão de Etiquetas & Rastreabilidade:</b>", h2))
    story.append(Paragraph("• A tela <b>Impressão de Etiquetas</b> gera a identificação física da peça com QR Code contendo: Obra, Código da Peça, Data de Concretagem, Volume ($m^3$), Peso ($kg$) e Traço ($F_{ck}$).", bullet))
    story.append(Paragraph("• Utilizar impressora térmica Zebra (GC420 / ZD220) com driver ZPL oficial e temperatura darkness $\\ge 15$.", bullet))
    story.append(PageBreak())

    # ==========================================
    # SEÇÃO 2: MÓDULO PROJETO (TELA & INTEGRAÇÃO BIM)
    # ==========================================
    story.append(Paragraph("SEÇÃO 2: MÓDULO PROJETO (Engenharia, Detalhamento e Integração BIM)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_purple, spaceAfter=6))

    story.append(Paragraph("O <b>Módulo Projeto</b> recebe os dados do cálculo estrutural (TQS, Tekla, Revit ou Excel) e cria a relação de peças a fabricar.", body))

    img_proj = get_image_flowable("Captura de tela 2026-08-27 083416.png", target_width=16.8*cm)
    if img_proj:
        story.append(img_proj)
        story.append(Paragraph("<i>Figura 04: Menu do Módulo Projeto — Registro, Programação e Integração de Projetos</i>", img_caption))

    story.append(Paragraph("<b>2.1 Os Dois Níveis de Lançamento de Projetos:</b>", h2))
    story.append(Paragraph("• <b>Nível 1 (Lançamento Final / Macro):</b> Importação via planilha Excel (.xlsx) contendo: Sigla Obra, Etapa, Produto, Seção, Nome da Peça, Quantidade, Volume ($m^3$) e Comprimento ($m$). Ideal para compras e planejamento inicial.", bullet))
    story.append(Paragraph("• <b>Nível 2 (Registro de Projeto / Detalhado):</b> Importação via Tekla/TQS/XML com geometria completa, tabela de corte/dobra de aço, consolos, inserts metálicos e chumbadores para emissão das OPs na fábrica.", bullet))

    img_proj_reg = get_image_flowable("Captura de tela 2026-08-27 093841.png", target_width=16.8*cm)
    if img_proj_reg:
        story.append(Spacer(1, 0.2*cm))
        story.append(img_proj_reg)
        story.append(Paragraph("<i>Figura 05: Tela de Registro e Detalhamento de Elementos de Projeto</i>", img_caption))

    story.append(Paragraph("<b>2.2 Peso Real Plannix vs. Peso de Projeto:</b>", h2))
    story.append(Paragraph("No software de cálculo usa-se $2500\\text{ kg/m}^3$ teórico. O Plannix calcula o <b>Peso Real</b> somando o volume real de concreto com a densidade cadastrada, as bitolas exatas de aço e os complementos metálicos embutidos.", body))
    story.append(PageBreak())

    # ==========================================
    # SEÇÃO 3: MÓDULO FABRICAÇÃO (PCP & PISTAS)
    # ==========================================
    story.append(Paragraph("SEÇÃO 3: MÓDULO FABRICAÇÃO (PCP, Fôrmas, Armação, Aço e Concretagem)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_red, spaceAfter=6))

    story.append(Paragraph("O <b>Módulo Fabricação</b> é onde a engenharia organiza a produção das pistas e fôrmas, emitindo as Ordens de Produção (OPs).", body))

    img_fab = get_image_flowable("Captura de tela 2026-08-27 083424.png", target_width=16.8*cm)
    if img_fab:
        story.append(img_fab)
        story.append(Paragraph("<i>Figura 06: Menu do Módulo Fabricação — PCP, Ocupação de Pistas, Planilha de Aço e Lotes</i>", img_caption))

    story.append(Paragraph("<b>3.1 Subprocessos Produtivos Obrigatórios:</b>", h2))
    story.append(Paragraph("1. <b>Corte e Dobra de Aço:</b> Emissão da Planilha de Aço e baixa automática no estoque de barras.", bullet))
    story.append(Paragraph("2. <b>Armação:</b> Montagem das gaiolas com espaçadores plásticos para garantir cobrimento normativo.", bullet))
    story.append(Paragraph("3. <b>Fôrma & Posicionamento:</b> Limpeza, desmoldante, insertos e colocação da armadura na pista.", bullet))
    story.append(Paragraph("4. <b>Concretagem:</b> Lançamento do concreto usinado e moldagem obrigatória dos Corpos de Prova (CPs).", bullet))
    story.append(Paragraph("5. <b>Cura e Desmoldagem:</b> Teste de desforma ($F_{ckj}$), corte de cordoalhas e içamento para o pátio.", bullet))
    story.append(Paragraph("6. <b>Pós-Produção & Acabamento:</b> Retoques, estamparia e colagem do QR Code na peça.", bullet))

    img_fab_prog = get_image_flowable("Captura de tela 2026-08-27 094527.png", target_width=16.8*cm)
    if img_fab_prog:
        story.append(Spacer(1, 0.2*cm))
        story.append(img_fab_prog)
        story.append(Paragraph("<i>Figura 07: Tela de Programação de Fabricação e Ocupação Gráfica das Pistas</i>", img_caption))
    story.append(PageBreak())

    # ==========================================
    # SEÇÃO 4: MÓDULO LOGÍSTICA & EXPEDIÇÃO
    # ==========================================
    story.append(Paragraph("SEÇÃO 4: MÓDULO LOGÍSTICA (Expedição, Cargas, Romaneios e Transporte)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_orange, spaceAfter=6))

    story.append(Paragraph("O <b>Módulo Logística</b> controla a saída dos elementos do pátio de estocagem até a entrega segura no canteiro de obras.", body))

    img_log = get_image_flowable("Captura de tela 2026-08-27 083431.png", target_width=16.8*cm)
    if img_log:
        story.append(img_log)
        story.append(Paragraph("<i>Figura 08: Menu do Módulo Logística — Programação de Cargas, Estoque e Conferência</i>", img_caption))

    story.append(Paragraph("<b>4.1 Fluxo de Expedição com Leitura de QR Code:</b>", h2))
    story.append(Paragraph("• <b>Montagem da Carga:</b> O encarregado seleciona o veículo (Prancha/Munck) e adiciona as peças disponíveis no pátio. O Plannix calcula o peso total em tempo real para não ultrapassar a capacidade máxima permitida por lei.", bullet))
    story.append(Paragraph("• <b>Conferência de Cargas (Conf. de Cargas):</b> Bipagem dos QR Codes na saída. O sistema bloqueia caso a peça pertença a outra obra ou não esteja liberada pela Qualidade.", bullet))
    story.append(Paragraph("• <b>Emissão de Romaneio:</b> Guia de transporte impressa que acompanha o motorista com o inventário completo da carga.", bullet))

    img_log_cargas = get_image_flowable("Captura de tela 2026-08-27 095136.png", target_width=16.8*cm)
    if img_log_cargas:
        story.append(Spacer(1, 0.2*cm))
        story.append(img_log_cargas)
        story.append(Paragraph("<i>Figura 09: Tela de Montagem e Conferência de Cargas para Transporte</i>", img_caption))
    story.append(PageBreak())

    # ==========================================
    # SEÇÃO 5: MÓDULO MONTAGEM (CANTEIRO)
    # ==========================================
    story.append(Paragraph("SEÇÃO 5: MÓDULO MONTAGEM (Canteiro de Obras e Diário de Campo)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_green, spaceAfter=6))

    story.append(Paragraph("Gerencia o trabalho dos montadores, operadores de guindaste e avanço da estrutura montada na obra.", body))

    img_mont = get_image_flowable("Captura de tela 2026-08-27 083726.png", target_width=16.8*cm)
    if img_mont:
        story.append(img_mont)
        story.append(Paragraph("<i>Figura 10: Menu do Módulo Montagem — Registro, Planejamento e Diário de Obra</i>", img_caption))

    story.append(Paragraph("<b>5.1 Rotina de Montagem e Diário de Obra:</b>", h2))
    story.append(Paragraph("• <b>Ordem Padrão de Montagem:</b> Cálices de Fundação ➔ Pilares ➔ Vigas Principais ➔ Vigas Secundárias ➔ Lajes/Painéis Alveolares.", bullet))
    story.append(Paragraph("• <b>Apontamento Mobile no Canteiro:</b> O montador bipa o QR Code da peça assim que ela é içada, aprumada e grauteada.", bullet))
    story.append(Paragraph("• <b>Diário de Obra:</b> Registro de condições climáticas (chuva/vento), horas de guindaste paradas e ocorrências de canteiro.", bullet))

    img_mont_reg = get_image_flowable("Captura de tela 2026-08-27 095432.png", target_width=16.8*cm)
    if img_mont_reg:
        story.append(Spacer(1, 0.2*cm))
        story.append(img_mont_reg)
        story.append(Paragraph("<i>Figura 11: Tela de Planejamento e Registro de Montagem em Campo</i>", img_caption))
    story.append(PageBreak())

    # ==========================================
    # SEÇÃO 6: MÓDULO QUALIDADE (LABORATÓRIO)
    # ==========================================
    story.append(Paragraph("SEÇÃO 6: MÓDULO QUALIDADE (Laboratório, CPs e Normas ABNT NBR 9062)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_gold, spaceAfter=6))

    story.append(Paragraph("Garante o controle tecnológico do concreto, laudos de resistência e certificação final entregue ao cliente.", body))

    img_qual = get_image_flowable("Captura de tela 2026-08-27 083742.png", target_width=16.8*cm)
    if img_qual:
        story.append(img_qual)
        story.append(Paragraph("<i>Figura 12: Menu do Módulo Qualidade — Controle de CPs, Checklists e Certificados</i>", img_caption))

    story.append(Paragraph("<b>6.1 Ensaios Tecnológicos e Ruptura na Prensa:</b>", h2))
    story.append(Paragraph("• <b>Controle de Corpo de Prova (CP):</b> Cadastro dos CPs moldados na concretagem por número de lote.", bullet))
    story.append(Paragraph("• <b>Lançamento de Rupturas:</b> Cadastro dos valores de $F_{ck}$ rompidos na prensa aos 1-2 dias (para desforma) e aos 28 dias.", bullet))
    story.append(Paragraph("• <b>Checklists e Certificado de Qualidade:</b> Inspeção dimensional e emissão do laudo técnico entregue com a ART.", bullet))

    img_qual_cp = get_image_flowable("Captura de tela 2026-08-27 095715.png", target_width=16.8*cm)
    if img_qual_cp:
        story.append(Spacer(1, 0.2*cm))
        story.append(img_qual_cp)
        story.append(Paragraph("<i>Figura 13: Tela de Controle de Corpos de Prova e Laudos de Rompimento</i>", img_caption))
    story.append(PageBreak())

    # ==========================================
    # SEÇÃO 7: RESUMO DO FLUXO COMPLETO
    # ==========================================
    story.append(Paragraph("SEÇÃO 7: RESUMO DO PASSO A PASSO OPERACIONAL DIÁRIO", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=8))

    passos_data = [
        [Paragraph("<b>Etapa</b>", body), Paragraph("<b>Módulo</b>", body), Paragraph("<b>O que fazer na tela do Plannix</b>", body)],
        [Paragraph("<b>1. Cadastro</b>", body), Paragraph("GERAL", body), Paragraph("Abrir <b>Cadastro de Obras</b> ➔ Clicar em <i>Novo</i> ➔ Preencher Cliente, Local da Obra, Contrato e Prazo.", body)],
        [Paragraph("<b>2. Projeto</b>", body), Paragraph("PROJETO", body), Paragraph("Abrir <b>Registro de Projeto</b> ➔ Lançar as peças (Pilares, Vigas, Lajes) com dimensões, $m^3$ e $kg$ de aço.", body)],
        [Paragraph("<b>3. Aço</b>", body), Paragraph("FABRICAÇÃO", body), Paragraph("Abrir <b>Planilha de Aço</b> ➔ Gerar a ordem de corte e dobra das barras e cordoalhas.", body)],
        [Paragraph("<b>4. Pistas</b>", body), Paragraph("FABRICAÇÃO", body), Paragraph("Abrir <b>Programação de Fabricação</b> ➔ Encaixar as peças na pista e emitir a <b>Ordem de Produção (OP)</b>.", body)],
        [Paragraph("<b>5. Concretagem</b>", body), Paragraph("QUALIDADE", body), Paragraph("Realizar a concretagem ➔ Moldar os CPs e cadastrar em <b>Controle de Corpo de Prova</b>.", body)],
        [Paragraph("<b>6. Desforma</b>", body), Paragraph("GERAL", body), Paragraph("Romper o CP de desforma ➔ Liberar a pista ➔ Imprimir a etiqueta com QR Code em <b>Impressão de Etiquetas</b>.", body)],
        [Paragraph("<b>7. Expedição</b>", body), Paragraph("LOGÍSTICA", body), Paragraph("Montar a carga em <b>Programação de Cargas</b> ➔ Bipar na saída em <b>Conf. de Cargas</b> ➔ Emitir Romaneio.", body)],
        [Paragraph("<b>8. Montagem</b>", body), Paragraph("MONTAGEM", body), Paragraph("Bipar a peça montada na obra em <b>Registro de Montagem</b> ➔ Preencher o <b>Diário de Obra</b>.", body)]
    ]

    t_passos = Table(passos_data, colWidths=[2.2*cm, 2.6*cm, 12.6*cm])
    t_passos.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_passos)
    story.append(Spacer(1, 0.8 * cm))

    story.append(Paragraph("<b>RÉGIS TAVARES ENGENHARIA CIVIL — ENGENHARIA OTIMIZADA</b><br/><font size=8 color='#64748B'>Manual Visual Ilustrado de Operação Industrial e Treinamento Plannix ERP</font>", ParagraphStyle('End', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, textColor=primary, alignment=TA_CENTER)))

    # Build
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Manual Visual Ilustrado gerado com sucesso: {pdf_out}")

if __name__ == '__main__':
    create_visual_manual()
