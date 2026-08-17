from PIL import Image
import os

assets_dir = r"D:\LANDPAGE CONVERSAO\assets"
images = {
    "logo.png": "logo.webp",
    "projeto1.jpeg": "projeto1.webp",
    "projeto2.jpg": "projeto2.webp",
    "projeto3.jpg": "projeto3.webp",
    "projeto4.jpg": "projeto4.webp",
    "projeto5.jpg": "projeto5.webp",
    "projeto6.jpg": "projeto6.webp"
}

for src, dst in images.items():
    src_path = os.path.join(assets_dir, src)
    dst_path = os.path.join(assets_dir, dst)
    if os.path.exists(src_path):
        with Image.open(src_path) as img:
            img.save(dst_path, "WEBP")
            print(f"Converted {src} to {dst}")
    else:
        print(f"File not found: {src_path}")
