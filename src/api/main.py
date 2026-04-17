from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import json, os

BASE      = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DICT_PATH = os.path.join(BASE, "assets", "disease_info", "diseases_es.json")
STATIC    = os.path.join(BASE, "src", "interface", "static")

app = FastAPI(title="Dr. Cultivo API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

with open(DICT_PATH, encoding="utf-8") as f:
    DISEASES = json.load(f)

@app.get("/")
def index():
    index_path = os.path.join(STATIC, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path)
    return {"message": "API Dr. Cultivo. Ejecuta 'npm run build' en /frontend para activar la interfaz."}

@app.get("/favicon.svg")
def favicon():
    return FileResponse(os.path.join(STATIC, "favicon.svg"))

@app.get("/icons.svg")
def icons():
    return FileResponse(os.path.join(STATIC, "icons.svg"))

@app.post("/diagnostico")
async def diagnosticar(imagen: UploadFile = File(...)):
    if not imagen.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="El archivo debe ser una imagen.")
    from src.api.predictor import predecir
    contenido = await imagen.read()
    resultado = predecir(contenido)
    clase_raw = resultado["clase"]
    confianza = resultado["confianza"]
    info = DISEASES.get(clase_raw, {
        "nombre": clase_raw, "cultivo": "Desconocido", "estado": "desconocido",
        "urgencia": "media", "descripcion": "Sin información disponible.",
        "sintomas": [], "tratamiento": []
    })
    return {
        "clase_tecnica": clase_raw,
        "confianza": confianza,
        "nombre": info["nombre"],
        "cultivo": info["cultivo"],
        "estado": info["estado"],
        "urgencia": info["urgencia"],
        "descripcion": info["descripcion"],
        "sintomas": info["sintomas"],
        "tratamiento": info["tratamiento"]
    }

# Montar /assets al final (después de todas las rutas de API)
if os.path.isdir(os.path.join(STATIC, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(STATIC, "assets")), name="assets")
