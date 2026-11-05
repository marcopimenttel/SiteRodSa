from pathlib import Path
from PIL import Image

root = Path(r"c:\Users\Marcos Pimentel\Documents\SiteRodSa\public\images")
gabinete = Path(r"C:\Users\Marcos Pimentel\Documents\Rodrigo Sá\Gabinete\Site")

teatro_src = gabinete / "teatroam.jpg"
teatro_dst = root / "teatroam.webp"
img = Image.open(teatro_src)
w, h = img.size
max_side = 2400
if max(w, h) > max_side:
    scale = max_side / max(w, h)
    img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
if img.mode not in ("RGB", "RGBA"):
    img = img.convert("RGB")
else:
    img = img.convert("RGB")
img.save(teatro_dst, "WEBP", quality=92, method=6)
print(
    f"teatroam: {teatro_src.stat().st_size // 1024}KB -> {teatro_dst.stat().st_size // 1024}KB {img.size}"
)

SKIP = {"hero-foto.png"}
converted = 0
errors = []

for path in sorted(root.rglob("*")):
    if not path.is_file():
        continue
    if path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue
    if path.name.lower() in SKIP:
        print("skip", path.relative_to(root))
        continue
    out = path.with_suffix(".webp")
    try:
        im = Image.open(path)
        has_alpha = path.suffix.lower() == ".png" and (
            "A" in im.getbands() or im.mode in ("RGBA", "LA", "P")
        )
        if has_alpha:
            im = im.convert("RGBA")
        else:
            im = im.convert("RGB")
        w, h = im.size
        max_side = 2000
        if max(w, h) > max_side:
            scale = max_side / max(w, h)
            im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
        im.save(out, "WEBP", quality=92, method=6)
        print(
            f"OK {path.relative_to(root)} {path.stat().st_size // 1024}KB -> {out.stat().st_size // 1024}KB"
        )
        converted += 1
    except Exception as e:  # noqa: BLE001
        errors.append((str(path), str(e)))
        print("ERR", path, e)

print("converted", converted, "errors", len(errors))
for item in errors:
    print(item)
