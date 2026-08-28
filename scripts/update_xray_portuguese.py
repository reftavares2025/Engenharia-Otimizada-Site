import os
import sys
import shutil
from PIL import Image as PILImage, ImageEnhance
from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm

def update_xray_portuguese():
    # Source generated 100% Portuguese image
    src_img = r"C:\Users\User\.gemini\antigravity-cli\brain\0722e6e1-c65b-41a8-9d73-afc5a15a0d35\explode_view_raio_x_pt_rbr_1787942137594.jpg"
    logo_path = r"C:\Users\User\Pictures\RBR-JVR\LOGOS E QRCODE_RBR-JVR (1).png"
    
    dest_dir = r"R:\ENGENHARIA\DT_2026\RBR_COM_2026\120 - 26 - JOÃO BATISTA - PAULINIA - SP"
    os.makedirs(dest_dir, exist_ok=True)
    
    dest_png = os.path.join(dest_dir, "explode_view_raio_x_rbr.png")
    dest_jpg = os.path.join(dest_dir, "explode_view_raio_x_rbr.jpg")
    dest_pdf_r = os.path.join(dest_dir, "PRANCHA_EXPLODE_VIEW_RAIO_X_RBR_A3.pdf")
    dest_pdf_downloads = r"C:\Users\User\Downloads\PRANCHA_EXPLODE_VIEW_RAIO_X_RBR_A3.pdf"
    dest_pdf_project = r"D:\Engenharia-Otimizada-Site\PRANCHA_EXPLODE_VIEW_RAIO_X_RBR_A3.pdf"

    # Save raw high-res images
    shutil.copyfile(src_img, dest_jpg)
    im = PILImage.open(src_img)
    im.save(dest_png, "PNG")
    print(f"Updated raw Portuguese images in {dest_dir}")

    # 1. Composite with RBR-JVR logo watermark
    explode_img = PILImage.open(src_img).convert("RGBA")
    w, h = explode_img.size

    if os.path.exists(logo_path):
        logo_img = PILImage.open(logo_path).convert("RGBA")
        bbox = logo_img.getbbox()
        logo_cropped = logo_img.crop(bbox) if bbox else logo_img

        target_logo_w = int(w * 0.70)
        logo_aspect = logo_cropped.size[1] / float(logo_cropped.size[0])
        target_logo_h = int(target_logo_w * logo_aspect)
        if target_logo_h > int(h * 0.70):
            target_logo_h = int(h * 0.70)
            target_logo_w = int(target_logo_h / logo_aspect)

        logo_resized = logo_cropped.resize((target_logo_w, target_logo_h), PILImage.Resampling.LANCZOS)
        
        # 18% opacity watermark
        r, g, b, a = logo_resized.split()
        a_adj = ImageEnhance.Brightness(a).enhance(0.18)
        logo_watermark = PILImage.merge("RGBA", (r, g, b, a_adj))

        logo_x = (w - target_logo_w) // 2
        logo_y = (h - target_logo_h) // 2

        overlay = PILImage.new("RGBA", (w, h), (255, 255, 255, 0))
        overlay.paste(logo_watermark, (logo_x, logo_y), mask=logo_watermark)
        combined = PILImage.alpha_composite(explode_img, overlay)
    else:
        combined = explode_img

    combined_rgb = PILImage.new("RGB", (w, h), (255, 255, 255))
    combined_rgb.paste(combined, mask=combined.split()[3])
    
    comp_jpg = r"D:\Engenharia-Otimizada-Site\explode_xray_pt_rbr_composited.jpg"
    combined_rgb.save(comp_jpg, "JPEG", quality=98)
    print(f"Saved composited image: {comp_jpg}")

    # 2. Build A3 Landscape PDF
    page_width, page_height = landscape(A3) # 420mm x 297mm
    margin = 8 * mm
    avail_w = page_width - 2 * margin
    avail_h = page_height - 2 * margin

    img_aspect = w / float(h)
    page_aspect = avail_w / float(avail_h)

    if img_aspect > page_aspect:
        draw_w = avail_w
        draw_h = draw_w / img_aspect
    else:
        draw_h = avail_h
        draw_w = draw_h * img_aspect

    x = margin + (avail_w - draw_w) / 2.0
    y = margin + (avail_h - draw_h) / 2.0

    for out_pdf in [dest_pdf_r, dest_pdf_downloads, dest_pdf_project]:
        try:
            c = canvas.Canvas(out_pdf, pagesize=landscape(A3))
            c.setTitle("120 - 26 - JOÃO BATISTA - PAULÍNIA - SP | Vista Explodida e Raio-X em Português")
            c.setAuthor("RBR-JVR Pré-Fabricados & Régis Tavares Engenharia")
            c.setSubject("Prancha Técnica A3 - Detalhamento Estrutural NBR 9062")

            c.drawImage(comp_jpg, x, y, width=draw_w, height=draw_h, preserveAspectRatio=True)

            c.setFont("Helvetica-Bold", 8)
            c.setFillColorRGB(0.15, 0.25, 0.4)
            c.drawString(margin, 5 * mm, "120 - 26 - JOÃO BATISTA - PAULÍNIA - SP • VISTA EXPLODIDA E RAIO-X ESTRUTURAL • RBR PRÉ-FABRICADOS")
            c.setFont("Helvetica", 8)
            c.setFillColorRGB(0.4, 0.4, 0.4)
            c.drawRightString(page_width - margin, 5 * mm, "RBR-JVR Pré-Fabricados de Concreto • ABNT NBR 9062:2017 & NBR 6118:2023 • Formato A3")

            c.showPage()
            c.save()
            print(f"PDF A3 gerado: {out_pdf}")
        except Exception as e:
            print(f"Erro em {out_pdf}: {e}")

if __name__ == '__main__':
    update_xray_portuguese()
