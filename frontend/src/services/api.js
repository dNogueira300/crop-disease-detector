const API_URL = import.meta.env.DEV ? '' : '';

export async function diagnosticarImagen(file) {
  const formData = new FormData();
  formData.append("imagen", file);
  const res = await fetch(`${API_URL}/diagnostico`, { method: "POST", body: formData });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Error en el diagnóstico");
  }
  return res.json();
}
