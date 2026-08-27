import sys
import os
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
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#475569"))
            
            # Header
            self.drawString(2 * cm, 28.3 * cm, "PLANNIX ERP — MANUAL OPERACIONAL DE PRÉ-FABRICADOS")
            self.drawRightString(19 * cm, 28.3 * cm, "RÉGIS TAVARES ENGENHARIA")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(2 * cm, 28.1 * cm, 19 * cm, 28.1 * cm)
            
            # Footer
            self.line(2 * cm, 1.8 * cm, 19 * cm, 1.8 * cm)
            self.drawString(2 * cm, 1.3 * cm, "Documento Técnico de Treinamento e Implantação")
            page_text = f"Página {self._pageNumber} de {page_count}"
            self.drawRightString(19 * cm, 1.3 * cm, page_text)
            self.restoreState()

def generate_manual_pdf(filename="MANUAL_COMPLETO_PLANNIX_RT_ENGENHARIA.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=2*cm,
        rightMargin=2*cm,
        topMargin=2.5*cm,
        bottomMargin=2.2*cm
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    primary_color = colors.HexColor("#0F2942")
    accent_blue = colors.HexColor("#0284C7")
    accent_gold = colors.HexColor("#D97706")
    text_dark = colors.HexColor("#1E293B")
    bg_light = colors.HexColor("#F8FAFC")

    title_cover = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=30,
        textColor=colors.HexColor("#0F2942"),
        alignment=TA_CENTER
    )

    subtitle_cover = ParagraphStyle(
        'CoverSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#475569"),
        alignment=TA_CENTER
    )

    h1_style = ParagraphStyle(
        'CustomH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=primary_color,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'CustomH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=accent_blue,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=text_dark,
        alignment=TA_JUSTIFY,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'CustomBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_dark,
        leftIndent=15,
        spaceAfter=3
    )

    code_box_style = ParagraphStyle(
        'CodeBox',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#0369A1"),
        spaceBefore=2,
        spaceAfter=4
    )

    story = []

    # ==========================================
    # CAPA
    # ==========================================
    story.append(Spacer(1, 2.5 * cm))
    
    # Plannix badge
    logo_table = Table(
        [[Paragraph("<b>PLANNIX</b><br/><font size=9 color='#64748B'>CONTROLE ÁGIL PARA PRÉ-FABRICADOS</font>", title_cover)]],
        colWidths=[17*cm]
    )
    logo_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F1F5F9")),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 16),
        ('BOTTOMPADDING', (0,0), (-1,-1), 16),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
    ]))
    story.append(logo_table)
    story.append(Spacer(1, 1.5 * cm))

    story.append(Paragraph("MANUAL COMPLETO DE OPERAÇÃO E LANÇAMENTO", title_cover))
    story.append(Spacer(1, 0.4 * cm))
    story.append(Paragraph("GUIA PRÁTICO PASSO A PASSO DOS 6 MÓDULOS DE GESTÃO INDUSTRIAL<br/>Geral • Projeto • Fabricação • Logística • Montagem • Qualidade", subtitle_cover))
    story.append(Spacer(1, 1.5 * cm))

    meta_table_data = [
        [Paragraph("<b>Empresa:</b> Régis Tavares Engenharia Civil", body_style), Paragraph("<b>Versão do Sistema:</b> 14.00.01 db 195", body_style)],
        [Paragraph("<b>Usuário Padrão:</b> REGIS TAVARES", body_style), Paragraph("<b>Aplicação:</b> Indústria de Pré-Fabricados & Metálica", body_style)],
        [Paragraph("<b>Data do Documento:</b> Agosto / 2026", body_style), Paragraph("<b>Foco:</b> PCP, Rastreabilidade e Lançamento de Obras", body_style)]
    ]
    meta_table = Table(meta_table_data, colWidths=[8.5*cm, 8.5*cm])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(meta_table)

    story.append(Spacer(1, 3 * cm))
    story.append(Paragraph("<i>Manual desenvolvido a partir do layout oficial e fluxo de treinamento da Universidade Plannix.</i>", subtitle_cover))
    story.append(PageBreak())

    # ==========================================
    # VISÃO GERAL DOS 6 MÓDULOS
    # ==========================================
    story.append(Paragraph("1. ESTRUTURA GERAL DO SISTEMA PLANNIX", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceAfter=8))
    
    story.append(Paragraph(
        "O sistema <b>Plannix (Controle Ágil para Pré-Fabricados)</b> é o ERP industrial padrão para fábricas de estruturas pré-moldadas e pré-fabricadas. Sua arquitetura é dividida em 6 módulos integrados na barra superior:",
        body_style
    ))

    modulos_resumo = [
        [Paragraph("<b>Módulo</b>", body_style), Paragraph("<b>Cor / Ícone</b>", body_style), Paragraph("<b>Objetivo Principal</b>", body_style)],
        [Paragraph("<b>1. GERAL</b>", body_style), Paragraph("Azul Escuro", body_style), Paragraph("Cadastros mestres (Obras, Usuários, Materiais), Etiquetas, Indicadores e Gestão.", body_style)],
        [Paragraph("<b>2. PROJETO</b>", body_style), Paragraph("Roxo", body_style), Paragraph("Entrada dos projetos de engenharia, integração BIM/CAD e detalhamento das peças.", body_style)],
        [Paragraph("<b>3. FABRICAÇÃO</b>", body_style), Paragraph("Bordô / Vermelho", body_style), Paragraph("Programação de pistas/fôrmas (PCP), corte e dobra de aço, armação e concretagem.", body_style)],
        [Paragraph("<b>4. LOGÍSTICA</b>", body_style), Paragraph("Laranja", body_style), Paragraph("Programação de cargas, romaneio de transporte, acabamento e estoque de expedição.", body_style)],
        [Paragraph("<b>5. MONTAGEM</b>", body_style), Paragraph("Verde", body_style), Paragraph("Planejamento de montagem em campo, equipes de guindaste e diário de obra.", body_style)],
        [Paragraph("<b>6. QUALIDADE</b>", body_style), Paragraph("Amarelo Ouro", body_style), Paragraph("Checklists, controle tecnológico do concreto, corpos de prova (CPs) e certificados.", body_style)]
    ]
    t_resumo = Table(modulos_resumo, colWidths=[3.2*cm, 2.5*cm, 11.3*cm])
    t_resumo.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0F2942")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F8FAFC")]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_resumo)
    story.append(Spacer(1, 0.5 * cm))

    # ==========================================
    # DETALHAMENTO MÓDULO POR MÓDULO
    # ==========================================
    
    # --- MÓDULO 1: GERAL ---
    story.append(Paragraph("2. MÓDULO GERAL (Cadastros Mestres e Gestão)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=accent_blue, spaceAfter=6))
    story.append(Paragraph("É o ponto de partida do sistema. Nele são definidos os parâmetros corporativos da fábrica e cadastrados os novos contratos de obras.", body_style))
    
    story.append(Paragraph("<b>A. Bloco Cadastros:</b>", h2_style))
    story.append(Paragraph("• <b>Cadastro de Obras:</b> Onde se cria a obra (Nome do cliente, localidade, datas contratuais, engenheiro responsável).", bullet_style))
    story.append(Paragraph("• <b>Cadastro de Usuários:</b> Controle de operadores, engenheiros, apontadores e níveis de acesso.", bullet_style))
    story.append(Paragraph("• <b>Cadastro de Materiais:</b> Insumos básicos (Cimento, Brita, Areia, Aditivos químicos, Aço CA-50, Cordoalhas CP-190).", bullet_style))
    story.append(Paragraph("• <b>Parâmetros:</b> Configurações de horários de turno, tolerâncias normativas NBR 9062 e casas decimais.", bullet_style))
    story.append(Paragraph("• <b>Alertas:</b> Notificações automáticas de atraso de produção, ruptura de CPs ou pendências de projeto.", bullet_style))

    story.append(Paragraph("<b>B. Bloco Registros:</b>", h2_style))
    story.append(Paragraph("• <b>Impressão de Etiquetas:</b> Emissão de tags com código de barras / QR Code para identificação física e rastreabilidade nas peças.", bullet_style))
    story.append(Paragraph("• <b>Transf. e Reapro. (Transferência e Reaproveitamento):</b> Remanejamento de peças entre obras ou estoque excedente.", bullet_style))
    story.append(Paragraph("• <b>Inventário:</b> Contagem e balanço físico do pátio de estocagem de pré-moldados.", bullet_style))

    story.append(Paragraph("<b>C. Bloco Gestão & Relatórios:</b>", h2_style))
    story.append(Paragraph("• <b>Programado X Realizado:</b> Comparativo em tempo real do avanço físico e financeiro da fábrica.", bullet_style))
    story.append(Paragraph("• <b>Indicadores & Painel de Aplicativos:</b> Dashboard executivo de produtividade ($m^3/dia$, $ton/dia$) e conexão com Plannix Mobile.", bullet_style))
    story.append(Spacer(1, 0.4 * cm))

    # --- MÓDULO 2: PROJETO ---
    story.append(Paragraph("3. MÓDULO PROJETO (Engenharia e Detalhamento)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#7E22CE"), spaceAfter=6))
    story.append(Paragraph("Módulo responsável por receber as peças do projeto estrutural (TQS, Tekla ou Lançamento Manual) e gerar a lista mestra de elementos.", body_style))

    story.append(Paragraph("<b>A. Funções Chave:</b>", h2_style))
    story.append(Paragraph("• <b>Registro de Projeto:</b> Cadastro individual ou em lote de todas as peças (Pilares P1..Pn, Vigas V1..Vn, Lajes L1..Ln, Placas, Cálices).", bullet_style))
    story.append(Paragraph("• <b>Programação de Projeto:</b> Cronograma de liberação das pranchas e desenhos de armação para a fábrica.", bullet_style))
    story.append(Paragraph("• <b>Integração de Projetos:</b> Importador automático de arquivos IFC / XML de softwares de cálculo estrutural.", bullet_style))
    story.append(Paragraph("• <b>Controle de Tarefas:</b> Distribuição de atividades entre desenhistas, calculistas e conferentes de projeto.", bullet_style))
    story.append(Spacer(1, 0.4 * cm))

    # --- MÓDULO 3: FABRICAÇÃO ---
    story.append(Paragraph("4. MÓDULO FABRICAÇÃO (PCP, Fôrmas, Armação e Concretagem)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#B91C1C"), spaceAfter=6))
    story.append(Paragraph("O coração industrial da fábrica. Onde se programa a ocupação das pistas de protensão e fôrmas metálicas.", body_style))

    story.append(Paragraph("<b>A. Bloco Cadastros:</b>", h2_style))
    story.append(Paragraph("• <b>Cadastro de Formas / Pistas:</b> Dimensões das pistas (ex: Pista Protendida 01 - 60m), tipos de perfil (I, T, Calha, Retangular).", bullet_style))
    story.append(Paragraph("• <b>Cadastro de Equipes:</b> Equipes de armação, montagem de fôrma, concretagem e desmoldagem.", bullet_style))

    story.append(Paragraph("<b>B. Bloco Registros (Fluxo Diário do PCP):</b>", h2_style))
    story.append(Paragraph("• <b>Planejamento de Fabricação:</b> Visão macro semanal/mensal de ocupação da fábrica.", bullet_style))
    story.append(Paragraph("• <b>Programação de Fabricação (Ocupação de Pistas):</b> Encaixe das peças dentro do comprimento das fôrmas para a concretagem do dia seguinte.", bullet_style))
    story.append(Paragraph("• <b>Estoque de Armação:</b> Controle das armaduras prontas aguardando posicionamento na fôrma.", bullet_style))
    story.append(Paragraph("• <b>Planilha de Aço:</b> Romaneio com pesos e comprimentos de corte e dobra das barras de aço CA-50 e cordoalhas.", bullet_style))
    story.append(Paragraph("• <b>Gestão de Lote:</b> Agrupamento das peças produzidas na mesma corrida/concretagem para rastreabilidade de resistência.", bullet_style))
    story.append(Paragraph("• <b>Registro de Complementos:</b> Controle de consolos, inserts metálicos, chumbadores e placas embutidas.", bullet_style))
    story.append(Spacer(1, 0.4 * cm))

    story.append(PageBreak())

    # --- MÓDULO 4: LOGÍSTICA ---
    story.append(Paragraph("5. MÓDULO LOGÍSTICA (Expedição, Transporte e Cargas)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#C2410C"), spaceAfter=6))
    story.append(Paragraph("Controla a saída dos elementos curados do pátio até a chegada segura no canteiro de obras.", body_style))

    story.append(Paragraph("<b>A. Principais Recursos:</b>", h2_style))
    story.append(Paragraph("• <b>Registro de Cargas & Programação de Cargas:</b> Montagem da carga da carreta (selecionando as peças prontas do estoque respeitando o peso máximo permitido por eixo/veículo).", bullet_style))
    story.append(Paragraph("• <b>Conferência de Cargas (Conf. de Cargas):</b> Bipagem dos QR Codes na saída da fábrica para garantir que nenhuma peça vá errada para a obra.", bullet_style))
    story.append(Paragraph("• <b>Registro de Acabamento:</b> Liberação das peças após retoques finos, desmoldagem e cura adequada.", bullet_style))
    story.append(Paragraph("• <b>Estoque de Peças:</b> Mapa visual do pátio mostrando onde cada peça fabricada está estocada.", bullet_style))
    story.append(Spacer(1, 0.4 * cm))

    # --- MÓDULO 5: MONTAGEM ---
    story.append(Paragraph("6. MÓDULO MONTAGEM (Operação no Canteiro de Obras)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#15803D"), spaceAfter=6))
    story.append(Paragraph("Gerencia o trabalho das equipes de montadores, operadores de guindaste/munck e avanço da estrutura.", body_style))

    story.append(Paragraph("<b>A. Principais Recursos:</b>", h2_style))
    story.append(Paragraph("• <b>Planejamento & Programação de Montagem:</b> Sequência lógica de montagem (Cálices ➔ Pilares ➔ Vigas ➔ Lajes/Painéis).", bullet_style))
    story.append(Paragraph("• <b>Registro de Montagem:</b> Apontamento em tempo real das peças que foram içadas e fixadas com grauteamento.", bullet_style))
    story.append(Paragraph("• <b>Diário de Obra:</b> Registro de condições climáticas (chuva/vento), horas de guindaste paradas e ocorrências de canteiro.", bullet_style))
    story.append(Spacer(1, 0.4 * cm))

    # --- MÓDULO 6: QUALIDADE ---
    story.append(Paragraph("7. MÓDULO QUALIDADE (Laboratório, Normas e Ensaios)", h1_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#A16207"), spaceAfter=6))
    story.append(Paragraph("Garante o cumprimento das normas ABNT NBR 9062 (Projeto e Execução de Estruturas Pré-Moldadas de Concreto) e NBR 6118.", body_style))

    story.append(Paragraph("<b>A. Principais Recursos:</b>", h2_style))
    story.append(Paragraph("• <b>Controle de Corpo de Prova (CP):</b> Cadastro dos CPs moldados em cada betonada/caminhão betoneira.", bullet_style))
    story.append(Paragraph("• <b>Análise de Corpo de Prova:</b> Lançamento dos resultados da prensa hidráulica (resistência $F_{ck}$ obtida com 1 dia, 7 dias e 28 dias).", bullet_style))
    story.append(Paragraph("• <b>Checklists de Fabricação, Acabamento e Montagem:</b> Inspeção dimensional, cobrimento de armadura, fissuração e aspecto visual.", bullet_style))
    story.append(Paragraph("• <b>Controle de Certificados & Gráficos Não Conforme:</b> Emissão do laudo de qualidade final entregue ao cliente junto com a ART.", bullet_style))
    story.append(Spacer(1, 0.6 * cm))

    # ==========================================
    # ROTEIRO PASSO A PASSO PRÁTICO
    # ==========================================
    story.append(Paragraph("8. ROTEIRO PASSO A PASSO: DO CONTRATO À MONTAGEM", h1_style))
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceAfter=8))

    passos_data = [
        [Paragraph("<b>Passo</b>", body_style), Paragraph("<b>Módulo</b>", body_style), Paragraph("<b>Ação Operacional a Realizar</b>", body_style)],
        [
            Paragraph("<b>Passo 1</b>", body_style),
            Paragraph("GERAL", body_style),
            Paragraph("Acessar <b>Cadastro de Obras</b> ➔ Clicar em <b>Novo</b> ➔ Preencher Nome do Cliente, Local da Obra, Contrato e Datas de Entrega.", body_style)
        ],
        [
            Paragraph("<b>Passo 2</b>", body_style),
            Paragraph("PROJETO", body_style),
            Paragraph("Acessar <b>Registro de Projeto</b> ➔ Lançar as peças (Pilares, Vigas, Lajes) com dimensões ($b \\times h \\times L$), volume de concreto ($m^3$) e peso de aço ($kg$).", body_style)
        ],
        [
            Paragraph("<b>Passo 3</b>", body_style),
            Paragraph("FABRICAÇÃO", body_style),
            Paragraph("Acessar <b>Programação de Fabricação</b> ➔ Selecionar a Fôrma/Pista do dia ➔ Alocar as peças no comprimento da pista ➔ Gerar a <b>Ordem de Produção (OP)</b> e Romaneio de Aço.", body_style)
        ],
        [
            Paragraph("<b>Passo 4</b>", body_style),
            Paragraph("QUALIDADE", body_style),
            Paragraph("Na concretagem, moldar os Corpos de Prova (CPs) ➔ Lançar o lote em <b>Controle de Corpo de Prova</b> ➔ Romper na prensa com 1 e 28 dias.", body_style)
        ],
        [
            Paragraph("<b>Passo 5</b>", body_style),
            Paragraph("LOGÍSTICA", body_style),
            Paragraph("Com as peças curadas no estoque, acessar <b>Programação de Cargas</b> ➔ Montar a carga do caminhão ➔ Bipar QR Code em <b>Conf. de Cargas</b> ➔ Emitir Romaneio de Saída.", body_style)
        ],
        [
            Paragraph("<b>Passo 6</b>", body_style),
            Paragraph("MONTAGEM", body_style),
            Paragraph("No canteiro de obras, a equipe registra as peças montadas em <b>Registro de Montagem</b> e preenche o <b>Diário de Obra</b> para liberação da medição.", body_style)
        ]
    ]

    t_passos = Table(passos_data, colWidths=[2.2*cm, 2.8*cm, 12*cm])
    t_passos.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0F2942")),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, colors.HexColor("#F1F5F9")]),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_passos)
    story.append(Spacer(1, 1 * cm))

    # Conclusão e Assinatura
    story.append(Paragraph("<b>Régis Tavares Engenharia Civil — Excelência em Engenharia Otimizada e Pré-Fabricados</b>", ParagraphStyle('Final', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, textColor=primary_color, alignment=TA_CENTER)))

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF gerado com sucesso: {filename}")

if __name__ == '__main__':
    generate_manual_pdf("D:/Engenharia-Otimizada-Site/MANUAL_COMPLETO_PLANNIX_RT_ENGENHARIA.pdf")
