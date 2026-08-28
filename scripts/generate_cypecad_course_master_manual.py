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
            self.drawString(1.8 * cm, 28.5 * cm, "CYPECAD 2027 — MANUAL COMPLETO DO CURSO PASSO A PASSO (15 AULAS)")
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748B"))
            self.drawRightString(19.2 * cm, 28.5 * cm, "RÉGIS TAVARES ENGENHARIA CIVIL")
            
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.6)
            self.line(1.8 * cm, 28.3 * cm, 19.2 * cm, 28.3 * cm)
            
            self.line(1.8 * cm, 1.8 * cm, 19.2 * cm, 1.8 * cm)
            self.drawString(1.8 * cm, 1.3 * cm, "Curso Prático de Cálculo Estrutural Conforme NBR 6118:2023 & NBR 9062:2017")
            page_text = f"Página {self._pageNumber} de {page_count}"
            self.drawRightString(19.2 * cm, 1.3 * cm, page_text)
            self.restoreState()

def generate_cypecad_course_manual():
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
    
    h1 = ParagraphStyle('H1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=primary, spaceBefore=8, spaceAfter=3, keepWithNext=True)
    h2 = ParagraphStyle('H2', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=secondary, spaceBefore=5, spaceAfter=2, keepWithNext=True)
    
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

    story = []

    # ==========================================
    # CAPA
    # ==========================================
    story.append(Spacer(1, 1 * cm))
    badge_data = [[Paragraph("<b>CYPECAD 2027</b><br/><font size=9 color='#64748B'>CURSO COMPLETO DE CÁLCULO ESTRUTURAL — 15 AULAS PASSO A PASSO</font>", title_cover)]]
    t_badge = Table(badge_data, colWidths=[17.4*cm])
    t_badge.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#FDF2F2")),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 12),
        ('BOTTOMPADDING', (0,0), (-1,-1), 12),
        ('BOX', (0,0), (-1,-1), 1.5, cype_red),
    ]))
    story.append(t_badge)
    story.append(Spacer(1, 0.4 * cm))

    story.append(Paragraph("MANUAL PRÁTICO ILUSTRADO: DA MODELAGEM AO CÁLCULO FINAL", title_cover))
    story.append(Spacer(1, 0.2 * cm))
    story.append(Paragraph("ACOMPANHAMENTO DETALHADO DAS 15 AULAS DO CURSO COM INDICAÇÃO VISUAL DE ONDE CLICAR EM CADA TELA", subtitle_cover))
    story.append(Spacer(1, 0.4 * cm))

    cover_img = get_image_flowable("aula_01_CCLAeV-thcg.jpg", target_width=15.5*cm, max_height=8*cm)
    if cover_img:
        story.append(cover_img)
        story.append(Paragraph("<i>Interface Inicial e Introdução ao CYPECAD 2027</i>", img_caption))
    story.append(Spacer(1, 0.4 * cm))

    meta_info = [
        [Paragraph("<b>Engenharia:</b> Régis Tavares Engenharia Civil", body), Paragraph("<b>Software:</b> CYPECAD 2027 (CYPE)", body)],
        [Paragraph("<b>Playlist do Curso:</b> 15 Aulas Oficiais do YouTube", body), Paragraph("<b>Normas:</b> NBR 6118:2023, NBR 9062:2017, NBR 6123:2023", body)],
        [Paragraph("<b>Projeto:</b> Estrutura Completa de Concreto / Pré-Moldados", body), Paragraph("<b>Data:</b> Agosto / 2026", body)]
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
    # AS 15 AULAS DETALHADAS
    # ==========================================
    course_aulas = [
        {
            "num": "01",
            "img": "aula_01_CCLAeV-thcg.jpg",
            "titulo": "Aula 01 — Criação da Obra, Interface Geral e Parametrização das Normas ABNT",
            "caminho": "Arquivo > Novo > Obra Vazia > Dados Gerais",
            "desc": "O professor inicia a apresentação do ambiente de trabalho do CYPECAD, explica as abas inferiores e configura a norma brasileira NBR 6118 / NBR 9062.",
            "cliques": [
                "1. Clique em 'Arquivo' > 'Novo' > Insira o nome do arquivo da obra e selecione 'Obra Vazia'.",
                "2. Na janela 'Dados Gerais', selecione a Norma de Concreto: 'ABNT NBR 6118:2023 / NBR 9062:2017'.",
                "3. Defina a classe de resistência do concreto: C35 / C40 / C50 (ideal para pré-moldados e desforma rápida).",
                "4. Defina os aços: CA-50 para barras longitudinais, CA-60 para estribos e CP-190 RB para protensão.",
                "5. Defina a Classe de Agressividade Ambiental (CAA II urbana ou CAA III industrial) para ajuste automático dos cobrimentos (c_nom = 30 a 40mm).",
                "6. Em 'Agregados', defina a brita 1 (diâmetro máximo d_max = 19mm)."
            ],
            "dica": "O professor destaca que qualquer alteração posterior nos 'Dados Gerais' após a modelagem exigirá recalcular a obra inteira."
        },
        {
            "num": "02",
            "img": "aula_02_GMak511QjfQ.jpg",
            "titulo": "Aula 02 — Criação da Árvore de Pavimentos, Cotas Verticais e Sobrecargas",
            "caminho": "Introdução > Pavimentos > Novos Pavimentos",
            "desc": "O professor estrutura os níveis do edifício, definindo as alturas de pé-direito, cargas permanentes de revestimento e sobrecargas de projeto.",
            "cliques": [
                "1. Clique em 'Introdução' > 'Pavimentos' > 'Novos Pavimentos' e escolha a opção 'Soltos'.",
                "2. Defina o número de pavimentos da obra: Fundação (Cota 0.00m), Piso Térreo (+0.15m), Mezanino/Pavimento 1 (+4.50m) e Cobertura (+8.50m).",
                "3. Insira as cargas permanentes (g): 1.50 kN/m² para piso e revestimento de mezanino, e 0.25 kN/m² para telhas termoacústicas.",
                "4. Insira as sobrecargas de uso (q): 5.00 kN/m² para mezaninos de armazenagem/escritório e 0.25 kN/m² para manutenção de cobertura.",
                "5. Clique em 'Aceitar' para consolidar os pavimentos no modelo tridimensional."
            ],
            "dica": "O peso próprio do concreto estrutural (25 kN/m³) não deve ser somado na carga permanente (g), pois o CYPECAD calcula o volume real automaticamente."
        },
        {
            "num": "03",
            "img": "aula_03_nUaw3f_O0uQ.jpg",
            "titulo": "Aula 03 — Importação e Calibração de Máscaras de Arquitetura (DWG / DXF)",
            "caminho": "Ícone 'Plantas / Máscaras' (Topo) > + (Adicionar)",
            "desc": "O professor importa a planta baixa arquitetônica, calibra a escala 1:1, posiciona a origem de coordenadas (0,0) e configura os layers de captura.",
            "cliques": [
                "1. Clique no ícone de prancheta azul 'Editar Máscaras' na barra superior.",
                "2. Clique no botão '+' e selecione o arquivo DWG/DXF da arquitetura no computador.",
                "3. Em 'Escala do arquivo', certifique-se de selecionar '1 metro = 1 unidade'. Caso o DWG esteja em centímetros, use o botão 'Mudar a escala'.",
                "4. Clique em 'Mudar a origem da planta' e clique na quina externa do pilar P1 para fixar o ponto (0,0) em comum para todos os pavimentos.",
                "5. Ative a captura magnética (tecla F3): selecione 'Interseção', 'Ponto Final' e 'Ponto Médio'."
            ],
            "dica": "Limpe o arquivo DWG no AutoCAD (comando PURGE) antes de importar para remover hachuras e textos pesados que deixam o CYPECAD lento."
        },
        {
            "num": "04",
            "img": "aula_04_tANYtLZtLD0.jpg",
            "titulo": "Aula 04 — Lançamento dos Pilares, Seções Geométricas e Articulações de Topo",
            "caminho": "Aba 'Entrada de Pilares' > Introdução > Novo Pilar",
            "desc": "O professor demonstra como posicionar os pilares sobre as marcas do DWG, definir seções retangulares e articular as conexões de topo.",
            "cliques": [
                "1. Mude para a aba 'Entrada de Pilares' no canto inferior esquerdo da tela.",
                "2. Clique em 'Introdução' > 'Pilares, paredes e estacas' > 'Novo Pilar'.",
                "3. Defina a seção transversal de cada pilar: 40x40 cm, 50x50 cm ou 40x60 cm.",
                "4. Defina a prumada: início no nível 'Fundação' e término no nível 'Cobertura'.",
                "5. Clique sobre a quina de cada pilar na máscara DWG com a captura F3 ativada.",
                "6. Em 'Coeficientes de Engastamento', defina 0.00 no topo do pilar para articular a ligação que receberá tesouras ou vigas metálicas."
            ],
            "dica": "O professor enfatiza que pilares de galpões pré-fabricados devem ter a maior dimensão orientada na direção do pórtico principal para resistir ao vento."
        },
        {
            "num": "05",
            "img": "aula_05_98njMMw_nmE.jpg",
            "titulo": "Aula 05 — Compatibilização Estrutural e Lançamento de Consolos Pré-Moldados",
            "caminho": "Entrada de Pilares > Introdução > Consolos / Mísulas",
            "desc": "O professor ensina a modelar os consolos (mísulas) de concreto nos pilares para apoio das vigas pré-fabricadas conforme a NBR 9062.",
            "cliques": [
                "1. Na aba 'Entrada de Pilares', acesse 'Introdução' > 'Consolos'.",
                "2. Clique no pilar onde a viga de mezanino ou ponte rolante irá apoiar.",
                "3. Defina a cota Z do topo do consolo (ex: Z = +4.30m).",
                "4. Selecione a face de saída do consolo (Norte, Sul, Leste ou Oeste).",
                "5. Digite as dimensões: Balanço 'a' = 25 a 30 cm e Altura 'h1' = 35 a 45 cm.",
                "6. O software adota o modelo de Biela e Tirante da NBR 9062 para dimensionar as armaduras principais e estribos de costura."
            ],
            "dica": "Sempre preveja folga de no mínimo 5 cm entre a ponta da viga e o pilar para montagem no canteiro e dilatação térmica."
        },
        {
            "num": "06",
            "img": "aula_06_dyJMQaNzN00.jpg",
            "titulo": "Aula 06 — Lançamento de Vigas Pré-Fabricadas e Articulação Obrigatória (M=0)",
            "caminho": "Aba 'Entrada de Pavimentos' > Vigas/Paredes > Entrar Viga",
            "desc": "O professor ensina a lançar vigas pré-moldadas, ajustar eixos e aplicar a articulação de momento fletor nulo sobre os consolos.",
            "cliques": [
                "1. Mude para a aba 'Entrada de Pavimentos' e selecione o pavimento '03. Mezanino'.",
                "2. Clique em 'Vigas/Paredes' > 'Entrar Viga' e escolha o tipo: 'Viga Pré-Fabricada Retangular, Viga I ou Viga T'.",
                "3. Defina as dimensões: Base b = 25 a 40 cm e Altura h = 60 a 90 cm.",
                "4. Clique de pilar a pilar para traçar as vigas principais e secundárias.",
                "5. ARTICULAÇÃO: Clique em 'Vigas' > 'Articular / Desconectar' e clique nas pontas das vigas apoiadas nos consolos.",
                "6. Verifique se apareceu a bolinha verde nas extremidades indicando momento fletor nulo (M=0)."
            ],
            "dica": "O professor alerta: se você não articular a viga pré-moldada, o CYPECAD irá gerar armadura superior de engastamento monolítico, o que é um erro grave de projeto pré-moldado."
        },
        {
            "num": "07",
            "img": "aula_07_5egLvVoD61U.jpg",
            "titulo": "Aula 07 — Lançamento de Lajes Alveolares Protendidas e Efeito de Diafragma Rígido",
            "caminho": "Entrada de Pavimentos > Lajes > Gestão de Lajes > Entrar Laje",
            "desc": "O professor insere os painéis alveolares protendidos, define a capa de concreto moldada in loco e a malha de distribuição de esforços.",
            "cliques": [
                "1. No nível '03. Mezanino', clique em 'Lajes' > 'Gestão de Lajes' > 'Entrar Laje'.",
                "2. Selecione 'Lajes Pré-Fabricadas Alveolares' (ou 'Vigotas Pré-Fabricadas').",
                "3. Selecione a altura do painel alveolar: h = 16, 20 ou 25 cm para vãos de 6m a 10m.",
                "4. Configure a 'Capa de Concreto': Espessura hc >= 5.0 cm com Fck >= 25 MPa.",
                "5. Configure a armadura da capa: Malha soldada Q-138 (fios de 4.2mm a cada 10cm).",
                "6. Clique dentro dos panos formados pelas vigas para inserir as lajes.",
                "7. Defina a direção de apoio clicando na viga mestra que receberá a reação das lajes."
            ],
            "dica": "A capa de concreto com malha soldada é indispensável para travar o topo dos pilares e fazer o galpão trabalhar como uma caixa rígida sob o vento."
        },
        {
            "num": "08",
            "img": "aula_08_hRu_F-enznM.jpg",
            "titulo": "Aula 08 — Dimensionamento de Fundações com Cálices Pré-Moldados",
            "caminho": "Entrada de Pavimentos > Fundações > Elementos de Fundação > Novo",
            "desc": "O professor projeta os blocos de fundação com cálices de encaixe para embutimento dos pilares pré-fabricados conforme a NBR 9062.",
            "cliques": [
                "1. Mude para o nível '01. Fundação' no seletor de pavimentos.",
                "2. Clique em 'Fundações' > 'Elementos de Fundação' > 'Novo'.",
                "3. Escolha 'Bloco sobre Estacas com Cálice Pré-Moldado' ou 'Sapata com Cálice'.",
                "4. Clique sobre o nó de cada pilar para inserir o elemento de fundação.",
                "5. Configure o tipo de parede do cálice: 'Paredes Lisas' ou 'Paredes Dentadas / Corrugadas'.",
                "6. Ajuste a profundidade de embutimento do pilar no cálice: lemb >= 1.5 x hpilar (liso) ou lemb >= 1.2 x hpilar (dentado)."
            ],
            "dica": "O professor explica que preencher o cálice com graute de alta resistência (fck >= 40 MPa) garante o engastamento perfeito do pilar na fundação."
        },
        {
            "num": "09",
            "img": "aula_09_6O9d-J7Iobs.jpg",
            "titulo": "Aula 09 — Configuração e Aplicação Automática das Ações de Vento (NBR 6123)",
            "caminho": "Obra > Dados Gerais > Ações > Ação do Vento > ABNT NBR 6123",
            "desc": "O professor configura a ação do vento dinâmico nas fachadas do galpão, calculando as pressões de arrasto e sucção.",
            "cliques": [
                "1. Acesse 'Obra' > 'Dados Gerais' > Marque a opção '[x] Com ação do vento'.",
                "2. Selecione a norma brasileira: 'ABNT NBR 6123:2023'.",
                "3. Em 'Velocidade Básica (V0)', informe 40 a 45 m/s (para regiões de São Paulo e Paraná).",
                "4. Fator Topográfico (S1): Defina 1.0 (terreno plano ou descampado).",
                "5. Fator S2: Selecione Categoria IV (terrenos industriais/urbanos) e Classe B (estruturas de 20 a 50m).",
                "6. Fator S3: Defina 1.0 (Grupo 2 - Ocupação comercial/industrial normal).",
                "7. Defina as dimensões da fachada em X e Y para cálculo automático da área de exposição."
            ],
            "dica": "O vento é a carga horizontal mais importante no cálculo de galpões e estruturas pré-fabricadas; nunca deixe essa opção desmarcada."
        },
        {
            "num": "10",
            "img": "aula_10_QAWnZfvrYj8.jpg",
            "titulo": "Aula 10 — Lançamento de Cargas Lineares de Fechamento e Cargas Especiais",
            "caminho": "Entrada de Pavimentos > Cargas > Cargas Lineares em Vigas",
            "desc": "O professor aplica as cargas de paredes de fechamento (painéis pré-moldados ou alvenaria) e cargas concentradas de equipamentos.",
            "cliques": [
                "1. Clique em 'Cargas' > 'Cargas lineares em vigas'.",
                "2. Digite o valor da carga linear de fechamento em placas de concreto: ex: 3.50 kN/m.",
                "3. Clique sobre as vigas de borda onde as placas de fechamento estarão apoiadas.",
                "4. Para cargas pontuais de tubulações, pontes rolantes ou dutos, use 'Cargas' > 'Cargas concentradas'.",
                "5. Nas combinações de cálculo, verifique as hipóteses de peso próprio + vento + sobrecarga."
            ],
            "dica": "Se o fechamento for em telhas metálicas leves (painéis tipo sanduíche), a carga linear cai para cerca de 0.30 a 0.50 kN/m."
        },
        {
            "num": "11",
            "img": "aula_11_NtfRdUACgXI.jpg",
            "titulo": "Aula 11 — O Processamento e Cálculo Estrutural (Aperte o Play!)",
            "caminho": "Calcular > Calcular a obra (inclusive fundações)",
            "desc": "O professor roda o cálculo da obra por elementos finitos, ativando a análise de 2ª ordem e dimensionamento automático das armaduras.",
            "cliques": [
                "1. Clique no menu superior 'Calcular' > 'Calcular a obra (inclusive fundações)'.",
                "2. Marque a opção: '[x] Redimensionar todas as armaduras'.",
                "3. Marque a opção: '[x] Considerar efeitos de 2ª Ordem (P-Delta / Não linearidade geométrica)'.",
                "4. Clique em 'Aceitar' e aguarde a montagem da matriz de rigidez e resolução dos esforços.",
                "5. Ao finalizar, abra o relatório de 'Avisos e Erros de Cálculo'."
            ],
            "dica": "Avisos amarelos são recomendações normativas de armadura mínima; erros vermelhos indicam peças que não passaram e precisam de ajuste."
        },
        {
            "num": "12",
            "img": "aula_12_k6okK_FOQRc.jpg",
            "titulo": "Aula 12 — Análise da Estabilidade Global (Coeficiente Gama-Z) e Deformada 3D",
            "caminho": "Aba 'Resultados' > Relatórios > Estabilidade Global / Vista 3D Deformada",
            "desc": "O professor avalia a rigidez da estrutura, verifica se o galpão é estável sob ação de vento e examina a deformada tridimensional.",
            "cliques": [
                "1. Mude para a aba 'Resultados' no rodapé do CYPECAD.",
                "2. Acesse 'Relatórios' > 'Estabilidade Global'.",
                "3. Verifique o valor do Coeficiente Gama-Z (yz):",
                "   - yz <= 1.10: Estrutura de Nós Fixos (Excelente rigidez).",
                "   - 1.10 < yz <= 1.30: Estrutura de Nós Móveis (Aceitável).",
                "   - yz > 1.30: ESTRUTURA INSTÁVEL (NÃO PASSOU!). Aumente a inércia dos pilares.",
                "4. Clique no ícone 'Vista 3D com Deformada' para ver a animação do galpão oscilando com o vento."
            ],
            "dica": "O professor explica que se o Gama-Z estiver acima de 1.30, a estrutura corre risco de tombamento ou deformação lateral excessiva."
        },
        {
            "num": "13",
            "img": "aula_13_vQ1KHz_ZR2s.jpg",
            "titulo": "Aula 13 — Auditoria dos Pilares e Consolos — Verificações NBR (Passou / Não Passou)",
            "caminho": "Aba Resultados > Pilares > Editar Pilar / Consolos",
            "desc": "O professor audita os pilares, abre o relatório de verificações com Check Verde e ajusta armaduras que deram erro.",
            "cliques": [
                "1. Na aba 'Resultados', clique em 'Pilares' > 'Editar Pilar'.",
                "2. Clique sobre qualquer pilar para abrir a janela de detalhamento de armaduras.",
                "3. Verifique o status de cor do pilar: Verde = Passou; Amarelo = Alerta; Vermelho = Reprovado.",
                "4. Clique no botão de 'Check Verde (Verificações E.L.U. e E.L.S.)':",
                "   - O CYPECAD lista todas as equações da NBR 6118 / NBR 9062 testadas para todas as combinações.",
                "   - Se todas as linhas tiverem '[✓ Cumpre]', o pilar está 100% aprovado.",
                "5. No módulo de consolos, confirme que a tensão na biela cumpre sigma_c <= 0.60 x fcd."
            ],
            "dica": "Se o pilar estiver vermelho por esbeltez excessiva (lambda > 140), aumente a largura do pilar (ex: passe de 40x40 para 40x50 cm)."
        },
        {
            "num": "14",
            "img": "aula_14_6kpOAcVOrxA.jpg",
            "titulo": "Aula 14 — Edição e Otimização de Armaduras de Vigas e Verificação de Flechas",
            "caminho": "Aba Resultados > Vigas/Paredes > Editar Vigas / Envoltórias",
            "desc": "O professor analisa as envoltórias de momento fletor e cortante nas vigas, ajusta bitolas de aço e confere a flecha diferida no tempo.",
            "cliques": [
                "1. Na aba 'Resultados', clique em 'Vigas/Paredes' > 'Editar Vigas'.",
                "2. Clique sobre a viga mestra de mezanino.",
                "3. Verifique a 'Flecha Total Diferida': Deve cumprir o limite da NBR 6118 de f_total <= L / 250.",
                "4. Verifique a 'Abertura de Fissuras (wk)': Para ambiente industrial (Classe III), deve cumprir wk <= 0.20 mm.",
                "5. Edite as armaduras longitudinais e estribos diretamente na tela para padronizar bitolas e facilitar a fabricação."
            ],
            "dica": "O professor recomenda padronizar os diâmetros das barras (ex: usar apenas barras de 16mm e 20mm) para reduzir perdas de corte e dobra na fábrica."
        },
        {
            "num": "15",
            "img": "aula_15_Df7dK3crBeU.jpg",
            "titulo": "Aula 15 — Emissão de Relatórios, Memoriais de Cálculo Oficiais e Pranchas DWG",
            "caminho": "Arquivo > Relatórios da Obra / Arquivo > Desenhos",
            "desc": "O professor finaliza o projeto exportando a memória de cálculo completa para ART e as pranchas em formato AutoCAD DWG prontas para obra.",
            "cliques": [
                "1. Clique em 'Arquivo' > 'Relatórios da Obra' > 'Memória de Cálculo Completa' (Gera o relatório técnico oficial com formulações NBR).",
                "2. Em 'Quantitativos de Aço e Concreto', extraia a relação exata de volume de concreto (m³) e peso de aço CA-50/CP-190 (kg) por bitola.",
                "3. Clique em 'Arquivo' > 'Desenhos' (ícone de prancha de desenho).",
                "4. Adicione as pranchas de Locação de Fundações, Fôrmas e Detalhamento de Armaduras de Pilares, Consolos e Vigas.",
                "5. Clique em 'Aceitar' e exporte os arquivos DWG para plotagem e envio para a fábrica."
            ],
            "dica": "As pranchas geradas pelo CYPECAD já incluem tabela de ferros com comprimento de corte e resumo de aço por elemento, acelerando a produção na fábrica."
        }
    ]

    for item in course_aulas:
        story.append(Paragraph(f"{item['titulo']}", h1))
        story.append(HRFlowable(width="100%", thickness=1, color=cype_red, spaceAfter=4))
        
        story.append(Paragraph(f"<b>Caminho no CYPECAD 2027:</b> <i>{item['caminho']}</i>", body))
        story.append(Paragraph(f"<b>Objetivo da Aula:</b> {item['desc']}", body))
        story.append(Spacer(1, 0.15 * cm))

        # Screenshot
        img_fl = get_image_flowable(item['img'], target_width=16.8*cm, max_height=8.5*cm)
        if img_fl:
            story.append(img_fl)
            story.append(Paragraph(f"<i>Figura {item['num']}: Captura real da tela da {item['titulo']}</i>", img_caption))
        
        story.append(Spacer(1, 0.15 * cm))
        story.append(Paragraph("<b>Passo a Passo de Aonde Clicar (Cliques do Professor):</b>", h2))
        for c in item['cliques']:
            story.append(Paragraph(f"• {c}", bullet))
        
        story.append(Spacer(1, 0.1 * cm))
        story.append(Paragraph(f"💡 <b>Dica Prática do Professor:</b> {item['dica']}", body))
        
        story.append(PageBreak())

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Manual Completo do Curso CYPECAD gerado com sucesso: {pdf_out}")

if __name__ == '__main__':
    generate_cypecad_course_manual()
