"""Gera og.jpg 1200x630 no estilo hero (Teatro + retrato + tipografia)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = Path(r"c:\Users\Marcos Pimentel\Documents\SiteRodSa\public\images")
OUT_JPG = ROOT / "og.jpg"
OUT_WEBP = ROOT / "og.webp"
W, H = 1200, 630
NAVY = (2, 28, 79)


def cover(img: Image.Image, tw: int, th: int) -> Image.Image:
    img = img.convert("RGBA")
    scale = max(tw / img.width, th / img.height)
    nw, nh = int(img.width * scale), int(img.height * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - tw) // 2
    top = (nh - th) // 2
    return img.crop((left, top, left + tw, top + th))


def main() -> None:
    canvas = Image.new("RGBA", (W, H), (*NAVY, 255))

    # Teatro — lado esquerdo (~58% da largura)
    teatro_src = ROOT / "teatroam.webp"
    if not teatro_src.exists():
        teatro_src = Path(r"C:\Users\Marcos Pimentel\Documents\Rodrigo Sá\Gabinete\Site\teatroam.jpg")
    teatro = cover(Image.open(teatro_src), int(W * 0.62), H)
    canvas.paste(teatro, (0, 0), teatro)

    # Fade teatro → azul (esquerda → direita)
    fade = Image.new("L", (W, H), 0)
    fd = ImageDraw.Draw(fade)
    for x in range(W):
        # 0 = mostra teatro, 255 = navy
        if x < W * 0.28:
            a = int(40 + (x / (W * 0.28)) * 50)
        elif x < W * 0.55:
            t = (x - W * 0.28) / (W * 0.27)
            a = int(90 + t * 165)
        else:
            a = 255
        fd.line([(x, 0), (x, H)], fill=min(255, a))
    navy_layer = Image.new("RGBA", (W, H), (*NAVY, 255))
    canvas = Image.composite(navy_layer, canvas, fade)

    # Retrato — direita
    foto = Image.open(ROOT / "hero-foto.png").convert("RGBA")
    # Aproxima o rosto
    target_h = int(H * 1.18)
    scale = target_h / foto.height
    foto = foto.resize((int(foto.width * scale), target_h), Image.Resampling.LANCZOS)
    fx = W - foto.width + int(W * 0.02)
    fy = H - foto.height + int(H * 0.08)
    canvas.paste(foto, (fx, fy), foto)

    # Texto
    draw = ImageDraw.Draw(canvas)
    try:
        font_name = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 92)
        font_sub = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 28)
    except OSError:
        font_name = ImageFont.load_default()
        font_sub = font_name

    x0, y0 = 56, 210
    # RODRIGO (branco sólido)
    draw.text((x0, y0), "RODRIGO", font=font_name, fill=(255, 255, 255, 255))
    bbox = draw.textbbox((x0, y0), "RODRIGO", font=font_name)
    gap = 18
    sx = bbox[2] + gap

    # SÁ — contorno branco / preenchimento semi-transparente (efeito ghost)
    sa = "SÁ"
    # stroke
    for dx, dy in ((-2, 0), (2, 0), (0, -2), (0, 2), (-2, -2), (2, 2), (-2, 2), (2, -2)):
        draw.text((sx + dx, y0 + dy), sa, font=font_name, fill=(255, 255, 255, 220))
    # fill navy translucent look
    draw.text((sx, y0), sa, font=font_name, fill=(2, 28, 79, 180))

    # Subtítulo
    draw.text((x0, bbox[3] + 18), "VEREADOR DE MANAUS", font=font_sub, fill=(255, 255, 255, 245))

    # Faixa amarela discreta sob o subtítulo
    line_y = bbox[3] + 58
    draw.rectangle([x0, line_y, x0 + 160, line_y + 5], fill=(253, 184, 20, 255))

    rgb = canvas.convert("RGB")
    rgb.save(OUT_JPG, "JPEG", quality=92, optimize=True)
    rgb.save(OUT_WEBP, "WEBP", quality=90, method=6)
    print(f"saved {OUT_JPG} ({OUT_JPG.stat().st_size // 1024}KB)")
    print(f"saved {OUT_WEBP} ({OUT_WEBP.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
