"""Gera og.jpg 1200x630 com Teatro + retrato + logomarca branca do site."""
from pathlib import Path
from PIL import Image

ROOT = Path(r"c:\Users\Marcos Pimentel\Documents\SiteRodSa\public\images")
OUT_JPG = ROOT / "og.jpg"
OUT_WEBP = ROOT / "og.webp"
LOGO = ROOT / "logo-vereador-branco-og.png"
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

    teatro_src = ROOT / "teatroam.webp"
    if not teatro_src.exists():
        teatro_src = Path(
            r"C:\Users\Marcos Pimentel\Documents\Rodrigo Sá\Gabinete\Site\teatroam.jpg"
        )
    teatro = cover(Image.open(teatro_src), int(W * 0.62), H)
    canvas.paste(teatro, (0, 0), teatro)

    # Fade teatro → azul
    fade = Image.new("L", (W, H), 0)
    from PIL import ImageDraw

    fd = ImageDraw.Draw(fade)
    for x in range(W):
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
    target_h = int(H * 1.18)
    scale = target_h / foto.height
    foto = foto.resize((int(foto.width * scale), target_h), Image.Resampling.LANCZOS)
    fx = W - foto.width + int(W * 0.02)
    fy = H - foto.height + int(H * 0.08)
    canvas.paste(foto, (fx, fy), foto)

    # Logomarca branca oficial do site
    if not LOGO.exists():
        raise SystemExit(f"Missing logo raster: {LOGO}")
    logo = Image.open(LOGO).convert("RGBA")
    logo_w = 520
    logo_h = int(logo.height * (logo_w / logo.width))
    logo = logo.resize((logo_w, logo_h), Image.Resampling.LANCZOS)
    lx, ly = 56, (H - logo_h) // 2 - 10
    canvas.paste(logo, (lx, ly), logo)

    rgb = canvas.convert("RGB")
    rgb.save(OUT_JPG, "JPEG", quality=92, optimize=True)
    rgb.save(OUT_WEBP, "WEBP", quality=90, method=6)
    print(f"saved {OUT_JPG} ({OUT_JPG.stat().st_size // 1024}KB)")
    print(f"saved {OUT_WEBP} ({OUT_WEBP.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
