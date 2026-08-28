import os
import sys
import shutil
from PIL import Image as PILImage, ImageDraw, ImageFont
from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm

def build_prancha_explode():
    src_explode_img = r"C:\Users\User\.gemini\antigravity-cli\brain\0722e6e1-c65b-41a8-9d73-afc5a15a0d35\explode_view_joao_batista_1787943132524.jpg"
    logo_path = r"C:\Users\User\Pictures\RBR-JVR\LOGOS E QRCODE_RBR-JVR (1).png"
    
    dest_dir = r"R:\ENGENHARIA\DT_2026\RBR_COM_2026\120 - 26 - JOÃO BATISTA - PAULINIA - SP"
    os.makedirs(dest_dir, exist_ok=True)
    
    out_img_path = os.path.join(dest_dir, "120-26 EXPLODE VIEW OFICIAL.png")
    out_pdf_r = os.path.join(dest_dir, "120-26 EXPLODE VIEW OFICIAL.pdf")
    out_pdf_downloads = r"C:\Users\User\Downloads\120-26 EXPLODE VIEW OFICIAL.pdf"
    out_pdf_project = r"D:\Engenharia-Otimizada-Site\120-26_EXPLODE_VIEW_OFICIAL.pdf"

    # 1. Create High-Resolution Canvas (3508 x 2480 - A4/A3 300dpi ratio)
    cw, ch = 3508, 2480
    prancha = PILImage.new("RGB", (cw, ch), (255, 255, 255))
    draw = ImageDraw.Draw(prancha)

    # Load Fonts
    font_title = ImageFont.truetype("arialbd.ttf", 56)
    font_item_title = ImageFont.truetype("arialbd.ttf", 34)
    font_item_sub = ImageFont.truetype("arial.ttf", 26)
    font_box_title = ImageFont.truetype("arialbd.ttf", 30)
    font_box_body = ImageFont.truetype("arial.ttf", 24)
    font_badge = ImageFont.truetype("arialbd.ttf", 24)
    font_badge_sm = ImageFont.truetype("arialbd.ttf", 18)

    # Header Title
    title_text = "EXPLODEVIEW – ESTRUTURA PRÉ-FABRICADA DE CONCRETO"
    draw.text((120, 80), title_text, fill=(30, 30, 30), font=font_title)

    # Place Explode View Image on the Right / Center
    exp_im = PILImage.open(src_explode_img).convert("RGBA")
    exp_w, exp_h = exp_im.size
    target_h = 1650
    target_w = int(target_h * (exp_w / float(exp_h)))
    if target_w > 2350:
        target_w = 2350
        target_h = int(target_w * (exp_h / float(exp_w)))
    
    exp_resized = exp_im.resize((target_w, target_h), PILImage.Resampling.LANCZOS)
    exp_x = 1000 + (2350 - target_w) // 2
    exp_y = 150 + (1650 - target_h) // 2
    prancha.paste(exp_resized, (exp_x, exp_y), mask=exp_resized.split()[3])

    # Draw Left Side Numbered Callouts (Items 1 to 8)
    items = [
        ("1", "LAJES PRÉ-FABRICADAS", "Painéis alveolares\nde concreto", 200),
        ("2", "VIGAS MEZANINO", "Pré-fabricadas\nde concreto", 410),
        ("3", "VIGAS PRINCIPAIS", "Pré-fabricadas\nde concreto", 620),
        ("4", "LAJES INTERMEDIÁRIAS", "Painéis alveolares\nde concreto", 830),
        ("5", "ESCADA PRÉ-FABRICADA", "Escada em \"U\" com\npatamar intermediário", 1040),
        ("6", "PILARES", "Pré-fabricados\nde concreto", 1250),
        ("7", "BLOCOS DE COROAMENTO", "Pré-fabricados\nde concreto", 1460),
        ("8", "ESTACAS", "Pré-fabricadas\nde concreto", 1670),
    ]

    for num, title, sub, y_pos in items:
        # Number Circle Badge (Black circle with white number)
        cx, cy, radius = 145, y_pos + 18, 22
        draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=(0, 0, 0))
        draw.text((cx - 7, cy - 14), num, fill=(255, 255, 255), font=font_badge)
        
        # Item Title
        draw.text((180, y_pos), title, fill=(0, 0, 0), font=font_item_title)
        
        # Item Subtext
        draw.text((180, y_pos + 42), sub, fill=(70, 70, 70), font=font_item_sub)
        
        # Pointer line towards the 3D model
        line_start_x = 650
        line_start_y = y_pos + 25
        line_mid_x = line_start_x + 180
        line_end_x = exp_x + 80
        line_end_y = exp_y + int((y_pos - 150) * (target_h / 1650.0)) + 60
        
        # Draw elegant leader line
        draw.line([(line_start_x, line_start_y), (line_mid_x, line_start_y), (line_end_x, line_end_y)], fill=(120, 120, 120), width=3)
        draw.ellipse([line_end_x - 5, line_end_y - 5, line_end_x + 5, line_end_y + 5], fill=(0, 0, 0))

    # Bottom Area: Box 1 (Componentes) & Box 2 (Características) & Logo
    
    # Box 1: Componentes Pré-Fabricados Utilizados
    b1_x1, b1_y1, b1_x2, b1_y2 = 120, 1900, 1550, 2380
    draw.rounded_rectangle([b1_x1, b1_y1, b1_x2, b1_y2], radius=15, outline=(180, 180, 180), width=3)
    draw.text((b1_x1 + 30, b1_y1 + 25), "COMPONENTES PRÉ-FABRICADOS UTILIZADOS", fill=(30, 30, 30), font=font_box_title)
    
    comp_lines = [
        ("1", "Lajes pré-fabricadas – painéis alveolares de concreto"),
        ("2", "Vigas mezanino – pré-fabricadas de concreto"),
        ("3", "Vigas principais – pré-fabricadas de concreto"),
        ("4", "Lajes intermediárias – painéis alveolares de concreto"),
        ("5", "Escada pré-fabricada – escada em \"U\" com patamar intermediário"),
        ("6", "Pilares – pré-fabricados de concreto"),
        ("7", "Blocos de coroamento – pré-fabricados de concreto"),
        ("8", "Estacas – pré-fabricadas de concreto")
    ]
    
    y_c = b1_y1 + 80
    for num_b, txt in comp_lines:
        # Small circle badge
        cx_b, cy_b, r_b = b1_x1 + 45, y_c + 14, 15
        draw.ellipse([cx_b - r_b, cy_b - r_b, cx_b + r_b, cy_b + r_b], fill=(0, 0, 0))
        draw.text((cx_b - 5, cy_b - 11), num_b, fill=(255, 255, 255), font=font_badge_sm)
        
        draw.text((b1_x1 + 75, y_c), txt, fill=(50, 50, 50), font=font_box_body)
        y_c += 48

    # Box 2: Características (Sem a observação de baldrame!)
    b2_x1, b2_y1, b2_x2, b2_y2 = 1600, 1900, 2450, 2380
    draw.rounded_rectangle([b2_x1, b2_y1, b2_x2, b2_y2], radius=15, outline=(180, 180, 180), width=3)
    draw.text((b2_x1 + 30, b2_y1 + 25), "CARACTERÍSTICAS", fill=(30, 30, 30), font=font_box_title)
    
    caract_lines = [
        "•  Sistema 100% pré-fabricado de concreto",
        "•  Montagem rápida e limpa",
        "•  Alta durabilidade e performance",
        "•  Dispensa formas e concretagem no local"
    ]
    y_car = b2_y1 + 95
    for l in caract_lines:
        draw.text((b2_x1 + 30, y_car), l, fill=(50, 50, 50), font=font_box_body)
        y_car += 58

    # Logo RBR-JVR in the bottom right corner
    if os.path.exists(logo_path):
        logo_im = PILImage.open(logo_path).convert("RGBA")
        bbox = logo_im.getbbox()
        logo_cr = logo_im.crop(bbox) if bbox else logo_im
        
        logo_target_w = 880
        logo_target_h = int(logo_target_w * (logo_cr.size[1] / float(logo_cr.size[0])))
        if logo_target_h > 460:
            logo_target_h = 460
            logo_target_w = int(logo_target_h * (logo_cr.size[0] / float(logo_cr.size[1])))
        
        logo_res = logo_cr.resize((logo_target_w, logo_target_h), PILImage.Resampling.LANCZOS)
        logo_pos_x = 2520 + (900 - logo_target_w) // 2
        logo_pos_y = 1910 + (460 - logo_target_h) // 2
        prancha.paste(logo_res, (logo_pos_x, logo_pos_y), mask=logo_res.split()[3])

    # Save final high-res PNG image
    prancha.save(out_img_path, "PNG", quality=100)
    print(f"Saved master prancha PNG to: {out_img_path}")

    # 2. Build A3 PDF (Landscape 420 x 297 mm)
    page_w, page_h = landscape(A3)
    margin = 5 * mm
    draw_w = page_w - 2 * margin
    draw_h = page_h - 2 * margin

    for pdf_t in [out_pdf_r, out_pdf_downloads, out_pdf_project]:
        try:
            c = canvas.Canvas(pdf_t, pagesize=landscape(A3))
            c.setTitle("120 - 26 - JOÃO BATISTA - PAULÍNIA - SP | Explode View Oficial")
            c.setAuthor("RBR Pré-Fabricados & Régis Tavares Engenharia")
            c.setSubject("Explode View - Estrutura Pré-Fabricada de Concreto")

            c.drawImage(out_img_path, margin, margin, width=draw_w, height=draw_h, preserveAspectRatio=True)
            c.showPage()
            c.save()
            print(f"Saved PDF to: {pdf_t}")
        except Exception as e:
            print(f"Erro salvando {pdf_t}: {e}")

if __name__ == '__main__':
    build_prancha_explode()
