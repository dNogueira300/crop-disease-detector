# 🌿 Dr. Cultivo — Detección de Enfermedades en Cultivos

Sistema de inteligencia artificial para detectar enfermedades en cultivos agrícolas
a partir de fotografías de hojas. Diseñado para agricultores: sin términos técnicos,
resultados claros con instrucciones de tratamiento.

## Modelo
- **Arquitectura:** MobileNetV2 (Transfer Learning)
- **Dataset:** PlantVillage — 54,306 imágenes · 14 cultivos · 38 clases
- **Fuente:** Hugging Face — `Daksh159/plant-disease-mobilenetv2`
- **Precisión:** ~90% en test set de PlantVillage

## Stack tecnológico
- **Inferencia:** PyTorch 2.11 + torchvision 0.26
- **API:** FastAPI
- **Interfaz:** React (Vite) + lucide-react

## Cómo ejecutar

### 1. Instalar dependencias Python (requiere Python 3.10+)
```bash
python -m venv venv
venv\Scripts\activate          # Windows
pip install -r requirements.txt
```

### 2. Descargar el modelo preentrenado (~14MB)
```bash
python model/download_model.py
```

### 3. Iniciar el sistema
```bash
venv\Scripts\activate
uvicorn src.api.main:app --reload --port 8000
```

### 4. Abrir en el navegador
```
http://localhost:8000
```

### 5. (Opcional) Desarrollo del frontend
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173 con proxy a API en :8000
npm run build      # regenera src/interface/static/
```

## Estructura del proyecto
```
crop-disease-detector/
├── model/
│   ├── download_model.py        ← descarga el modelo de Hugging Face
│   ├── class_indices.json       ← mapeo índice → clase
│   └── model_info.txt
├── src/
│   ├── api/
│   │   ├── main.py              ← API FastAPI + sirve interfaz web
│   │   └── predictor.py         ← carga modelo e inferencia
│   └── interface/static/        ← build React (generado por npm run build)
├── assets/disease_info/
│   └── diseases_es.json         ← 38 enfermedades en español
├── frontend/                    ← código fuente React (Vite)
├── requirements.txt
└── README.md
```

## API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Interfaz web |
| POST | `/diagnostico` | Recibe imagen, devuelve diagnóstico JSON |
| GET | `/docs` | Swagger UI interactivo |

### Respuesta de `/diagnostico`
```json
{
  "clase_tecnica": "Tomato___Late_blight",
  "confianza": 94.3,
  "nombre": "Tomate — Tizón tardío",
  "cultivo": "Tomate",
  "estado": "enfermo",
  "urgencia": "alta",
  "descripcion": "...",
  "sintomas": ["..."],
  "tratamiento": ["..."]
}
```
