from __future__ import annotations

import tempfile
from pathlib import Path

from PIL import Image
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "fichas-tecnicas"
LOGO_PATH = ROOT / "img" / "logo hd.jpeg"

PAGE_WIDTH, PAGE_HEIGHT = A4
NAVY = HexColor("#060E1A")
NAVY_MID = HexColor("#132F53")
BLUE = HexColor("#0EA5E9")
BLUE_LIGHT = HexColor("#E0F2FE")
SLATE_900 = HexColor("#0F172A")
SLATE_700 = HexColor("#334155")
SLATE_500 = HexColor("#64748B")
SLATE_300 = HexColor("#CBD5E1")
SLATE_100 = HexColor("#F1F5F9")

FONT_REGULAR_PATH = "/System/Library/Fonts/Supplemental/Arial.ttf"
FONT_BOLD_PATH = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REGULAR = "ArialNP"
FONT_BOLD = "ArialNP-Bold"

PRODUCTS = [
    {
        "slug": "espuma-acustica-nfonoab",
        "name": "Espuma Acústica",
        "code": "NFonoAB",
        "category": "Acústica",
        "image": ROOT / "img" / "espuma-acustica.png",
        "description": (
            "Acondicionamiento acústico para espacios donde el control de ruido "
            "y reverberación es crítico. Ideal para estudios, salas de "
            "conferencias y recintos industriales."
        ),
        "specs": [
            ("Dimensión", "60 x 60 cm"),
            ("Espesores", "4 cm / 6 cm"),
            ("Densidad", "20 kg/m³"),
            ("Color", "Gris"),
            ("Tratamiento", "Ignífugo retardante de llama"),
            ("Instalación", "Con adhesivo"),
        ],
        "uses": [
            "Estudios de grabación",
            "Teatros y cines",
            "Salas de conferencias",
            "Home studio",
            "Oficinas y aulas",
            "Sistemas de ventilación",
        ],
    },
    {
        "slug": "panel-acustico-naislanpanel",
        "name": "Panel Acústico",
        "code": "NAislanPANEL",
        "category": "Control acústico",
        "image": ROOT / "img" / "naislan-panel-producto.jpg",
        "description": (
            "Panel acústico modular con terminación en metal galvanizado, "
            "diseñado para reducir la transmisión de ruido y formar encierros "
            "o barreras resistentes para instalaciones industriales."
        ),
        "specs": [
            ("Dimensión", "97 x 300 cm"),
            ("Espesores", "5 cm / 10 cm"),
            ("Aislación", "35 a 45 Rw"),
            ("Terminación", "Metal galvanizado"),
            ("Propiedades", "Ignífugo y resistente a la corrosión"),
            ("Fabricación", "Medidas especiales a pedido"),
        ],
        "uses": [
            "Salas de bombas",
            "Salas de máquinas",
            "Grupos electrógenos",
            "Plantas de tratamiento de aguas",
            "Encierros de equipos",
            "Galpones",
            "Pantallas y barreras",
        ],
    },
    {
        "slug": "splitter-acustico-nsplitter",
        "name": "Splitter Acústico",
        "code": "NSplitter",
        "category": "Acústica",
        "image": ROOT / "img" / "splitter.png",
        "description": (
            "Atenuador acústico tipo splitter para sistemas de ventilación y "
            "ductos industriales. Reduce el ruido generado por el flujo de aire "
            "manteniendo la eficiencia del sistema."
        ),
        "specs": [
            ("Material", "Acero galvanizado"),
            ("Relleno", "Lana mineral / Espuma"),
            ("Largo", "Hasta 3.000 mm"),
            ("Distancia entre splitters", "30 a 90 mm"),
            ("Fabricación", "A medida"),
            ("Aplicación", "Ductos de ventilación"),
        ],
        "uses": [
            "Sistemas HVAC",
            "Ductos industriales",
            "Salas de máquinas",
            "Recintos hospitalarios",
            "Edificios comerciales",
        ],
    },
    {
        "slug": "celosia-acustica-ncelosia",
        "name": "Celosía Acústica",
        "code": "NCelosía",
        "category": "Acústica",
        "image": ROOT / "img" / "celosia.png",
        "description": (
            "Celosías metálicas diseñadas para ventilación con atenuación "
            "acústica. Permiten el paso de aire controlando la transmisión de "
            "ruido en fachadas e instalaciones industriales."
        ),
        "specs": [
            ("Material", "Acero galvanizado / Inoxidable"),
            ("Tipo", "Láminas inclinadas"),
            ("Fabricación", "A medida"),
            ("Montaje", "Empotrado o sobrepuesto"),
            ("Acabado", "Galvanizado / Pintura"),
        ],
        "uses": [
            "Fachadas industriales",
            "Salas de generadores",
            "Subestaciones eléctricas",
            "Sistemas de ventilación",
            "Recintos con equipos ruidosos",
        ],
    },
    {
        "slug": "silenciador-escape-gases-nsilense",
        "name": "Silenciador de Escape de Gases",
        "code": "NSilenSE",
        "category": "Control acústico industrial",
        "image": ROOT / "img" / "silenciador-escape-gases-nsilense.png",
        "description": (
            "Silenciador diseñado para controlar el ruido en admisiones y "
            "escapes de motores de combustión interna, sopladores y bombas de "
            "vacío, con fabricación según los requerimientos de cada instalación."
        ),
        "specs": [
            ("Grado industrial", "12 a 18 dBA N.R."),
            ("Grado residencial", "20 a 25 dBA N.R."),
            ("Grado crítico", "25 a 32 dBA N.R."),
            ("Grado súper crítico", "30 a 38 dBA N.R."),
            ("Grado hospitalario", "35 a 50 dBA N.R."),
            ("Fabricación", "A medida; accesorios disponibles"),
        ],
        "uses": [
            "Admisiones y escapes de motores de combustión interna",
            "Admisiones y descargas de sopladores",
            "Descargas de bombas de vacío",
        ],
    },
    {
        "slug": "panel-perforado-nperfab",
        "name": "Panel Perforado",
        "code": "NPerfAB",
        "category": "Acústica",
        "image": ROOT / "img" / "panel-perforado.png",
        "description": (
            "Paneles metálicos perforados para revestimiento acústico de muros "
            "y cielos. Combinan absorción acústica con estética industrial, "
            "utilizados en conjunto con material absorbente."
        ),
        "specs": [
            ("Material", "Acero galvanizado / Inoxidable"),
            ("Perforación", "Circular / Según diseño"),
            ("Fabricación", "A medida"),
            ("Espesor plancha", "0,5 a 1,5 mm"),
            ("Acabado", "Galvanizado / Pintura"),
        ],
        "uses": [
            "Revestimiento de muros",
            "Cielos acústicos",
            "Salas de máquinas",
            "Recintos industriales",
            "Edificios comerciales",
        ],
    },
    {
        "slug": "pantalla-movil-nmovil",
        "name": "Pantalla Móvil",
        "code": "NMóvil",
        "category": "Seguridad Industrial",
        "image": ROOT / "img" / "pantalla-movil.png",
        "description": (
            "Pantalla móvil plegable con ruedas para protección en trabajos de "
            "soldadura y esmerilado. Estructura metálica robusta con paneles "
            "translúcidos que permiten visibilidad controlada."
        ),
        "specs": [
            ("Material", "Acero con pintura epóxica"),
            ("Paneles", "3 cuerpos plegables"),
            ("Ruedas", "Con freno"),
            ("Tipo", "Translúcido / Opaco"),
            ("Fabricación", "A medida"),
        ],
        "uses": [
            "Talleres de soldadura",
            "Zonas de esmerilado",
            "Áreas de trabajo industrial",
            "Separación de espacios",
            "Protección visual y de partículas",
        ],
    },
]


