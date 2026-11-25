"""Dibuixa les tres figures del tema de la Terra (requereix Pillow)."""

from pathlib import Path
import os

from PIL import Image, ImageDraw, ImageFont


OUTPUT = Path(__file__).resolve().parents[1] / "docs" / "illustracions"
FONTS = Path(os.environ.get("WINDIR", "C:/Windows")) / "Fonts"
INK = "#173b34"
ACCENT = "#126653"
BLUE = "#236a8a"
GRID = "#91adaf"


def font(size, bold=False):
    windows = "arialbd.ttf" if bold else "arial.ttf"
    portable = "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    return ImageFont.truetype(str(FONTS / windows) if (FONTS / windows).exists() else portable, size)


def write(draw, xy, text, size=32, color=INK, bold=False, anchor="lm"):
    draw.text(xy, text, fill=color, font=font(size, bold), anchor=anchor)


def layers():
    image = Image.new("RGB", (920, 560), "#f4f7f3")
    draw = ImageDraw.Draw(image)
    center = (270, 280)
    for radius, fill in [(220, "#235e55"), (209, "#db9e64"), (129, "#f4cb73"), (73, "#f9e9ae")]:
        x, y = center
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=fill, outline=INK, width=3)
    items = [
        ((442, 146), 87, "Escorça"),
        ((409, 220), 204, "Mantell"),
        ((367, 313), 327, "Nucli extern"),
        ((310, 321), 454, "Nucli intern"),
    ]
    for (x, y), label_y, label in items:
        draw.line((x, y, 540, label_y, 604, label_y), fill=INK, width=3, joint="curve")
        draw.ellipse((x - 6, y - 6, x + 6, y + 6), fill=INK)
        write(draw, (625, label_y), label, size=37, bold=True)
    image.save(OUTPUT / "capes.png", optimize=True)


def coordinates():
    image = Image.new("RGB", (1110, 550), "#f0f7f8")
    draw = ImageDraw.Draw(image)
    xs = [190, 360, 530, 700, 870, 1040]
    ys = [102, 187, 272, 357, 442]
    for x, label in zip(xs, ["60° O", "40° O", "20° O", "0°", "20° E", "40° E"]):
        draw.line((x, ys[0], x, ys[-1]), fill=ACCENT if x == 700 else GRID, width=5 if x == 700 else 2)
        write(draw, (x, 68), label, size=29, anchor="mm", bold=x == 700)
    for y, label in zip(ys, ["40° N", "20° N", "0°", "20° S", "40° S"]):
        draw.line((xs[0], y, xs[-1], y), fill=BLUE if y == 272 else GRID, width=5 if y == 272 else 2)
        write(draw, (168, y), label, size=29, anchor="rm", bold=y == 272)
    draw.line((190, 187, 360, 187, 360, 102), fill="#94430e", width=5)
    draw.ellipse((348, 175, 372, 199), fill="#94430e", outline="white", width=2)
    write(draw, (383, 163), "A", size=37, color="#873a0a", bold=True)
    draw.line((190, 496, 235, 496), fill=BLUE, width=5)
    write(draw, (250, 496), "Equador", size=28, color=BLUE)
    draw.line((515, 496, 560, 496), fill=ACCENT, width=5)
    write(draw, (575, 496), "Meridià de Greenwich", size=28, color=ACCENT)
    image.save(OUTPUT / "coordenades.png", optimize=True)


def district():
    image = Image.new("RGB", (1170, 600), "#f3f5ee")
    draw = ImageDraw.Draw(image)
    draw.rectangle((52, 52, 790, 493), fill="#e4ebe6", outline="#789187", width=3)
    draw.rounded_rectangle((125, 115, 300, 237), radius=20, fill="#9fc5a1", outline="#315f3c", width=3)
    write(draw, (212, 175), "Parc", size=36, bold=True, anchor="mm")
    river = [(514, 55), (495, 128), (517, 201), (553, 274), (550, 354), (521, 431), (535, 490)]
    draw.line(river, fill="#36789a", width=52, joint="curve")
    draw.line(river, fill="#b2dae9", width=42, joint="curve")
    for street in [
        [(72, 312), (473, 312)], [(623, 312), (773, 312)], [(350, 63), (350, 475)],
        [(72, 417), (472, 417)], [(665, 63), (665, 475)],
    ]:
        draw.line(street, fill="#63776e", width=38)
        draw.line(street, fill="#fffdf7", width=31)
    draw.rectangle((472, 293, 623, 331), fill="#f0d1a4", outline="#795030", width=4)

    def building(x, y, letter):
        draw.rounded_rectangle((x, y, x + 59, y + 59), radius=8, fill="#28564c")
        write(draw, (x + 29, y + 30), letter, size=36, color="white", bold=True, anchor="mm")

    building(199, 341, "E")
    building(681, 217, "B")
    draw.polygon([(918, 55), (894, 121), (918, 109), (942, 121)], fill=INK)
    write(draw, (918, 42), "N", bold=True, anchor="ms")
    write(draw, (838, 179), "Llegenda", size=38, bold=True)
    building(836, 212, "E")
    building(836, 280, "B")
    write(draw, (911, 242), "Escola")
    write(draw, (911, 310), "Biblioteca")
    draw.rectangle((842, 363, 888, 388), fill="#b2dae9", outline=BLUE, width=3)
    draw.rectangle((842, 416, 888, 441), fill="#f0d1a4", outline="#795030", width=3)
    write(draw, (911, 376), "Riu")
    write(draw, (911, 429), "Pont")
    for position, label in [(75, "0"), (180, "50"), (285, "100 m")]:
        write(draw, (position, 557), label, size=29, anchor="mm")
    draw.rectangle((75, 522, 180, 535), fill=INK, outline=INK)
    draw.rectangle((180, 522, 285, 535), fill="white", outline=INK, width=2)
    image.save(OUTPUT / "planol.png", optimize=True)


if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    layers()
    coordinates()
    district()
