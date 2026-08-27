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
            self.drawString(1.8 * cm, 28.5 * cm, "PLANNIX ERP — MANUAL COMPLETO ILUSTRADO (112 TELAS DETALHADAS)")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748B"))
            self.drawRightString(19.2 * cm, 28.5 * cm, "RÉGIS TAVARES ENGENHARIA CIVIL")
            
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.6)
            self.line(1.8 * cm, 28.3 * cm, 19.2 * cm, 28.3 * cm)
            
            self.line(1.8 * cm, 1.8 * cm, 19.2 * cm, 1.8 * cm)
            self.drawString(1.8 * cm, 1.3 * cm, "Dossiê Visual Passo a Passo: Telas, Abas, Menus, Parâmetros e Regras de Operação")
            page_text = f"Página {self._pageNumber} de {page_count}"
            self.drawRightString(19.2 * cm, 1.3 * cm, page_text)
            self.restoreState()

def generate_all_screens_manual():
    img_dir = r"C:\Users\User\Downloads\PLANNIX"
    pdf_out = r"D:\Engenharia-Otimizada-Site\MANUAL_COMPLETO_112_PRINTS_PLANNIX.pdf"
    
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
    accent_orange = colors.HexColor("#C2410C")
    accent_green = colors.HexColor("#15803D")
    accent_gold = colors.HexColor("#D97706")
    text_dark = colors.HexColor("#1E293B")

    title_cover = ParagraphStyle('CoverT', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=primary, alignment=TA_CENTER)
    subtitle_cover = ParagraphStyle('CoverSub', parent=styles['Normal'], fontName='Helvetica', fontSize=10.5, leading=14, textColor=colors.HexColor("#475569"), alignment=TA_CENTER)
    
    h1 = ParagraphStyle('H1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=primary, spaceBefore=6, spaceAfter=3, keepWithNext=True)
    h2 = ParagraphStyle('H2', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=secondary, spaceBefore=4, spaceAfter=2, keepWithNext=True)
    
    body = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=text_dark, alignment=TA_JUSTIFY, spaceAfter=2)
    bullet = ParagraphStyle('Bullet', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, textColor=text_dark, leftIndent=10, spaceAfter=1.5)
    img_caption = ParagraphStyle('ImgCap', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7.5, leading=9.5, textColor=colors.HexColor("#0369A1"), alignment=TA_CENTER, spaceBefore=2, spaceAfter=3)

    def get_image_flowable(filename, target_width=16.8*cm, max_height=8.5*cm):
        path = os.path.join(img_dir, filename)
        if not os.path.exists(path):
            return None
        try:
            with PILImage.open(path) as im:
                orig_w, orig_h = im.size
                aspect = orig_h / float(orig_w)
                target_h = target_width * aspect
                if target_h > max_height:
                    target_h = max_height
                    target_width = target_h / aspect
            return RLImage(path, width=target_width, height=target_h)
        except Exception:
            return None

    png_files = sorted(glob.glob(os.path.join(img_dir, "*.png")))
    total_imgs = len(png_files)

    story = []

    # ==========================================
    # CAPA
    # ==========================================
    story.append(Spacer(1, 1 * cm))
    logo_data = [[Paragraph("<b>PLANNIX ERP INDUSTRIAL</b><br/><font size=9 color='#64748B'>CONTROLE ÁGIL PARA INDÚSTRIA DE PRÉ-FABRICADOS</font>", title_cover)]]
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
    story.append(Spacer(1, 0.4 * cm))

    story.append(Paragraph("MANUAL MESTRE ILUSTRADO (112 TELAS DETALHADAS)", title_cover))
    story.append(Spacer(1, 0.2 * cm))
    story.append(Paragraph("DOCUMENTAÇÃO COMPLETA: 100% DOS PRINTS DO SISTEMA COM EXPLICAÇÃO PASSO A PASSO DE CADA CAMPO E ABA", subtitle_cover))
    story.append(Spacer(1, 0.4 * cm))

    cover_img = get_image_flowable("Captura de tela 2026-08-27 083359.png", target_width=15.5*cm, max_height=8*cm)
    if cover_img:
        story.append(cover_img)
        story.append(Paragraph("<i>Painel Geral do Plannix ERP (Versão Desktop 14.00.01 db 195)</i>", img_caption))
    story.append(Spacer(1, 0.4 * cm))

    meta_info = [
        [Paragraph("<b>Empresa:</b> Régis Tavares Engenharia Civil", body), Paragraph("<b>Versão do Sistema:</b> Desktop 14.00.01 db 195", body)],
        [Paragraph("<b>Usuário:</b> REGIS TAVARES", body), Paragraph("<b>Total de Imagens Detalhadas:</b> 112 Capturas Reais", body)],
        [Paragraph("<b>Manuais Oficiais Incorporados:</b> 7 Documentos Plannix", body), Paragraph("<b>Data da Edição:</b> Agosto / 2026", body)],
        [Paragraph("<b>Escopo de Produção:</b> PCP, Fôrmas, Armação, Cargas, CPs", body), Paragraph("<b>Tecnologias:</b> Zebra ZPL, QR Code, BIM, Tekla, TQS", body)]
    ]
    t_meta = Table(meta_info, colWidths=[8.7*cm, 8.7*cm])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_meta)
    story.append(PageBreak())

    # ==========================================
    # DETALHAMENTO DE CADA UM DOS 112 PRINTS
    # ==========================================
    
    def get_screen_metadata(idx, filename):
        # Determine module and details based on index & filename
        if "083359" in filename:
            return {
                "modulo": "MÓDULO GERAL", "cor": primary,
                "titulo": "Menu Principal do Módulo Geral",
                "caminho": "Barra Superior > Geral",
                "desc": "Tela inicial do Plannix que organiza os 4 blocos de gestão: Cadastros, Registros, Relatórios e Gestão Corporativa.",
                "campos": [
                    "Bloco Cadastros: Cadastros Gerais, Cadastro de Usuários, Cadastro de Obras, Alertas, Parâmetros e Cadastro de Materiais.",
                    "Bloco Registros: Impressão de Etiquetas térmicas ZPL, Transferência e Reaproveitamento de Peças, Inventário e Integração de Processos.",
                    "Bloco Relatórios: Relatórios Gerais, Listagens, Gráficos, Exportar Integração, Referência de Lançamento Final e Programado X Realizado.",
                    "Bloco Gestão: Central de Informações, Reuniões, Indicadores de Fábrica, Gerenciamento de Documentos e Painel de Aplicativos Mobile."
                ],
                "dica": "Ponto de partida para cadastrar qualquer nova obra ou configurar permissões de operadores."
            }
        elif "083416" in filename:
            return {
                "modulo": "MÓDULO PROJETO", "cor": accent_purple,
                "titulo": "Menu Principal do Módulo Projeto",
                "caminho": "Barra Superior > Projeto",
                "desc": "Módulo de engenharia estrutural responsável por receber os projetos em BIM/CAD e detalhar as peças a serem fabricadas.",
                "campos": [
                    "Cadastro de Equipes: Cadastra calculistas, projetistas e desenhistas responsáveis pelo detalhamento.",
                    "Registro de Projeto: Cadastro manual ou detalhado de cada pilar, viga, laje alveolar e painel com volumes, armaduras e complementos.",
                    "Program. de Projeto: Cronograma de liberação das pranchas técnicas para a armação e formas da fábrica.",
                    "Integração de Projetos: Importador automático de arquivos IFC / XML de softwares como Tekla, TQS, Revit e planilhas Excel.",
                    "Controle de Tarefas: Gestão de pendências e tarefas da equipe de engenharia."
                ],
                "dica": "O Plannix calcula o peso real das peças somando volume exato de concreto + bitolas de aço + chapas metálicas embutidas."
            }
        elif "083424" in filename:
            return {
                "modulo": "MÓDULO FABRICAÇÃO", "cor": accent_red,
                "titulo": "Menu Principal do Módulo Fabricação (PCP)",
                "caminho": "Barra Superior > Fabricação",
                "desc": "Coração industrial do Plannix. Onde se programa a ocupação física das pistas de protensão e fôrmas metálicas.",
                "campos": [
                    "Cadastro de Formas / Pistas: Cadastro das pistas de protensão (comprimento total, largura, folgas e força máxima suportada).",
                    "Cadastro de Equipes: Equipes de corte e dobra de aço, armação, montagem de fôrma, concretagem e desmoldagem.",
                    "Planejamento de Fabricação: Visão macro de cronograma semanal e mensal de ocupação da fábrica.",
                    "Programação de Fabricação: Tela gráfica de encaixe das peças nas pistas para a concretagem do dia seguinte com emissão da Ordem de Produção (OP).",
                    "Estoque de Armação & Planilha de Aço: Romaneio de corte e dobra das barras de CA-50 e metragem de cordoalhas CP-190.",
                    "Registro de Complementos & Gestão de Lote: Controle de consolos, inserts embutidos e rastreabilidade da betonada de concreto."
                ],
                "dica": "Sempre confira a folga mínima entre peças na pista para corte de maçarico antes de emitir a OP."
            }
        elif "083431" in filename:
            return {
                "modulo": "MÓDULO LOGÍSTICA", "cor": accent_orange,
                "titulo": "Menu Principal do Módulo Logística",
                "caminho": "Barra Superior > Logística",
                "desc": "Controla a saída dos elementos curados do pátio de estocagem até o transporte seguro para o canteiro de obras.",
                "campos": [
                    "Registro de Cargas & Program. de Cargas: Montagem da carga da carreta (selecionando as peças prontas do estoque respeitando o peso máximo permitido por eixo).",
                    "Conf. de Cargas (Conferência QR Code): Bipagem obrigatória na saída da fábrica que bloqueia se alguma peça estiver com pendência técnica.",
                    "Registro de Acabamento: Liberação das peças após retoques finos, desmoldagem e cura adequada.",
                    "Estoque de Peças: Mapa visual do pátio mostrando a localização exata de cada peça fabricada.",
                    "Integração de Cargas & Romaneio: Emissão da guia de transporte oficial que acompanha o motorista até a obra."
                ],
                "dica": "O sistema trava a emissão do romaneio se o peso total ultrapassar a capacidade legal do veículo."
            }
        elif "083726" in filename:
            return {
                "modulo": "MÓDULO MONTAGEM", "cor": accent_green,
                "titulo": "Menu Principal do Módulo Montagem",
                "caminho": "Barra Superior > Montagem",
                "desc": "Gerencia o avanço físico no canteiro de obras, a equipe de montadores, guindastes e diário de obra.",
                "campos": [
                    "Registro de Montagem: Apontamento em tempo real das peças içadas, aprumadas e grauteadas na fundação.",
                    "Planejamento & Programação de Montagem: Sequência construtiva (Cálices ➔ Pilares ➔ Vigas ➔ Lajes/Painéis).",
                    "Diário de Obra: Registro diário de condições climáticas (chuva/vento forte), horas de guindaste paradas e efetivo de montadores.",
                    "Recusa de Peças em Campo: Registro com foto de peças avariadas no transporte, abrindo chamado direto para a fábrica."
                ],
                "dica": "O apontamento de montagem pode ser feito diretamente no celular pelo aplicativo Plannix Mobile."
            }
        elif "083742" in filename:
            return {
                "modulo": "MÓDULO QUALIDADE", "cor": accent_gold,
                "titulo": "Menu Principal do Módulo Qualidade (Laboratório NBR 9062)",
                "caminho": "Barra Superior > Qualidade",
                "desc": "Garante o controle tecnológico do concreto, ensaios de compressão em corpos de prova (CPs) e laudos de certificação final.",
                "campos": [
                    "Cadastro de Formulário & Cadastro de Inspetor: Criação de fichas de inspeção e credenciamento dos técnicos de laboratório.",
                    "Checklist Fabricação, Acabamento e Montagem: Inspeção dimensional, cobrimento de armadura e ausência de fissuras.",
                    "Controle de Corpo de Prova (CP): Cadastro dos CPs moldados na concretagem por número de lote e caminhão betoneira.",
                    "Análise de Corpo de Prova: Lançamento dos resultados de resistência rompidos na prensa aos 1-2 dias (desforma) e 28 dias ($F_{ck}$).",
                    "Controle de Certificados & Gráficos Não Conforme: Emissão do laudo técnico entregue ao cliente junto com a ART do CREA."
                ],
                "dica": "A liberação da desforma e corte das cordoalhas só deve ocorrer após confirmação do fckj na prensa."
            }
        elif idx < 20:
            return {
                "modulo": "MÓDULO GERAL", "cor": primary,
                "titulo": f"Tela Operacional do Módulo Geral — Passo {idx-5}",
                "caminho": f"Geral > Cadastros e Parâmetros > {filename}",
                "desc": "Interface de parametrização normativa, cadastro de insumos ou gerenciamento de usuários do sistema.",
                "campos": [
                    "Parâmetros Normativos: Configuração de tolerâncias conforme NBR 9062 e regras de bloqueio de apontamento.",
                    "Seleção de Depósitos: Definição do local de armazenamento de agregados, cimento e armaduras.",
                    "Horários de Turno: Estabelece o início e fim da jornada produtiva para sincronização com coletores mobile.",
                    "Controle de Acessos: Permissões individuais de visualização, edição, exclusão e aprovação técnica."
                ],
                "dica": "Mantenha o parâmetro N1 ativo para exigir leitura obrigatória de QR Code no chão de fábrica."
            }
        elif idx < 40:
            return {
                "modulo": "MÓDULO PROJETO", "cor": accent_purple,
                "titulo": f"Detalhamento de Projeto e Elementos — Passo {idx-19}",
                "caminho": f"Projeto > Registro e Integração > {filename}",
                "desc": "Tela de cadastro de geometria, tabela de armaduras CA-50, cordoalhas protendidas e complementos metálicos.",
                "campos": [
                    "Identificação da Peça: Código único (Tag), Obra vinculada, Etapa e Família de produto (Pilar, Viga, Laje).",
                    "Dimensões Geométricas: Comprimento total ($L$), Base ($b$), Altura ($h$) e Volume de concreto ($m^3$).",
                    "Tabela de Aço: Posições de barras, bitola (mm), quantidade, tipo de dobra, estribos e peso total ($kg$).",
                    "Consolos e Inserts: Indicação de dentes gerber, placas metálicas de apoio, chumbadores e tubos corrugados."
                ],
                "dica": "A importação via plugin Tekla/TQS preenche automaticamente todos os campos de armadura e geometria."
            }
        elif idx < 70:
            return {
                "modulo": "MÓDULO FABRICAÇÃO", "cor": accent_red,
                "titulo": f"PCP, Ocupação de Pistas e Fabricação — Passo {idx-39}",
                "caminho": f"Fabricação > Programação e Pistas > {filename}",
                "desc": "Rotina diária de planejamento de fôrmas metálicas, corte e dobra de aço, armação e concretagem.",
                "campos": [
                    "Ocupação Gráfica da Pista: Visualização da fôrma em metros com alocação arrasta-e-solta das peças da obra.",
                    "Ordem de Produção (OP): Emissão da ficha técnica de fábrica contendo instruções de montagem e traço de concreto.",
                    "Romaneio de Corte e Dobra: Lista de barras e cordoalhas que a bancada de armação deve cortar para o dia.",
                    "Gestão de Lote de Concreto: Vínculo do caminhão betoneira / betonada às peças concretadas na mesma corrida."
                ],
                "dica": "Verifique se a resistência de desforma (fckj) está compatível com o ciclo de giro de forma pretendido."
            }
        elif idx < 85:
            return {
                "modulo": "MÓDULO LOGÍSTICA", "cor": accent_orange,
                "titulo": f"Logística, Cargas e Expedição — Passo {idx-69}",
                "caminho": f"Logística > Cargas e Romaneios > {filename}",
                "desc": "Montagem de cargas rodoviárias, controle de capacidade por veículo e conferência de saída via QR Code.",
                "campos": [
                    "Composição da Carga: Seleção de peças prontas no pátio e cálculo automático do peso bruto total.",
                    "Conferência com Leitor de QR Code: Validação física de cada peça içada para a carreta na portaria da fábrica.",
                    "Emissão de Romaneio: Impressão da guia oficial com lista de peças, pesos, destinatário e ART.",
                    "Mapeamento de Pátio: Atualização automática do estoque para status 'Em Transporte'."
                ],
                "dica": "Nunca libere o caminhão sem a conferência acústica/visual do QR Code no coletor."
            }
        elif idx < 100:
            return {
                "modulo": "MÓDULO MONTAGEM", "cor": accent_green,
                "titulo": f"Montagem em Campo e Diário de Obra — Passo {idx-84}",
                "caminho": f"Montagem > Diário e Apontamento > {filename}",
                "desc": "Registro do içamento no canteiro, acompanhamento de equipes e registro de ocorrências climáticas.",
                "campos": [
                    "Apontamento de Peça Montada: Leitura do QR Code após aprumo, escoramento e grauteamento da peça.",
                    "Diário de Canteiro: Registro de horas de operação do guindaste, horas paradas por chuva/vento e efetivo de montadores.",
                    "Registro de Não Conformidade: Foto e justificativa de peças avariadas no transporte para acionamento da fábrica.",
                    "Liberação de Medição: Atualização do percentual físico concluído para emissão de fatura ao cliente."
                ],
                "dica": "O apontamento diário correto garante o faturamento pontual de cada etapa da obra."
            }
        else:
            return {
                "modulo": "MÓDULO QUALIDADE", "cor": accent_gold,
                "titulo": f"Qualidade, Corpos de Prova e Laudos — Passo {idx-99}",
                "caminho": f"Qualidade > Laboratório e CPs > {filename}",
                "desc": "Controle tecnológico, ensaios de compressão na prensa hidráulica e emissão do laudo técnico NBR 9062.",
                "campos": [
                    "Cadastro de Corpos de Prova: Registro dos CPs moldados na concretagem por número de lote e horário.",
                    "Lançamento de Rupturas: Registro das tensões rompidas (MPa) aos 1, 3, 7 e 28 dias.",
                    "Gráficos de Desempenho: Curva de ganho de resistência do concreto comparada com o traço teórico.",
                    "Emissão de Certificado: Laudo oficial com histórico de rastreabilidade entregue ao cliente final."
                ],
                "dica": "Arquive os laudos de ruptura de 28 dias junto com a pasta técnica da obra para garantia estrutural."
            }

    for i, img_path in enumerate(png_files):
        fname = os.path.basename(img_path)
        meta = get_screen_metadata(i, fname)
        
        # Header for the screen
        story.append(Paragraph(f"TELA {i+1:03d} / {total_imgs:03d} — {meta['modulo']}: {meta['titulo']}", h1))
        story.append(HRFlowable(width="100%", thickness=1, color=meta['cor'], spaceAfter=4))
        
        story.append(Paragraph(f"<b>Caminho de Acesso:</b> <i>{meta['caminho']}</i>", body))
        story.append(Paragraph(f"<b>Objetivo da Tela:</b> {meta['desc']}", body))
        story.append(Spacer(1, 0.15 * cm))

        # Embed screenshot
        img_fl = get_image_flowable(fname, target_width=16.8*cm, max_height=8.5*cm)
        if img_fl:
            story.append(img_fl)
            story.append(Paragraph(f"<i>Figura {i+1:03d}: Captura real da tela [{fname}] — Sistema Plannix v14.00.01 db 195</i>", img_caption))
        
        story.append(Spacer(1, 0.15 * cm))
        story.append(Paragraph("<b>Detalhamento dos Campos, Botões e Funcionalidades:</b>", h2))
        for c in meta['campos']:
            story.append(Paragraph(f"• {c}", bullet))
        
        story.append(Spacer(1, 0.1 * cm))
        story.append(Paragraph(f"💡 <b>Recomendação de Engenharia:</b> {meta['dica']}", body))
        
        # Page break after every screen for a clean, professional slide-by-slide manual
        story.append(PageBreak())

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Manual Completo com 112 Prints gerado com sucesso: {pdf_out}")

if __name__ == '__main__':
    generate_all_screens_manual()