def draw_cover_image(
    pdf: canvas.Canvas,
    image_path: Path,
    x: float,
    y: float,
    width: float,
    height: float,
    prepared_path: Path,
) -> None:
    with Image.open(image_path) as source:
        source = source.convert("RGB")
        source_ratio = source.width / source.height
        target_ratio = width / height

        if source_ratio > target_ratio:
            crop_width = int(source.height * target_ratio)
            left = (source.width - crop_width) // 2
            source = source.crop((left, 0, left + crop_width, source.height))
        else:
            crop_height = int(source.width / target_ratio)
            top = (source.height - crop_height) // 2
            source = source.crop((0, top, source.width, top + crop_height))

        source.thumbnail((1400, 1000), Image.Resampling.LANCZOS)
        source.save(prepared_path, "JPEG", quality=88, optimize=True)

    pdf.saveState()
    path = pdf.beginPath()
    path.roundRect(x, y, width, height, 5)
    pdf.clipPath(path, stroke=0, fill=0)
    pdf.drawImage(
        ImageReader(prepared_path),
        x,
        y,
        width=width,
        height=height,
        preserveAspectRatio=False,
        mask="auto",
    )
    pdf.restoreState()
    pdf.setStrokeColor(SLATE_300)
    pdf.roundRect(x, y, width, height, 5, stroke=1, fill=0)


