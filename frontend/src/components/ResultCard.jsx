import { CheckCircle, AlertTriangle, AlertCircle, Info, Stethoscope, Pill } from 'lucide-react';

const URGENCIA_CONFIG = {
  ninguna: { icon: CheckCircle, label: 'Planta sana', cls: 'sano' },
  media:   { icon: AlertTriangle, label: 'Urgencia media', cls: 'media' },
  alta:    { icon: AlertCircle, label: 'Urgencia alta', cls: 'alta' },
};

export default function ResultCard({ resultado }) {
  const { icon: Icon, label, cls } = URGENCIA_CONFIG[resultado.urgencia] || URGENCIA_CONFIG.media;

  return (
    <div className={`result-card urgencia-${cls}`}>
      <div className="result-header">
        <Icon size={32} />
        <div>
          <h2>{resultado.nombre}</h2>
          <span className={`badge badge-${cls}`}>{label}</span>
        </div>
        <div className="confianza">
          <span>{resultado.confianza}%</span>
          <small>confianza</small>
        </div>
      </div>

      <p className="result-desc">{resultado.descripcion}</p>

      {resultado.sintomas.length > 0 && (
        <div className="result-section">
          <h3><Stethoscope size={16} /> Síntomas observados</h3>
          <ul>
            {resultado.sintomas.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      {resultado.tratamiento.length > 0 && (
        <div className="result-section">
          <h3><Pill size={16} /> Tratamiento recomendado</h3>
          <ul>
            {resultado.tratamiento.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
      )}

      <div className="result-meta">
        <Info size={12} />
        <span>Cultivo detectado: <strong>{resultado.cultivo}</strong> · Clase técnica: {resultado.clase_tecnica}</span>
      </div>
    </div>
  );
}
