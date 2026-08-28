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
            self.setFillColor(colors.HexColor("#C0392B"))
            self.drawString(1.8 * cm, 28.5 * cm, "CYPECAD 2027 — GUIA VISUAL DETALHADO POR TROCA DE TELA (15 AULAS)")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748B"))
            self.drawRightString(19.2 * cm, 28.5 * cm, "RÉGIS TAVARES ENGENHARIA CIVIL")
            
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.6)
            self.line(1.8 * cm, 28.3 * cm, 19.2 * cm, 28.3 * cm)
            
            self.line(1.8 * cm, 1.8 * cm, 19.2 * cm, 1.8 * cm)
            self.drawString(1.8 * cm, 1.3 * cm, "Mapeamento Completo de Telas, Menus e Cliques • NBR 6118 & NBR 9062")
            page_text = f"Página {self._pageNumber} de {page_count}"
            self.drawRightString(19.2 * cm, 1.3 * cm, page_text)
            self.restoreState()

def build_ultra_detailed_manual():
    img_dir = r"D:\Engenharia-Otimizada-Site\cypecad_images"
    pdf_out = r"D:\Engenharia-Otimizada-Site\MANUAL_CURSO_CYPECAD_2027_PASSO_A_PASSO.pdf"
    
    doc = SimpleDocTemplate(
        pdf_out,
        pagesize=A4,
        leftMargin=1.8*cm,
        rightMargin=1.8*cm,
        topMargin=2.2*cm,
        bottomMargin=2.2*cm
    )

    styles = getSampleStyleSheet()
    
    cype_red = colors.HexColor("#C0392B")
    primary = colors.HexColor("#0F2942")
    secondary = colors.HexColor("#0284C7")
    accent_green = colors.HexColor("#15803D")
    text_dark = colors.HexColor("#1E293B")

    title_cover = ParagraphStyle('CoverT', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=22, leading=26, textColor=cype_red, alignment=TA_CENTER)
    subtitle_cover = ParagraphStyle('CoverSub', parent=styles['Normal'], fontName='Helvetica', fontSize=10.5, leading=14, textColor=colors.HexColor("#475569"), alignment=TA_CENTER)
    
    h1 = ParagraphStyle('H1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=11.5, leading=14, textColor=primary, spaceBefore=6, spaceAfter=2, keepWithNext=True)
    h2 = ParagraphStyle('H2', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=secondary, spaceBefore=4, spaceAfter=2, keepWithNext=True)
    
    body = ParagraphStyle('Body', parent=styles['Normal'], fontName='Helvetica', fontSize=7.5, leading=10.5, textColor=text_dark, alignment=TA_JUSTIFY, spaceAfter=2)
    bullet = ParagraphStyle('Bullet', parent=styles['Normal'], fontName='Helvetica', fontSize=7.5, leading=10.5, textColor=text_dark, leftIndent=8, spaceAfter=1)
    img_caption = ParagraphStyle('ImgCap', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7, leading=9, textColor=colors.HexColor("#0369A1"), alignment=TA_CENTER, spaceBefore=2, spaceAfter=2)

    def get_image_flowable(filename, target_width=16.8*cm, max_height=8.0*cm):
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

    story = []

    # ==========================================
    # CAPA
    # ==========================================
    story.append(Spacer(1, 0.8 * cm))
    badge_data = [[Paragraph("<b>CYPECAD 2027 — MANUAL TÉCNICO DEFINITIVO</b><br/><font size=9 color='#64748B'>GUIA VISUAL PASSO A PASSO POR TROCA DE TELA (15 AULAS COMPLETAS)</font>", title_cover)]]
    t_badge = Table(badge_data, colWidths=[17.4*cm])
    t_badge.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FDF2F2")),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('BOX', (0,0), (-1,-1), 1.5, cype_red),
    ]))
    story.append(t_badge)
    story.append(Spacer(1, 0.3 * cm))

    story.append(Paragraph("MAPEAMENTO MINUCIOSO DE TELAS, BOTÕES, MENUS E VALORES", title_cover))
    story.append(Spacer(1, 0.2 * cm))
    story.append(Paragraph("ACOMPANHAMENTO DETALHADO DO CURSO DE CÁLCULO ESTRUTURAL • NBR 6118:2023 & NBR 9062:2017 • DA CONCEPÇÃO À EMISSÃO DE PRANCHAS DWG", subtitle_cover))
    story.append(Spacer(1, 0.3 * cm))

    cover_img = get_image_flowable("aula_01_CCLAeV-thcg.jpg", target_width=15.5*cm, max_height=7.5*cm)
    if cover_img:
        story.append(cover_img)
        story.append(Paragraph("<i>Interface Geral do CYPECAD 2027 com as Abas de Trabalho e Menus Superiores</i>", img_caption))
    story.append(Spacer(1, 0.3 * cm))

    meta_info = [
        [Paragraph("<b>Engenharia:</b> Régis Tavares Engenharia Civil", body), Paragraph("<b>Software:</b> CYPECAD 2027 (CYPE)", body)],
        [Paragraph("<b>Base Didática:</b> 15 Aulas Oficiais do Professor no YouTube", body), Paragraph("<b>Normas:</b> NBR 6118, NBR 9062, NBR 6120, NBR 6123", body)],
        [Paragraph("<b>Estrutura:</b> Pilares, Consolos, Vigas, Lajes Alveolares, Cálices", body), Paragraph("<b>Data:</b> Agosto / 2026", body)]
    ]
    t_meta = Table(meta_info, colWidths=[8.7*cm, 8.7*cm])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
    ]))
    story.append(t_meta)
    story.append(PageBreak())

    # ==========================================
    # AS 15 AULAS COM CADA TROCA DE TELA E CLIQUE
    # ==========================================
    detailed_aulas = [
        {
            "num": "01",
            "img": "aula_01_CCLAeV-thcg.jpg",
            "titulo": "AULA 01 — Criação da Obra, Interface de Trabalho e Parametrização das Normas ABNT",
            "caminho": "Menu Superior > Arquivo > Novo > Obra Vazia ➔ Janela 'Dados Gerais'",
            "telas": [
                ("Tela 1: Criação do Arquivo da Obra", [
                    "Clique no menu superior 'Arquivo' > selecione 'Novo'.",
                    "No campo 'Nome do arquivo', digite o identificador da obra (ex: EDIFICIO_PREFAB_RBR).",
                    "Selecione a opção 'Obra Vazia' (permite parametrizar 100% dos dados sem modelos pré-fabricados genéricos).",
                    "Clique no botão 'Aceitar' no canto inferior direito."
                ]),
                ("Tela 2: Configuração de Normas e Materiais (Janela 'Dados Gerais')", [
                    "No campo 'Norma de Concreto', clique na lista suspensa e selecione: 'ABNT NBR 6118:2023 / NBR 9062:2017'.",
                    "No bloco 'Concreto': selecione a classe C35, C40 ou C50 para elementos pré-moldados (alta resistência para desforma rápida).",
                    "No bloco 'Aço em Barras': selecione CA-50 para armadura longitudinal principal e CA-60 para estribos.",
                    "No bloco 'Aço Ativo (Protensão)': selecione CP-190 RB (cordoalhas de relaxação baixa para lajes alveolares e vigas protendidas).",
                    "No campo 'Classe de Agressividade Ambiental (CAA)': selecione Classe II (Urbana, cobrimento nominal c_nom = 30mm) ou Classe III (Industrial, c_nom = 35 a 40mm).",
                    "Em 'Tamanho Máximo do Agregado': selecione Brita 1 (diâmetro máximo d_max = 19mm).",
                    "Clique no botão 'Aceitar' para salvar os dados gerais."
                ])
            ],
            "dica": "O professor ressalta: Nunca modifique a norma após ter lançado a estrutura, pois isso reseta tabelas de armaduras e obriga a reconfigurar todos os critérios de cálculo."
        },
        {
            "num": "02",
            "img": "aula_02_GMak511QjfQ.jpg",
            "titulo": "AULA 02 — Estruturação dos Pavimentos, Alturas de Pé-Direito e Cargas Iniciais",
            "caminho": "Menu Superior > Introdução > Pavimentos > Novos Pavimentos",
            "telas": [
                ("Tela 1: Janela de Introdução de Pavimentos", [
                    "Clique no menu 'Introdução' > 'Pavimentos' > 'Novos Pavimentos'.",
                    "Escolha a opção 'Soltos' para permitir que cada nível tenha altura e cargas personalizadas.",
                    "No campo 'Número de pavimentos a introduzir', digite: 3 (ou 4 para edificações com cobertura).",
                    "Clique em 'Aceitar'."
                ]),
                ("Tela 2: Tabela de Alturas e Cargas por Nível", [
                    "Linha 01 (Fundação / Cálice): Cota Z = 0.00 m | Cargas g = 0.00 kN/m² | q = 0.00 kN/m².",
                    "Linha 02 (Piso Térreo Industrial): Altura = 0.15 m | Sobrecarga q = 20.00 kN/m² (apoiado no solo).",
                    "Linha 03 (Pavimento 1 / Mezanino): Altura = 4.35 m (Cota Z = +4.50m) | Carga permanente g = 1.50 kN/m² | Sobrecarga q = 5.00 kN/m².",
                    "Linha 04 (Cobertura): Altura = 4.00 m (Cota Z = +8.50m) | Carga permanente g = 0.25 kN/m² (telhas termoacústicas) | Sobrecarga q = 0.25 kN/m² (manutenção).",
                    "Clique no botão 'Aceitar' para consolidar os pavimentos no modelo tridimensional."
                ])
            ],
            "dica": "O peso próprio do concreto armado/protendido (25 kN/m³) é calculado de forma automática e precisa pelo solver de elementos finitos; lance apenas revestimentos e sobrecargas de projeto."
        },
        {
            "num": "03",
            "img": "aula_03_nUaw3f_O0uQ.jpg",
            "titulo": "AULA 03 — Importação de Plantas de Arquitetura (Máscaras DWG/DXF) e Captura",
            "caminho": "Barra Superior > Ícone Prancheta Azul 'Editar Máscaras' > Botão '+'",
            "telas": [
                ("Tela 1: Gerenciador de Máscaras DXF / DWG", [
                    "Clique no ícone de prancheta azul 'Editar Máscaras' na barra superior de ferramentas.",
                    "Clique no botão '+' (Adicionar) e navegue até a pasta onde está o arquivo DWG da arquitetura.",
                    "Selecione o arquivo DWG e clique em 'Abrir'.",
                    "No campo 'Escala do arquivo', certifique-se de que esteja selecionado '1 metro = 1 unidade de desenho'. Caso esteja em centímetros no AutoCAD, use o conversor de escala."
                ]),
                ("Tela 2: Ponto de Origem e Gerenciador de Layers", [
                    "Clique no botão 'Mudar a origem da planta' (ícone de mira com eixos X/Y).",
                    "Dê um clique na quina externa do pilar P1 da arquitetura para fixar o ponto (0,0) de referência que será comum a todos os pavimentos.",
                    "Na tabela de visibilidade de layers, desmarque camadas desnecessárias (como cotas secundárias e hachuras) para deixar o fundo limpo.",
                    "Pressione a tecla 'F3' (Capturas magnéticas) e marque: 'Interseção', 'Ponto Final' e 'Ponto Médio'.",
                    "Clique em 'Aceitar'."
                ])
            ],
            "dica": "O professor ensina: Sempre posicione a origem (0,0) exatamente no mesmo pilar em todos os pavimentos para evitar desalinhamentos de prumada."
        },
        {
            "num": "04",
            "img": "aula_04_tANYtLZtLD0.jpg",
            "titulo": "AULA 04 — Lançamento dos Pilares Pré-Moldados e Condições de Vinculação",
            "caminho": "Aba Inferior 'Entrada de Pilares' > Menu Introdução > Novo Pilar",
            "telas": [
                ("Tela 1: Aba 'Entrada de Pilares'", [
                    "Clique na aba 'Entrada de Pilares' no canto inferior esquerdo da interface.",
                    "A tela mudará para o ambiente 2D com a máscara DWG da arquitetura ao fundo."
                ]),
                ("Tela 2: Janela 'Novo Pilar'", [
                    "Acesse o menu 'Introdução' > 'Pilares, paredes e estacas' > 'Novo Pilar'.",
                    "No campo 'Referência', o software iniciará com P1.",
                    "Em 'Grupo Inicial', selecione: 'Fundação'; em 'Grupo Final', selecione: 'Cobertura'.",
                    "Em 'Vinculação Exterior', selecione 'Sem Vinculação Exterior' (caso vá lançar blocos sobre estacas com cálice).",
                    "Defina a seção geométrica inicial: Seção retangular de 40x40 cm, 50x50 cm ou 40x60 cm.",
                    "Em 'Coeficiente de Engastamento': no topo do pilar (último nível), digite 0.00 para articular a conexão com a cobertura metálica/tesoura.",
                    "Clique sobre cada nó de pilar na planta com a captura F3 ativada para inseri-los no projeto."
                ])
            ],
            "dica": "Em galpões pré-fabricados, posicione a maior dimensão do pilar na direção paralela ao vento transversal para garantir a máxima inércia contra forças horizontais."
        },
        {
            "num": "05",
            "img": "aula_05_98njMMw_nmE.jpg",
            "titulo": "AULA 05 — Modelagem de Consolos Pré-Moldados (Mísulas de Apoio NBR 9062)",
            "caminho": "Aba 'Entrada de Pilares' > Introdução > Consolos / Mísulas",
            "telas": [
                ("Tela 1: Seleção do Pilar e Posicionamento do Consolo", [
                    "Na aba 'Entrada de Pilares', clique em 'Introdução' > 'Consolos'.",
                    "Dê um clique sobre o pilar onde deseja adicionar o consolo para apoio de vigas de mezanino ou pontes rolantes.",
                    "Na janela que se abre, clique no botão 'Adicionar Consolo'."
                ]),
                ("Tela 2: Parametrização Geométrica do Consolo", [
                    "No campo 'Cota Z', informe a altura do topo do consolo (ex: Z = +4.30m para vigas de mezanino de 70cm de altura).",
                    "Selecione a face do pilar de onde o consolo se projeta (Face Norte, Sul, Leste ou Oeste).",
                    "Defina as dimensões: Balanço 'a' = 25 a 30 cm | Largura 'b' = largura do pilar (40 a 50 cm) | Altura 'h1' = 35 a 45 cm.",
                    "O CYPECAD configurará internamente o modelo de Biela e Tirante da NBR 9062 para dimensionamento das armaduras principais (tirante superior) e estribos horizontais de costura.",
                    "Clique em 'Aceitar'."
                ])
            ],
            "dica": "O professor alerta: Preveja sempre um espaço livre de no mínimo 5 cm entre a ponta da viga e a face do pilar para facilitar o içamento e acomodar dilatações térmicas."
        },
        {
            "num": "06",
            "img": "aula_06_dyJMQaNzN00.jpg",
            "titulo": "AULA 06 — Lançamento das Vigas Pré-Fabricadas e Articulação Obrigatória (M=0)",
            "caminho": "Aba Inferior 'Entrada de Pavimentos' > Menu Vigas/Paredes > Entrar Viga",
            "telas": [
                ("Tela 1: Aba 'Entrada de Pavimentos' e Pavimento Mezanino", [
                    "Clique na aba 'Entrada de Pavimentos' no rodapé e selecione o pavimento '03. Mezanino'.",
                    "Acesse o menu 'Vigas/Paredes' > 'Entrar Viga'."
                ]),
                ("Tela 2: Seleção do Tipo de Viga Pré-Fabricada", [
                    "Na janela de tipos de viga, selecione a família 'Vigas Pré-Fabricadas de Concreto' (Retangulares, Vigas I ou Vigas T).",
                    "Defina as dimensões da seção transversal: Largura b = 30 a 40 cm e Altura h = 60 a 90 cm.",
                    "Clique no primeiro pilar (P1) e depois no segundo pilar (P2) para traçar o eixo da viga."
                ]),
                ("Tela 3: Articulação Obrigatória das Extremidades (Momento Nulo)", [
                    "Acesse o menu 'Vigas' > 'Articular / Desconectar'.",
                    "Dê um clique nas duas extremidades de cada viga que se apoia sobre consolos.",
                    "Verifique se apareceu uma bolinha verde nas pontas da viga indicando Momento Fletor Nulo (M = 0).",
                    "Nas opções de apoio da viga, selecione o tipo de almofada de 'Neoprene Fretado'."
                ])
            ],
            "dica": "Se você não articular as pontas das vigas, o software assumirá ligação engastada monolítica e gerará armaduras negativas pesadas no topo da viga que não existem em estruturas pré-moldadas."
        },
        {
            "num": "07",
            "img": "aula_07_5egLvVoD61U.jpg",
            "titulo": "AULA 07 — Lançamento de Lajes Alveolares Protendidas e Capa Estrutural",
            "caminho": "Entrada de Pavimentos > Lajes > Gestão de Lajes > Entrar Laje",
            "telas": [
                ("Tela 1: Seleção do Módulo de Lajes Alveolares", [
                    "No nível '03. Mezanino', acesse 'Lajes' > 'Gestão de Lajes' > 'Entrar Laje'.",
                    "Na caixa de diálogo, selecione o ícone 'Lajes Pré-Fabricadas Alveolares' (ou 'Vigotas Pré-Fabricadas').",
                    "Selecione a espessura do painel de concreto alveolar: h = 16 cm, 20 cm ou 25 cm conforme o vão livre entre vigas (vãos de 6m a 10m)."
                ]),
                ("Tela 2: Parametrização da Capa de Concreto e Armadura de Distribuição", [
                    "No campo 'Espessura da Capa', defina hc >= 5.0 cm (mínimo normativo NBR 9062 para garantir o diafragma rígido).",
                    "No campo 'Concreto da Capa', selecione Fck >= 25 MPa.",
                    "Em 'Armadura de Distribuição', selecione Malha Soldada Q-138 (fios de 4.2mm espaçados a cada 10cm).",
                    "Dê um clique no interior de cada vão delimitado pelas vigas para inserir os painéis de laje.",
                    "Dê um segundo clique sobre a viga principal que receberá o apoio direto das lajes para orientar a direção dos alvéolos."
                ])
            ],
            "dica": "A capa de concreto moldada in loco com malha soldada é o elemento responsável por travar o topo dos pilares e transferir as cargas de vento para os pórticos principais."
        },
        {
            "num": "08",
            "img": "aula_08_hRu_F-enznM.jpg",
            "titulo": "AULA 08 — Dimensionamento de Fundações com Cálices Pré-Moldados",
            "caminho": "Entrada de Pavimentos > Fundações > Elementos de Fundação > Novo",
            "telas": [
                ("Tela 1: Seleção do Pavimento Fundação", [
                    "Mude para o nível '01. Fundação' no seletor de pavimentos no topo da tela.",
                    "Acesse o menu 'Fundações' > 'Elementos de Fundação' > 'Novo'."
                ]),
                ("Tela 2: Configuração dos Blocos com Cálice", [
                    "Escolha a tipologia: 'Bloco sobre Estacas com Cálice Pré-Moldado' (ou 'Sapata Isolada com Cálice').",
                    "Dê um clique sobre o ponto base de cada pilar lançado.",
                    "Na janela de propriedades do cálice, selecione o tipo de acabamento interno: 'Paredes Dentadas / Corrugadas' (permite menor profundidade) ou 'Paredes Lisas'.",
                    "Verifique a profundidade de embutimento do pilar no cálice conforme a NBR 9062: lemb >= 1.5 x hpilar (liso) ou lemb >= 1.2 x hpilar (dentado).",
                    "Clique em 'Aceitar'."
                ])
            ],
            "dica": "O professor explica que o grauteamento do cálice com microconcreto fluido graute (Fck >= 40 MPa) garante o engastamento perfeito da base do pilar."
        },
        {
            "num": "09",
            "img": "aula_09_6O9d-J7Iobs.jpg",
            "titulo": "AULA 09 — Configuração Automática da Ação do Vento (NBR 6123:2023)",
            "caminho": "Menu Superior > Obra > Dados Gerais > Ações > Ação do Vento",
            "telas": [
                ("Tela 1: Ativação do Vento Normativo", [
                    "Acesse o menu 'Obra' > 'Dados Gerais'.",
                    "Marque a caixa de seleção '[x] Com ação do vento'.",
                    "Na lista de normas, selecione: 'ABNT NBR 6123:2023'."
                ]),
                ("Tela 2: Parametrização dos Fatores do Vento", [
                    "No campo 'Velocidade Básica (V0)', informe: 40 a 45 m/s (conforme o mapa de isopletas da NBR 6123 para São Paulo/Paraná).",
                    "Fator Topográfico (S1): Selecione 1.0 (terreno plano ou fracamente ondulado).",
                    "Fator de Rugosidade (S2): Selecione Categoria IV (terrenos com obstáculos como cidades e parques industriais) e Classe B (edificações entre 20 e 50m).",
                    "Fator Estatístico (S3): Selecione 1.0 (Grupo 2 - Edificações industriais e comerciais normais).",
                    "Informe as larguras das fachadas expostas nas direções X e Y para cálculo automático da área de arrasto.",
                    "Clique em 'Aceitar'."
                ])
            ],
            "dica": "Em estruturas pré-fabricadas com grandes vãos, o vento gera os momentos fletores determinantes na base dos pilares; nunca desative essa verificação."
        },
        {
            "num": "10",
            "img": "aula_10_QAWnZfvrYj8.jpg",
            "titulo": "AULA 10 — Lançamento de Cargas Lineares, Fechamentos e Ações Transitórias",
            "caminho": "Entrada de Pavimentos > Cargas > Cargas Lineares em Vigas",
            "telas": [
                ("Tela 1: Aplicação de Cargas Lineares de Fechamento", [
                    "Acesse o menu 'Cargas' > 'Cargas lineares em vigas'.",
                    "No campo 'Valor da Carga', digite: 3.50 kN/m (para painéis pré-fabricados de concreto de fechamento) ou 0.40 kN/m (para telhas termoacústicas).",
                    "Dê um clique sobre todas as vigas de borda periféricas onde os painéis de fachada serão fixados."
                ]),
                ("Tela 2: Cargas Especiais e Situações de Montagem", [
                    "Para cargas de equipamentos ou pontes rolantes, acesse 'Cargas' > 'Cargas concentradas' e insira a carga pontual nas coordenadas exatas.",
                    "Em 'Combinações de Ações', certifique-se de que estejam ativadas as situações transitórias de transporte e içamento na fábrica com coeficiente de impacto dinâmico de 1.30.",
                    "Clique em 'Aceitar'."
                ])
            ],
            "dica": "Se o fechamento for em placas pré-moldadas apoiadas no piso térreo, descarregue essas forças na fundação e não nas vigas aéreas."
        },
        {
            "num": "11",
            "img": "aula_11_NtfRdUACgXI.jpg",
            "titulo": "AULA 11 — Processamento e Cálculo Estrutural por Elementos Finitos",
            "caminho": "Menu Superior > Calcular > Calcular a obra (inclusive fundações)",
            "telas": [
                ("Tela 1: Janela de Opções do Solver de Cálculo", [
                    "Clique no menu superior 'Calcular' > 'Calcular a obra (inclusive fundações)'.",
                    "Marque a caixa: '[x] Redimensionar todas as armaduras'.",
                    "Marque a caixa: '[x] Considerar efeitos de 2ª Ordem (P-Delta / Não linearidade geométrica)'.",
                    "Clique no botão 'Aceitar' para iniciar a montagem da matriz de rigidez e discretização dos nós tridimensionais."
                ]),
                ("Tela 2: Relatório de Avisos e Erros de Cálculo", [
                    "Após o término do processamento, o CYPECAD abrirá automaticamente o relatório de diagnóstico da obra.",
                    "Avisos em AMARELO: São alertas normativos (como avisos de armadura mínima ou limites de espaçamento).",
                    "Erros em VERMELHO: Indicam peças que violaram o Estado Limite Último (ELU) e exigem correção geométrica ou de armadura.",
                    "Clique em 'Sair' para ir para a tela de análise de resultados."
                ])
            ],
            "dica": "Sempre ative a análise P-Delta de segunda ordem para que o software calcule com precisão os momentos adicionais gerados pela flexão dos pilares sob vento."
        },
        {
            "num": "12",
            "img": "aula_12_k6okK_FOQRc.jpg",
            "titulo": "AULA 12 — Análise da Estabilidade Global (Coeficiente Gama-Z) e Deformada 3D",
            "caminho": "Aba Inferior 'Resultados' > Relatórios > Estabilidade Global / Vista 3D Deformada",
            "telas": [
                ("Tela 1: Aba 'Resultados' e Relatório de Estabilidade Global", [
                    "Clique na aba 'Resultados' no rodapé da tela do CYPECAD.",
                    "Acesse o menu 'Relatórios' > 'Estabilidade Global'.",
                    "Localize na listagem o valor do Coeficiente Gama-Z (yz) para as direções X e Y:",
                    "  • yz <= 1.10: ESTRUTURA DE NÓS FIXOS (Excelente rigidez lateral).",
                    "  • 1.10 < yz <= 1.30: ESTRUTURA DE NÓS MÓVEIS (Aceitável, exige consideração de 2ª ordem).",
                    "  • yz > 1.30: ESTRUTURA INSTÁVEL (NÃO PASSOU!). É obrigatório aumentar a seção dos pilares."
                ]),
                ("Tela 2: Visualização da Deformada Tridimensional (Vista 3D)", [
                    "Clique no ícone 'Vista 3D com Deformada' na barra superior.",
                    "Selecione a hipótese de 'Vento X' ou 'Vento Y' e aumente a escala visual do deslocamento para 100x.",
                    "Verifique visualmente se algum pilar ou pórtico está sofrendo torção ou deformação excessiva."
                ])
            ],
            "dica": "O professor ensina: Se o Gama-Z estiver acima de 1.30, aumente a largura dos pilares ou engaste a base nos blocos com cálice para recuperar a estabilidade global."
        },
        {
            "num": "13",
            "img": "aula_13_vQ1KHz_ZR2s.jpg",
            "titulo": "AULA 13 — Auditoria dos Pilares e Consolos — Verificações NBR (Passou / Não Passou)",
            "caminho": "Aba Resultados > Pilares > Editar Pilar ➔ Botão 'Check Verde (Verificações ELU/ELS)'",
            "telas": [
                ("Tela 1: Editor Completo de Pilares", [
                    "Na aba 'Resultados', acesse 'Pilares' > 'Editar Pilar'.",
                    "Dê um clique sobre qualquer pilar da planta.",
                    "Observe o código de cores: Verde = Passou em 100% dos testes; Vermelho = Erro estrutural em alguma combinação."
                ]),
                ("Tela 2: Relatório Detalhado de Verificações da NBR 6118 / NBR 9062", [
                    "Clique no botão com ícone de 'Check Verde' no topo da janela do editor de pilares.",
                    "O CYPECAD exibirá o laudo com todas as formulações matemáticas testadas:",
                    "  • Flexo-compressão oblíqua normal no ELU: Deve exibir '[✓ Cumpre]'.",
                    "  • Esbeltez do Pilar: Deve cumprir lambda <= 140.",
                    "  • Taxa de Armadura Longitudinal: Deve estar entre 0.4% e 4.0%.",
                    "  • Consolos de Apoio (Biela e Tirante): A tensão na biela de concreto deve cumprir sigma_c <= 0.60 x fcd.",
                    "Caso alguma linha esteja com '[✗ Não Cumpre]' em vermelho, altere a bitola das barras longitudinais ou aumente a seção do pilar."
                ])
            ],
            "dica": "Se o pilar reprovar por esbeltez excessiva, aumente a dimensão da seção na direção fraca (ex: passe de 40x40 para 40x50 cm) em vez de apenas adicionar mais aço."
        },
        {
            "num": "14",
            "img": "aula_14_6kpOAcVOrxA.jpg",
            "titulo": "AULA 14 — Edição e Otimização de Armaduras de Vigas e Verificação de Flechas",
            "caminho": "Aba Resultados > Vigas/Paredes > Editar Vigas ➔ Janela de Envoltórias e ELS",
            "telas": [
                ("Tela 1: Editor Gráfico de Vigas e Armaduras", [
                    "Na aba 'Resultados', acesse 'Vigas/Paredes' > 'Editar Vigas'.",
                    "Dê um clique sobre a viga mestra de mezanino para abrir o diagrama de armaduras longitudinais e estribos."
                ]),
                ("Tela 2: Verificação do Estado Limite de Serviço (Flechas e Fissuras)", [
                    "No topo da janela do editor, clique no botão 'Flechas' (Diagrama ELS).",
                    "Verifique o valor da 'Flecha Total Diferida no Tempo': Deve cumprir o limite da NBR 6118 de f_total <= L / 250 (para pisos) ou L / 350 (sob alvenarias).",
                    "Verifique a 'Abertura de Fissuras (wk)': Para ambiente industrial (Classe III), deve cumprir wk <= 0.20 mm.",
                    "Edite e padronize os diâmetros das barras (ex: uniformizar em barras de 16mm e 20mm) para reduzir custos de corte e dobra na fábrica de pré-moldados."
                ])
            ],
            "dica": "Se a flecha estiver vermelha (acima de L/250), aumente a altura da viga em 10 cm (h aprox. Vão / 10) ou utilize perfil pré-moldado protendido com contra-flecha."
        },
        {
            "num": "15",
            "img": "aula_15_Df7dK3crBeU.jpg",
            "titulo": "AULA 15 — Emissão de Relatórios Oficiais, Memórias de Cálculo e Pranchas DWG",
            "caminho": "Menu Superior > Arquivo > Relatórios da Obra ➔ Menu Arquivo > Desenhos",
            "telas": [
                ("Tela 1: Emissão da Memória de Cálculo e Quantitativos de Materiais", [
                    "Acesse o menu 'Arquivo' > 'Relatórios da Obra' > selecione 'Memória de Cálculo Completa'.",
                    "O CYPECAD gerará o laudo técnico com o memorial descritivo, formulações da NBR 6118/NBR 9062 e reações nas fundações para ART.",
                    "Em 'Quantitativos de Aço e Concreto', extraia a tabela resumida com o volume de concreto (m³) e peso total de aço CA-50/CP-190 (kg) por bitola."
                ]),
                ("Tela 2: Configuração e Exportação das Pranchas em AutoCAD DWG", [
                    "Acesse o menu 'Arquivo' > 'Desenhos' (ícone de prancha de desenho).",
                    "Clique em '+' e adicione as pranchas do projeto executivo:",
                    "  • Prancha 01: Locação e Cargas nas Fundações (Cálices e Estacas).",
                    "  • Prancha 02: Fôrmas dos Pavimentos e Locação de Vigas e Lajes Alveolares.",
                    "  • Pranchas 03 a 06: Detalhamento de Armaduras de Pilares, Consolos e Vigas com Tabela de Ferros.",
                    "Selecione o formato de saída: 'AutoCAD DWG/DXF' e clique no botão 'Aceitar' para exportar os arquivos prontos para plotagem e envio à fábrica."
                ])
            ],
            "dica": "As pranchas DWG exportadas pelo CYPECAD já vêm organizadas com carimbos, tabelas de dobra de armadura e resumos de aço individuais por elemento."
        }
    ]

    for item in detailed_aulas:
        story.append(Paragraph(f"{item['titulo']}", h1))
        story.append(HRFlowable(width="100%", thickness=1, color=cype_red, spaceAfter=3))
        
        story.append(Paragraph(f"<b>Caminho no CYPECAD 2027:</b> <i>{item['caminho']}</i>", body))
        story.append(Spacer(1, 0.1 * cm))

        # Screenshot
        img_fl = get_image_flowable(item['img'], target_width=16.8*cm, max_height=7.2*cm)
        if img_fl:
            story.append(img_fl)
            story.append(Paragraph(f"<i>Figura {item['num']}: Tela oficial do CYPECAD 2027 na {item['titulo'][:10]}</i>", img_caption))
        
        story.append(Spacer(1, 0.1 * cm))
        
        # Iterating over each screen change in this aula
        for screen_title, steps in item['telas']:
            story.append(Paragraph(f"<b>{screen_title}:</b>", h2))
            for s in steps:
                story.append(Paragraph(f"• {s}", bullet))
            story.append(Spacer(1, 0.05 * cm))
        
        story.append(Spacer(1, 0.05 * cm))
        story.append(Paragraph(f"💡 <b>Dica Prática do Professor:</b> {item['dica']}", body))
        
        story.append(PageBreak())

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Manual Ultra Detalhado CYPECAD gerado com sucesso: {pdf_out}")

if __name__ == '__main__':
    build_ultra_detailed_manual()