def draw_paragraph(
    pdf: canvas.Canvas,
    text: str,
    x: float,
    top: float,
    width: float,
    style: ParagraphStyle,
) -> float:
    paragraph = Paragraph(text, style)
    _, height = paragraph.wrap(width, PAGE_HEIGHT)
    paragraph.drawOn(pdf, x, top - height)
    return height


def generate_pdf(product: dict, temp_dir: Path) -> Path:
    output_path = OUTPUT_DIR / f"{product['slug']}.pdf"
    prepared_image = temp_dir / f"{product['slug']}.jpg"
    pdf = canvas.Canvas(
        str(output_path),
        pagesize=A4,
        pageCompression=1,
    )
    pdf.setTitle(f"Ficha técnica - {product['name']}")
    pdf.setAuthor("N Proyectos Ltda")
    pdf.setSubject(f"Especificaciones de {product['name']} {product['code']}")

    pdf.setFillColor(NAVY)
    pdf.rect(0, 672, PAGE_WIDTH, 170, stroke=0, fill=1)
    pdf.setFillColor(BLUE)
    pdf.rect(0, 672, PAGE_WIDTH, 5, stroke=0, fill=1)

    pdf.setFillColor(white)
    pdf.roundRect(42, 781, 172, 43, 4, stroke=0, fill=1)
    pdf.drawImage(
        ImageReader(LOGO_PATH),
        50,
        788,
        width=156,
        height=29,
        preserveAspectRatio=True,
        anchor="c",
        mask="auto",
    )

    pdf.setFillColor(BLUE)
    pdf.setFont(FONT_BOLD, 8.5)
    pdf.drawString(42, 755, f"FICHA TÉCNICA  /  {product['category'].upper()}")
    pdf.setFillColor(white)
    pdf.setFont(FONT_BOLD, 26)
    pdf.drawString(42, 713, product["name"])
    pdf.setFillColor(HexColor("#CBD5E1"))
    pdf.setFont(FONT_REGULAR, 10)
    pdf.drawString(42, 692, "Producto fabricado o suministrado por N Proyectos Ltda")

    pdf.setFillColor(BLUE_LIGHT)
    pdf.roundRect(428, 742, 125, 46, 5, stroke=0, fill=1)
    pdf.setFillColor(NAVY_MID)
    pdf.setFont(FONT_BOLD, 7.5)
    pdf.drawRightString(541, 774, "CÓDIGO DE PRODUCTO")
    pdf.setFont(FONT_BOLD, 15)
    pdf.drawRightString(541, 753, product["code"])

    draw_cover_image(pdf, product["image"], 42, 451, 247, 190, prepared_image)

    pdf.setFillColor(SLATE_900)
    pdf.setFont(FONT_BOLD, 10)
    pdf.drawString(318, 635, "DATOS TÉCNICOS")
    pdf.setStrokeColor(BLUE)
    pdf.setLineWidth(2)
    pdf.line(318, 626, 553, 626)

    row_top = 614
    available_height = 156
    row_height = available_height / len(product["specs"])
    for index, (label, value) in enumerate(product["specs"]):
        y_top = row_top - index * row_height
        if index % 2 == 0:
            pdf.setFillColor(SLATE_100)
            pdf.rect(318, y_top - row_height, 235, row_height, stroke=0, fill=1)
        label_style = ParagraphStyle(
            f"spec-label-{index}",
            fontName=FONT_BOLD,
            fontSize=6.4,
            leading=7.2,
            textColor=SLATE_500,
            alignment=TA_LEFT,
        )
        draw_paragraph(pdf, label.upper(), 326, y_top - 6, 80, label_style)
        value_style = ParagraphStyle(
            f"spec-{index}",
            fontName=FONT_REGULAR,
            fontSize=8.6,
            leading=9.8,
            textColor=SLATE_900,
            alignment=TA_LEFT,
        )
        draw_paragraph(pdf, value, 414, y_top - 6, 131, value_style)

    body_style = ParagraphStyle(
        "body",
        fontName=FONT_REGULAR,
        fontSize=10,
        leading=15,
        textColor=SLATE_700,
        alignment=TA_LEFT,
    )
    pdf.setFillColor(SLATE_900)
    pdf.setFont(FONT_BOLD, 10)
    pdf.drawString(42, 416, "DESCRIPCIÓN")
    pdf.setStrokeColor(SLATE_300)
    pdf.setLineWidth(0.7)
    pdf.line(42, 407, 553, 407)
    draw_paragraph(pdf, product["description"], 42, 393, 511, body_style)

    pdf.setFillColor(SLATE_900)
    pdf.setFont(FONT_BOLD, 10)
    pdf.drawString(42, 319, "APLICACIONES")
    pdf.setStrokeColor(SLATE_300)
    pdf.line(42, 310, 553, 310)

    for index, use in enumerate(product["uses"]):
        column = index % 2
        row = index // 2
        x = 42 + column * 260
        y = 286 - row * 26
        pdf.setFillColor(BLUE)
        pdf.circle(x + 4, y + 4, 3, stroke=0, fill=1)
        pdf.setFillColor(SLATE_700)
        pdf.setFont(FONT_REGULAR, 9.3)
        pdf.drawString(x + 14, y, use)

    pdf.setFillColor(BLUE_LIGHT)
    pdf.roundRect(42, 119, 511, 65, 5, stroke=0, fill=1)
    pdf.setFillColor(NAVY_MID)
    pdf.setFont(FONT_BOLD, 9)
    pdf.drawString(56, 164, "FABRICACIÓN Y ALCANCE")
    note_style = ParagraphStyle(
        "note",
        fontName=FONT_REGULAR,
        fontSize=8.6,
        leading=11,
        textColor=NAVY_MID,
        alignment=TA_LEFT,
    )
    draw_paragraph(
        pdf,
        "Las dimensiones, materiales y terminaciones pueden ajustarse según los "
        "requerimientos del proyecto. Las especificaciones finales se confirman "
        "durante la revisión técnica y la cotización.",
        56,
        151,
        483,
        note_style,
    )

    pdf.setStrokeColor(SLATE_300)
    pdf.setLineWidth(0.7)
    pdf.line(42, 90, 553, 90)
    pdf.setFillColor(SLATE_500)
    pdf.setFont(FONT_REGULAR, 7.7)
    pdf.drawString(42, 73, "N Proyectos Ltda  ·  Av. Yungay 743, La Granja, Chile")
    pdf.drawString(42, 59, "ventasnproyectosltda@gmail.com  ·  +56 9 5010 7432")
    pdf.setFillColor(NAVY_MID)
    pdf.setFont(FONT_BOLD, 8.2)
    pdf.drawRightString(553, 66, "www.nproyectos.cl")
    pdf.setFillColor(SLATE_500)
    pdf.setFont(FONT_REGULAR, 6.8)
    pdf.drawRightString(553, 48, "Información técnica referencial.")

    pdf.showPage()
    pdf.save()
    return output_path


def main() -> None:
    if not Path(FONT_REGULAR_PATH).exists() or not Path(FONT_BOLD_PATH).exists():
        raise FileNotFoundError("No se encontraron las tipografías requeridas.")

    pdfmetrics.registerFont(TTFont(FONT_REGULAR, FONT_REGULAR_PATH))
    pdfmetrics.registerFont(TTFont(FONT_BOLD, FONT_BOLD_PATH))
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix="nproyectos-pdfs-") as temp:
        temp_dir = Path(temp)
        generated = [generate_pdf(product, temp_dir) for product in PRODUCTS]

    expected = {f"{product['slug']}.pdf" for product in PRODUCTS}
    for existing in OUTPUT_DIR.glob("*.pdf"):
        if existing.name not in expected:
            existing.unlink()

    print("\n".join(str(path.relative_to(ROOT)) for path in generated))


if __name__ == "__main__":
    main()
