import torch
import torchvision.models as models
from torchvision import transforms
from PIL import Image
import json, io, os

BASE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_PATH   = os.path.join(BASE, "model", "mobilenetv2_plant.pth")
INDICES_PATH = os.path.join(BASE, "model", "class_indices.json")

TRANSFORM = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

def _cargar_modelo():
    modelo = models.mobilenet_v2(weights=None)
    modelo.classifier[1] = torch.nn.Sequential(
        torch.nn.Dropout(0.2),
        torch.nn.Linear(modelo.classifier[1].in_features, 38)
    )
    estado = torch.load(MODEL_PATH, map_location=torch.device("cpu"), weights_only=False)
    modelo.load_state_dict(estado)
    modelo.eval()
    return modelo

MODELO = _cargar_modelo()
with open(INDICES_PATH, encoding="utf-8") as f:
    IDX2CLASE = json.load(f)

def predecir(imagen_bytes: bytes) -> dict:
    img = Image.open(io.BytesIO(imagen_bytes)).convert("RGB")
    tensor = TRANSFORM(img).unsqueeze(0)
    with torch.no_grad():
        salida = MODELO(tensor)
        probs = torch.nn.functional.softmax(salida, dim=1)[0]
    idx = int(torch.argmax(probs).item())
    confianza = float(probs[idx].item())
    clase = IDX2CLASE[str(idx)]
    return {"clase": clase, "confianza": round(confianza * 100, 1)}
