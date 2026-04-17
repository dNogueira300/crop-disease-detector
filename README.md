# 🌿 Dr. Cultivo — Detección de Enfermedades en Cultivos

Sistema de inteligencia artificial para detectar enfermedades en cultivos agrícolas
a partir de fotografías de hojas. Diseñado para agricultores: sin términos técnicos,
resultados claros con instrucciones de tratamiento.

## Modelo
- **Arquitectura:** MobileNetV2 (Transfer Learning)
- **Dataset:** PlantVillage — 54,306 imágenes · 14 cultivos · 38 clases
- **Fuente del modelo:** Hugging Face — `Daksh159/plant-disease-mobilenetv2`
- **Precisión:** ~90% en test set de PlantVillage

## Stack tecnológico
- **Inferencia:** PyTorch + torchvision
- **API:** FastAPI
- **Interfaz:** React (Vite) + lucide-react

## Cómo ejecutar

### 1. Instalar dependencias
```bash
pip install -r requirements.txt
```

### 2. Descargar el modelo preentrenado
```bash
python model/download_model.py
```

### 3. Iniciar el sistema
```bash
uvicorn src.api.main:app --reload --port 8000
```

### 4. Abrir en el navegador
```
http://localhost:8000
```

## Estructura del proyecto
```
crop-disease-detector/
├── model/                      # Modelo y metadatos
├── src/api/                    # Backend FastAPI
├── src/interface/              # Interfaz web (build de React)
├── assets/disease_info/        # Diccionario de enfermedades en español
├── frontend/                   # Código fuente React (Vite)
├── requirements.txt
└── README.md
```

## Estado del proyecto
🔧 En desarrollo
