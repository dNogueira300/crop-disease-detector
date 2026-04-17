import { Sprout } from 'lucide-react';

const CROPS = [
  'Manzana', 'Arándano', 'Cerezo', 'Maíz', 'Uva', 'Naranja',
  'Durazno', 'Pimiento', 'Papa', 'Frambuesa', 'Soja', 'Zapallo',
  'Frutilla', 'Tomate',
];

export default function HeroSection() {
  return (
    <div className="hero-section">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
        <Sprout size={18} color="var(--green-600)" />
        <h2 className="hero-title">¿Cómo funciona?</h2>
      </div>
      <p className="hero-desc">
        Fotografiá una hoja de tu cultivo y la IA detecta automáticamente si tiene alguna
        enfermedad. Obtenés el diagnóstico en segundos con síntomas, nivel de urgencia
        y pasos de tratamiento en español.
      </p>
      <p style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.6rem' }}>
        Cultivos soportados
      </p>
      <div className="crops-grid">
        {CROPS.map((c, i) => (
          <div className="crop-chip" key={c} style={{ animationDelay: `${i * 0.04}s` }}>
            <span className="dot" />
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
