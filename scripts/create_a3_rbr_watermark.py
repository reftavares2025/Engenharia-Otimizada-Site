import os
import sys
from PIL import Image as PILImage, ImageEnhance
from reportlab.lib.pagesizes import A3, landscape
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm

def create_a3_with_rbr_watermark():
    img_path = r"R:\ENGENHARIA\DT_2026\RBR_COM_2026\120 - 26 - JOÃO BATISTA - PAULINIA - SP\explode view.png"
    logo_path = r"D:\Engenharia-Otimizada-Site\logo_rbr_clean.png"
    
    pdf_out_r = r"R:\ENGENHARIA\DT_2026\RBR_COM_2026\120 - 26 - JOÃO BATISTA - PAULINIA - SP\explode view.pdf"
    pdf_out_r_a3 = r"R:\ENGENHARIA\DT_2026\RBR_COM_2026\120 - 26 - JOÃO BATISTA - PAULINIA - SP\explode_view_A3.pdf"
    pdf_out_downloads = r"C:\Users\User\Downloads\explode_view_A3_RBR.pdf"
    pdf_out_project = r"D:\Engenharia-Otimizada-Site\explode_view_A3_RBR.pdf"

    if not os.path.exists(img_path) or not os.path.exists(logo_path):
        print("Error: files missing.")
        return

    # 1. Load exploded view image (1536x1024 or higher)
    explode_img = PILImage.open(img_path).convert("RGBA")
    w, h = explode_img.size

    # 2. Load clean logo (RGBA)
    logo_img = PILImage.open(logo_path).convert("RGBA")
    
    # Scale logo to cover ~70% width of the background
    target_logo_w = int(w * 0.75)
    logo_aspect = logo_img.size[1] / float(logo_img.size[0])
    target_logo_h = int(target_logo_w * logo_aspect)
    logo_resized = logo_img.resize((target_logo_w, target_logo_h), PILImage.Resampling.LANCZOS)

    # Adjust logo opacity to ~18% (subtle, colorful, non-intrusive watermark)
    alpha = logo_resized.split()[3]
    alpha = ImageEnhance.Brightness(alpha).enhance(0.22) # 22% opacity
    logo_resized.putalpha(alpha)

    # Center logo in background
    logo_x = (w - target_logo_w) // 2
    logo_y = (h - target_logo_h) // 2

    # Create composite: Background white -> Watermark logo -> Exploded view on top (or blended)
    # Since explode_img is mostly opaque render with white/light background, let's blend:
    # Blend watermark over explode_img using alpha composite or multiply:
    overlay = PILImage.new("RGBA", (w, h), (255, 255, 255, 0))
    overlay.paste(logo_resized, (logo_x, logo_y), mask=logo_resized)
    
    # Blend overlay with explode_img
    combined = PILImage.alpha_composite(explode_img, overlay)
    
    # Convert to RGB for PDF embedding
    combined_rgb = PILImage.new("RGB", (w, h), (255, 255, 255))
    combined_rgb.paste(combined, mask=combined.split()[3])
    
    comp_img_path = r"D:\Engenharia-Otimizada-Site\explode_view_rbr_composited.jpg"
    combined_rgb.save(comp_img_path, "JPEG", quality=98)
    print(f"Saved composited image: {comp_img_path}")

    # 3. Generate A3 Landscape PDF
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

    out_targets = [pdf_out_r, pdf_out_r_a3, pdf_out_downloads, pdf_out_project]

    for target in out_targets:
        try:
            c = canvas.Canvas(target, pagesize=landscape(A3))
            c.setTitle("120 - 26 - JOÃO BATISTA - PAULÍNIA - SP | Vista Explodida RBR")
            c.setAuthor("RBR Pré-Fabricados & Régis Tavares Engenharia")
            c.setSubject("Prancha Estrutural A3")

            # Draw high-res composited image
            c.drawImage(comp_img_path, x, y, width=draw_w, height=draw_h, preserveAspectRatio=True)

            # Footer / Title Block
            c.setFont("Helvetica-Bold", 8)
            c.setFillColorRGB(0.15, 0.25, 0.4)
            c.drawString(margin, 5 * mm, "120 - 26 - JOÃO BATISTA - PAULÍNIA - SP • VISTA EXPLODIDA ESTRUTURAL • PRÉ-FABRICADOS")
            c.setFont("Helvetica", 8)
            c.setFillColorRGB(0.4, 0.4, 0.4)
            c.drawRightString(page_width - margin, 5 * mm, "RBR Pré-Fabricados de Concreto • Formato A3 (420 x 297 mm)")

            c.showPage()
            c.save()
            print(f"PDF A3 gerado com sucesso: {target}")
        except Exception as e:
            print(f"Erro ao gerar {target}: {e}")

if __name__ == '__main__':
    create_a3_with_rbr_watermark()
