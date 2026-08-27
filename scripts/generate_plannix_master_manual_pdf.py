import os
import sys
import fitz
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm, mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
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
            self.drawString(1.8 * cm, 28.5 * cm, "PLANNIX ERP — MANUAL TÉCNICO OPERACIONAL E GUIA DE IMPLANTAÇÃO")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748B"))
            self.drawRightString(19.2 * cm, 28.5 * cm, "RÉGIS TAVARES ENGENHARIA CIVIL")
            
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.6)
            self.line(1.8 * cm, 28.3 * cm, 19.2 * cm, 28.3 * cm)
            
            self.line(1.8 * cm, 1.8 * cm, 19.2 * cm, 1.8 * cm)
            self.drawString(1.8 * cm, 1.3 * cm, "Base de Conhecimento, Parâmetros e Integração BIM / Tekla / TQS / Excel")
            page_text = f"Página {self._pageNumber} de {page_count}"
            self.drawRightString(19.2 * cm, 1.3 * cm, page_text)
            self.restoreState()

def build_pdf():
    pdf_out = "D:/Engenharia-Otimizada-Site/MANUAL_MESTRE_PLANNIX_RT_ENGENHARIA.pdf"
    doc = SimpleDocTemplate(
        pdf_out,
        pagesize=A4,
        leftMargin=1.8*cm,
        rightMargin=1.8*cm,
        topMargin=2.2*cm,
        bottomMargin=2.2*cm
    )

    styles = getSampleStyleSheet()
    
    primary = colors.HexColor("#0F2942")
    secondary = colors.HexColor("#0284C7")
    accent_red = colors.HexColor("#B91C1C")
    accent_purple = colors.HexColor("#7E22CE")
    accent_green = colors.HexColor("#15803D")
    accent_gold = colors.HexColor("#D97706")
    text_dark = colors.HexColor("#1E293B")
    bg_box = colors.HexColor("#F8FAFC")

    title_cover = ParagraphStyle('CoverT', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=primary, alignment=TA_CENTER)
    subtitle_cover = ParagraphStyle('CoverSub', parent=styles['Normal'], fontName='Helvetica', fontSize=11, leading=15, textColor=colors.HexColor("#475569"), alignment=TA_CENTER)
    
    h1 = ParagraphStyle('H1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=13, leading=16, textColor=primary, spaceBefore=12, spaceAfter=4, keepWithNext=True)
    h2 = ParagraphStyle('H2', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=secondary, spaceBefore=8, spaceAfter=3, keepWithNext=True)
    h3 = ParagraphStyle('H3', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=colors.HexColor("#334155"), spaceBefore=6, spaceAfter=2, keepWithNext=True)
    
    body = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=text_dark, alignment=TA_JUSTIFY, spaceAfter=4)
    body_bold = ParagraphStyle('BodyB', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=11.5, textColor=text_dark, spaceAfter=3)
    bullet = ParagraphStyle('Bullet', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=text_dark, leftIndent=12, spaceAfter=2)
    tip_box = ParagraphStyle('Tip', parent=styles['Normal'], fontName='Helvetica-Oblique', fontSize=8, leading=11, textColor=colors.HexColor("#0369A1"))

    story = []

    # ==========================================
    # CAPA
    # ==========================================
    story.append(Spacer(1, 1.5 * cm))
    logo_data = [[Paragraph("<b>PLANNIX ERP</b><br/><font size=9 color='#64748B'>CONTROLE ÁGIL PARA PRÉ-FABRICADOS DE CONCRETO</font>", title_cover)]]
    t_logo = Table(logo_data, colWidths=[17.4*cm])
    t_logo.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 14),
        ('BOTTOMPADDING', (0,0), (-1,-1), 14),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
    ]))
    story.append(t_logo)
    story.append(Spacer(1, 1 * cm))

    story.append(Paragraph("MANUAL MESTRE DE OPERAÇÃO E IMPLANTAÇÃO PASSO A PASSO", title_cover))
    story.append(Spacer(1, 0.3 * cm))
    story.append(Paragraph("GUIA DEFINITIVO DOS 6 MÓDULOS INDUSTRIAIS • INTEGRAÇÃO BIM / CAD • PARÂMETROS • RASTREABILIDADE", subtitle_cover))
    story.append(Spacer(1, 1 * cm))

    meta_info = [
        [Paragraph("<b>Unidade Fabril:</b> Régis Tavares Engenharia Civil", body), Paragraph("<b>Versão do Sistema:</b> Desktop 14.00.01 db 195", body)],
        [Paragraph("<b>Usuário:</b> REGIS TAVARES", body), Paragraph("<b>Módulos Cobertos:</b> Geral, Projeto, Fabricação, Logística, Montagem, Qualidade", body)],
        [Paragraph("<b>Bases Integradas:</b> 7 Manuais Oficiais + 112 Telas de Sistema", body), Paragraph("<b>Data da Edição:</b> Agosto / 2026", body)]
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
    story.append(Spacer(1, 1.2 * cm))

    resumo_caixa = [
        [Paragraph("<b>OBJETIVO DESTE MANUAL:</b><br/>Este documento consolida toda a base de conhecimento da Plannix, os manuais de parâmetros normativos e as rotinas diárias de PCP, corte e dobra, concretagem, controle tecnológico e expedição para garantir operação ágil, sem desperdícios e com rastreabilidade 100% digital via QR Code.", body)]
    ]
    t_box = Table(resumo_caixa, colWidths=[17.4*cm])
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
    # SEÇÃO 1: MÓDULO GERAL
    # ==========================================
    story.append(Paragraph("SEÇÃO 1: MÓDULO GERAL (Cadastros Mestres, Usuários, Obras e Materiais)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))
    
    story.append(Paragraph("O <b>Módulo Geral</b> é a espinha dorsal do Plannix. Ele gerencia as permissões, parâmetros globais da indústria, cadastro de contratos/obras, almoxarifado de insumos e comunicação com coletores mobile.", body))
    
    story.append(Paragraph("1.1 CADASTROS BÁSICOS E MATERIAIS", h2))
    story.append(Paragraph("• <b>Cadastro de Usuários:</b> Cada operador de fábrica, apontador de pátio, projetista e encarregado de montagem possui login próprio. O sistema permite travar telas por perfil (Ex: Operador mobile só bipa, não altera cadastro).", bullet))
    story.append(Paragraph("• <b>Cadastro de Obras:</b> Criação da obra com Sigla Oficial (ex: <i>OBR-01</i>), Cliente, Endereço de entrega, Distância da fábrica (km), Engenheiro responsável e Cronograma Contratual.", bullet))
    story.append(Paragraph("• <b>Cadastro de Materiais / Insumos:</b> Registro de todos os insumos de consumo: Cimento (CP-V ARI), Agregados (Areia média, Brita 0, Brita 1), Aditivos químicos (Plastificantes, Aceleradores de pega), Aço CA-50 (barras de 6.3 a 32mm) e Cordoalhas CP-190 RB.", bullet))
    story.append(Paragraph("• <b>Depósitos e Almoxarifado:</b> Controle de saldo por depósito físico (Pátio de Agregados, Galpão de Armação, Silos de Cimento).", bullet))

    story.append(Paragraph("1.2 IMPRESSÃO DE ETIQUETAS E RASTREABILIDADE (Zebra ZPL)", h2))
    story.append(Paragraph("• <b>Layout de Etiquetas:</b> O Plannix gera etiquetas contendo: Nome da Peça, Obra de Destino, Data de Concretagem, Volume ($m^3$), Peso ($kg$), Traço ($F_{ck}$) e o <b>QR Code / Código de Barras</b> único.", bullet))
    story.append(Paragraph("• <b>Configuração de Impressora Térmica (Zebra GC420 / ZD220):</b> Utilizar driver ZPL oficial, porta USB fixa (ex: USB001), definir tonalidade (darkness $\\ge 15$) e realizar calibração segurando o botão <i>Feed</i> ao ligar.", bullet))
    story.append(Paragraph("• <b>Regra Operacional:</b> A etiqueta deve ser impressa e colada na peça imediatamente após a desmoldagem e limpeza.", bullet))

    story.append(Paragraph("1.3 TRANSFERÊNCIA E REAPROVEITAMENTO DE PEÇAS", h2))
    story.append(Paragraph("Quando uma peça é rejeitada pelo cliente, sobra de uma obra ou produzida para estoque excedente, a tela <b>Transf. e Reapro.</b> permite remanejá-la para uma nova obra destino, recalculando automaticamente os custos e saldos do contrato.", body))
    story.append(Spacer(1, 0.4*cm))

    # ==========================================
    # SEÇÃO 2: MÓDULO PROJETO & INTEGRAÇÃO BIM
    # ==========================================
    story.append(Paragraph("SEÇÃO 2: MÓDULO PROJETO E INTEGRAÇÃO DE PROJETOS (BIM / CAD)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_purple, spaceAfter=6))

    story.append(Paragraph("O <b>Módulo Projeto</b> faz a ponte entre a Engenharia de Detalhamento e o chão de fábrica, permitindo o lançamento de peças em dois níveis estruturados.", body))

    story.append(Paragraph("2.1 OS DOIS NÍVEIS DE INTEGRAÇÃO DE PROJETOS", h2))
    
    niveis_data = [
        [Paragraph("<b>Nível de Integração</b>", body), Paragraph("<b>Origem / Formato</b>", body), Paragraph("<b>Campos Necessários</b>", body), Paragraph("<b>Finalidade no Sistema</b>", body)],
        [
            Paragraph("<b>Nível 1 (Lançamento Final)</b>", body),
            Paragraph("Planilha Excel (.xlsx) ou XML", body),
            Paragraph("Sigla Obra, Etapa, Produto, Grupo, Seção, Nome da Peça, Quantidade, Volume ($m^3$), Comprimento ($m$)", body),
            Paragraph("Cria a estrutura macro da obra no sistema, permitindo planejamento de faturamento e compras antes do detalhamento final do aço.", body)
        ],
        [
            Paragraph("<b>Nível 2 (Registro de Projeto)</b>", body),
            Paragraph("Tekla / TQS / Revit / XML Avançado", body),
            Paragraph("Geometria completa + Tabela de Aço (Bitolas, corte, dobra, estribos) + Complementos (Inserts, Consolos, Chumbadores)", body),
            Paragraph("Detalhamento milimétrico para fábrica: emite ordens de corte/dobra, peso real de armadura e plano de concretagem.", body)
        ]
    ]
    t_niveis = Table(niveis_data, colWidths=[3.5*cm, 3.2*cm, 5.2*cm, 5.5*cm])
    t_niveis.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#7E22CE")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_niveis)
    story.append(Spacer(1, 0.3*cm))

    story.append(Paragraph("2.2 DIFERENÇA DE PESO: PROJETO TEÓRICO VS. PESO PLANNIX", h2))
    story.append(Paragraph("<b>Atenção de Engenharia:</b> No software de cálculo estrutural, engenheiros costumam adotar o peso genérico de $2.500\\text{ kg/m}^3$ para o concreto armado. O Plannix calcula o <b>Peso Real</b>: (Volume real de concreto $\\times$ Densidade específica cadastrada) $+$ (Soma do peso exato das bitolas de aço cadastradas) $+$ (Peso dos complementos e chapas metálicas embutidas).", body))
    story.append(Spacer(1, 0.4*cm))

    # ==========================================
    # SEÇÃO 3: MÓDULO FABRICAÇÃO (PCP E PISTAS)
    # ==========================================
    story.append(Paragraph("SEÇÃO 3: MÓDULO FABRICAÇÃO (PCP, Fôrmas, Armação, Aço e Concretagem)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_red, spaceAfter=6))

    story.append(Paragraph("O <b>Módulo Fabricação</b> controla a rotina diária das pistas de protensão e fôrmas fixas. Ele organiza os subprocessos para garantir giro de forma rápido e produtividade máxima.", body))

    story.append(Paragraph("3.1 SUBPROCESSOS PRODUTIVOS OBRIGATÓRIOS", h2))
    story.append(Paragraph("1. <b>Corte e Dobra de Aço:</b> Emissão da Planilha de Aço com comprimento de corte, tipo de gancho e bitola. Baixa automática no estoque de barras.", bullet))
    story.append(Paragraph("2. <b>Armação:</b> Montagem da gaiola de armadura com espaçadores plásticos para garantir cobrimento normativo.", bullet))
    story.append(Paragraph("3. <b>Fôrma & Posicionamento:</b> Limpeza da fôrma, aplicação de desmoldante, posicionamento dos consolos/dentes e inserção da armadura.", bullet))
    story.append(Paragraph("4. <b>Concretagem:</b> Lançamento do concreto usinado, vibração adequada e moldagem obrigatória dos Corpos de Prova (CPs).", bullet))
    story.append(Paragraph("5. <b>Cura e Desmoldagem:</b> Liberação das peças após atingir a resistência de desforma ($F_{ckj}$), corte das cordoalhas e içamento para o pátio.", bullet))
    story.append(Paragraph("6. <b>Pós-Produção & Acabamento:</b> Retoques de estamparia, pintura de proteção em insertos metálicos e colagem da etiqueta com QR Code.", bullet))

    story.append(Paragraph("3.2 PROGRAMAÇÃO DE FABRICAÇÃO (Ocupação de Pistas)", h2))
    story.append(Paragraph("Na tela gráfica de <b>Programação de Fabricação</b>, o encarregado visualiza a pista em escala (ex: Pista Protendida 01 - 60 metros). Ele arrasta as peças pendentes da obra (ex: 3 Pilares de 18m = 54m de ocupação). O Plannix alerta se houver choque geométrico, falta de armação ou incompatibilidade de protensão.", body))
    story.append(Spacer(1, 0.4*cm))

    story.append(PageBreak())

    # ==========================================
    # SEÇÃO 4: MÓDULO LOGÍSTICA & TRANSPORTE
    # ==========================================
    story.append(Paragraph("SEÇÃO 4: MÓDULO LOGÍSTICA (Gestão de Pátio, Cargas e Transporte)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#C2410C"), spaceAfter=6))

    story.append(Paragraph("O <b>Módulo Logística</b> faz o elo entre a fábrica e a obra. Ele impede sobrecarga de carretas, evita erros de envio de peças e organiza a fila de descarregamento.", body))

    story.append(Paragraph("4.1 FLUXO DE PROGRAMAÇÃO E CONFERÊNCIA DE CARGAS", h2))
    story.append(Paragraph("• <b>Registro e Programação de Cargas:</b> Seleção do tipo de veículo (Carreta Prancha, Carreta Extensível, Caminhão Munck), motorista, transportadora e placa.", bullet))
    story.append(Paragraph("• <b>Montagem da Carga:</b> O encarregado de expedição seleciona as peças disponíveis no pátio. O Plannix soma o peso total em tempo real para não ultrapassar a capacidade da carreta.", bullet))
    story.append(Paragraph("• <b>Conferência de Cargas (Conf. de Cargas com QR Code):</b> O conferente bipa cada peça na hora do içamento para o caminhão. Se uma peça pertencer a outra obra ou não estiver liberada pela Qualidade, o sistema bloqueia o carregamento com aviso sonoro.", bullet))
    story.append(Paragraph("• <b>Emissão de Romaneio de Viagem:</b> Documento impresso obrigatório que acompanha o motorista com o inventário completo da carga.", bullet))
    story.append(Spacer(1, 0.4*cm))

    # ==========================================
    # SEÇÃO 5: MÓDULO MONTAGEM (CANTEIRO)
    # ==========================================
    story.append(Paragraph("SEÇÃO 5: MÓDULO MONTAGEM (Operação de Campo e Diário de Obra)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_green, spaceAfter=6))

    story.append(Paragraph("Controla a produtividade da equipe externa, o uso de guindastes telescópicos e o avanço da montagem física na obra.", body))

    story.append(Paragraph("5.1 SEQUÊNCIA CONSTRUTIVA E APONTAMENTO EM CAMPO", h2))
    story.append(Paragraph("• <b>Ordem Padrão de Montagem:</b> Cálices de Fundação ➔ Pilares ➔ Vigas Principais ➔ Vigas Secundárias ➔ Lajes/Painéis Alveolares.", bullet))
    story.append(Paragraph("• <b>Apontamento Mobile no Canteiro:</b> O encarregado de montagem bipa o QR Code da peça assim que ela é içada, aprumada e grauteada na fundação.", bullet))
    story.append(Paragraph("• <b>Recusa de Peça em Campo:</b> Caso a peça tenha sofrido avaria no transporte (trinca, quebra de dente), o encarregado registra o motivo no Plannix Mobile com foto, gerando chamado imediato para a fábrica.", bullet))
    story.append(Paragraph("• <b>Diário de Obra:</b> Registro diário de horas de guindaste contratadas vs. paradas por intempéries (chuva, vento forte) e efetivo de montadores.", bullet))
    story.append(Spacer(1, 0.4*cm))

    # ==========================================
    # SEÇÃO 6: MÓDULO QUALIDADE & ENSAIOS
    # ==========================================
    story.append(Paragraph("SEÇÃO 6: MÓDULO QUALIDADE (Laboratório, CPs e Normas ABNT)", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_gold, spaceAfter=6))

    story.append(Paragraph("Garante o cumprimento rigoroso da norma <b>ABNT NBR 9062</b> (Projeto e Execução de Estruturas Pré-Moldadas de Concreto).", body))

    story.append(Paragraph("6.1 CONTROLE TECNOLÓGICO DO CONCRETO (Corpos de Prova)", h2))
    story.append(Paragraph("• <b>Moldagem de CPs:</b> Cada caminhão betoneira / betonada tem seus CPs identificados por número de lote e data.", bullet))
    story.append(Paragraph("• <b>Lançamento de Rupturas:</b> Cadastro das tensões rompidas na prensa hidráulica ($F_{ck}$ de desforma aos 1-2 dias e $F_{ck}$ característico aos 28 dias).", bullet))
    story.append(Paragraph("• <b>Gráficos Não Conforme:</b> Alerta visual caso algum lote atinja resistência abaixo do limite de projeto.", bullet))
    story.append(Paragraph("• <b>Certificado de Qualidade Final:</b> Emissão do laudo consolidado de rastreabilidade entregue ao cliente junto com a ART do CREA.", bullet))
    story.append(Spacer(1, 0.4*cm))

    # ==========================================
    # SEÇÃO 7: GUIA DE PARÂMETROS NORMATIVOS
    # ==========================================
    story.append(Paragraph("SEÇÃO 7: GUIA RÁPIDO DE PARÂMETROS ESSENCIAIS DO SISTEMA", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))

    param_table_data = [
        [Paragraph("<b>Cód. Parâmetro</b>", body), Paragraph("<b>Módulo</b>", body), Paragraph("<b>Descrição Prática e Recomendação Operacional</b>", body)],
        [Paragraph("<b>N1</b>", body), Paragraph("GERAL", body), Paragraph("<b>Apontamento somente com QR Code:</b> Ativar para impedir que operadores digitem códigos errados manualmente no celular.", body)],
        [Paragraph("<b>N2</b>", body), Paragraph("GERAL", body), Paragraph("<b>Apontar homem/hora:</b> Habilita campo de horas trabalhadas por equipe para cálculo de produtividade e custo real de mão de obra.", body)],
        [Paragraph("<b>N3</b>", body), Paragraph("GERAL", body), Paragraph("<b>Bloqueio de obra na etiqueta:</b> Impede impressão de etiquetas de obras suspensas ou sem contrato assinado.", body)],
        [Paragraph("<b>F1 / F2</b>", body), Paragraph("FABRICAÇÃO", body), Paragraph("<b>Tolerância de Pista e Fôrma:</b> Define a folga mínima (em cm) entre peças na pista de protensão para corte do maçarico.", body)],
        [Paragraph("<b>L1 / L2</b>", body), Paragraph("LOGÍSTICA", body), Paragraph("<b>Trava de Peso Máximo por Carga:</b> Bloqueia emissão de romaneio se o peso total superar o limite legal da carreta.", body)],
        [Paragraph("<b>M1</b>", body), Paragraph("MONTAGEM", body), Paragraph("<b>Sequenciamento Obrigatório:</b> Exige que o pilar esteja grauteado antes de liberar o registro de montagem da viga correspondente.", body)]
    ]
    t_param = Table(param_table_data, colWidths=[2.5*cm, 2.5*cm, 12.4*cm])
    t_param.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_param)
    story.append(Spacer(1, 0.6*cm))

    # ==========================================
    # SEÇÃO 8: FLUXO PASSO A PASSO RESUMIDO
    # ==========================================
    story.append(Paragraph("SEÇÃO 8: RESUMO DO CICLO DE VIDA DE UMA PEÇA PRÉ-FABRICADA", h1))
    story.append(HRFlowable(width="100%", thickness=1, color=primary, spaceAfter=6))

    ciclo_box = [
        [Paragraph(
            "<b>FLUXO COMPLETO DE LANÇAMENTO E PRODUÇÃO NO PLANNIX:</b><br/><br/>"
            "<b>1. [GERAL]</b> Cadastrar a Obra e o Cliente em <i>Cadastro de Obras</i>.<br/>"
            "<b>2. [PROJETO]</b> Importar o arquivo BIM/Tekla/TQS ou lançar as peças em <i>Registro de Projeto</i>.<br/>"
            "<b>3. [FABRICAÇÃO - Aço]</b> Gerar a <i>Planilha de Aço</i> e encaminhar o romaneio para a bancada de corte e dobra.<br/>"
            "<b>4. [FABRICAÇÃO - Pistas]</b> Abrir <i>Programação de Fabricação</i>, encaixar as peças na pista e emitir a OP.<br/>"
            "<b>5. [FABRICAÇÃO - Concretagem]</b> Realizar a concretagem e colher os Corpos de Prova (CPs).<br/>"
            "<b>6. [QUALIDADE]</b> Lançar o lote em <i>Controle de Corpo de Prova</i> e testar a desforma na prensa.<br/>"
            "<b>7. [GERAL]</b> Desmoldar a peça e emitir a etiqueta com QR Code em <i>Impressão de Etiquetas</i>.<br/>"
            "<b>8. [LOGÍSTICA]</b> Montar a carga da carreta em <i>Programação de Cargas</i> e bipar em <i>Conf. de Cargas</i>.<br/>"
            "<b>9. [MONTAGEM]</b> Bipar a peça montada na obra em <i>Registro de Montagem</i> e preencher o <i>Diário de Obra</i>.",
            body
        )]
    ]
    t_ciclo = Table(ciclo_box, colWidths=[17.4*cm])
    t_ciclo.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F0FDF4")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#86EFAC")),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_ciclo)
    story.append(Spacer(1, 0.8*cm))

    story.append(Paragraph("<b>RÉGIS TAVARES ENGENHARIA CIVIL — ENGENHARIA OTIMIZADA</b><br/><font size=8 color='#64748B'>Documento Técnico e Operacional de Uso Interno e Treinamento Industrial</font>", ParagraphStyle('End', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, textColor=primary, alignment=TA_CENTER)))

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Master PDF gerado com sucesso: {pdf_out}")

if __name__ == '__main__':
    build_pdf()
