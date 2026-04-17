import { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, AlertCircle, Stethoscope, Pill, Info } from 'lucide-react';

const URGENCIA_CONFIG = {
  ninguna: { icon: CheckCircle, label: '¡Planta sana!',  cls: 'sano' },
  media:   { icon: AlertTriangle, label: 'Urgencia media', cls: 'media' },
  alta:    { icon: AlertCircle,  label: 'Urgencia alta',  cls: 'alta' },
};

export default function ResultCard({ resultado }) {
  const [barWidth, setBarWidth] = useState(0);
  const { icon: Icon, label, cls } = URGENCIA_CONFIG[resultado.urgencia] || URGENCIA_CONFIG.media;

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(resultado.confianza), 200);
    return () => clearTimeout(t);
  }, [resultado.confianza]);

  return (
    <div className={`result-card urgencia-${cls}`}>

      {/* BANNER */}
      <div className="result-banner">
        <div className="result-banner-top">
          <div className="result-banner-icon"><Icon size={24} /></div>
          <div style={{ flex: 1 }}>
            <p className="result-banner-name">{resultado.nombre}</p>
            <p className="result-banner-crop">Cultivo: {resultado.cultivo}</p>
          </div>
          <span className="result-badge">{label}</span>
        </div>

        <div className="confidence-section">
          <div className="confidence-label">
            <span>Confianza del modelo</span>
            <strong>{resultado.confianza}%</strong>
          </div>
          <div className="confidence-track">
            <div className="confidence-fill" style={{ width: `${barWidth}%` }} />
          </div>
        </div>
      </div>

      {/* DESCRIPCIÓN */}
      <p className="result-desc">{resultado.descripcion}</p>

      {/* SÍNTOMAS + TRATAMIENTO */}
      <div className="result-sections">
        {resultado.sintomas.length > 0 && (
          <div className="result-section">
            <h3><Stethoscope size={13} /> Síntomas</h3>
            <ul>
              {resultado.sintomas.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}
        {resultado.tratamiento.length > 0 && (
          <div className="result-section">
            <h3><Pill size={13} /> Tratamiento</h3>
            <ul>
              {resultado.tratamiento.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* META */}
      <div className="result-meta">
        <Info size={12} />
        <span>Clase técnica:</span>
        <span className="meta-tag">{resultado.clase_tecnica}</span>
        <span style={{ marginLeft: 'auto', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          Modelo: <span className="meta-tag">MobileNetV2</span>
        </span>
      </div>
    </div>
  );
}
