#!/usr/bin/env python3
"""
Turn a PNG/JPG screenshot into the two WebP files the site uses.

  python3 scripts/make-image-variants.py path/to/screenshot.png public/images/projects/<slug>/<name>

Writes <name>.webp (1800px wide) and <name>-900.webp (900px wide, served to phones).
Needs Pillow:  pip install pillow
"""
import sys
from PIL import Image

if len(sys.argv) != 3:
    sys.exit(__doc__)
src, base = sys.argv[1], sys.argv[2]
img = Image.open(src).convert("RGB")
for width, suffix, quality in [(1800, "", 86), (900, "-900", 84)]:
    h = round(img.height * width / img.width)
    out = f"{base}{suffix}.webp"
    img.resize((width, h), Image.LANCZOS).save(out, "WEBP", quality=quality, method=6)
    print(f"wrote {out}  ({width}x{h})")
print("Now add the image to the project's `images` list: src, srcSmall, alt, caption, width: 1800, height: <height above>.")
