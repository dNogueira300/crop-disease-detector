import { Sprout, Camera, Brain, FileText, Leaf, AlertTriangle, CheckCircle, ChevronDown } from 'lucide-react';

const CROPS = [
  { name: 'Tomate',    diseases: 9 },
  { name: 'Papa',      diseases: 3 },
  { name: 'Maíz',      diseases: 4 },
  { name: 'Uva',       diseases: 4 },
  { name: 'Manzana',   diseases: 4 },
  { name: 'Durazno',   diseases: 2 },
  { name: 'Pimiento',  diseases: 2 },
  { name: 'Cerezo',    diseases: 2 },
  { name: 'Naranja',   diseases: 1 },
  { name: 'Frutilla',  diseases: 2 },
  { name: 'Zapallo',   diseases: 1 },
  { name: 'Soja',      diseases: 1 },
  { name: 'Arándano',  diseases: 1 },
  { name: 'Frambuesa', diseases: 1 },
];

const STEPS = [
  {
    icon: Camera,
    title: 'Fotografía la hoja',
    desc: 'Toma una foto clara de una hoja del cultivo, enfocando la zona con síntomas. Funciona con fotos del celular.',
  },
  {
    icon: Brain,
    title: 'La IA analiza la imagen',
    desc: 'El modelo MobileNetV2, entrenado con más de 54.000 imágenes del dataset PlantVillage, clasifica la hoja en segundos.',
  },
  {
    icon: FileText,
    title: 'Recibe el diagnóstico',
    desc: 'Obtienes el nombre de la enfermedad, nivel de urgencia, síntomas para confirmar y pasos de tratamiento en español.',
  },
];

const TIPS = [
  { icon: CheckCircle, text: 'Usa buena iluminación natural — evita sombras fuertes', ok: true },
  { icon: CheckCircle, text: 'Enfoca solo una hoja, preferentemente la afectada', ok: true },
  { icon: CheckCircle, text: 'Incluye tanto el haz como el envés si hay síntomas en ambos', ok: true },
  { icon: AlertTriangle, text: 'Evita fotos muy borrosas o con demasiado zoom', ok: false },
  { icon: AlertTriangle, text: 'No uses fotos de internet — el modelo espera fotos reales de campo', ok: false },
];

export default function LandingPage({ onDiagnosticar }) {
  return (
    <div className="landing">

      {/* ── HERO ── */}
      <section className="landing-hero">
        <div className="hero-badge">
          <Leaf size={13} />
          Inteligencia Artificial Agrícola
        </div>
        <h1 className="hero-headline">
          Detecta enfermedades<br />en tus cultivos al instante
        </h1>
        <p className="hero-lead">
          Sube una foto de la hoja y la IA te indica qué enfermedad tiene,
          con qué urgencia actuar y cómo tratarla — en español, sin conocimientos técnicos.
        </p>
        <button className="hero-btn" onClick={onDiagnosticar}>
          <Sprout size={18} />
          Iniciar diagnóstico
          <ChevronDown size={16} className="bounce-icon" />
        </button>
        <div className="hero-stats">
          <div className="hero-stat"><strong>38</strong><span>enfermedades</span></div>
          <div className="hero-stat-sep" />
          <div className="hero-stat"><strong>14</strong><span>cultivos</span></div>
          <div className="hero-stat-sep" />
          <div className="hero-stat"><strong>54.000+</strong><span>imágenes de entrenamiento</span></div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="landing-section">
        <div className="section-label reveal"><span>Proceso</span></div>
        <h2 className="section-title reveal" style={{ '--delay': '0.05s' }}>¿Cómo funciona?</h2>
        <p className="section-desc reveal" style={{ '--delay': '0.1s' }}>Tres pasos simples: de la fotografía al diagnóstico.</p>
        <div className="steps-grid">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div className="step-card reveal" key={i} style={{ '--delay': `${0.1 + i * 0.12}s` }}>
              <div className="step-number">{i + 1}</div>
              <div className="step-card-icon"><Icon size={22} strokeWidth={1.8} /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CULTIVOS ── */}
      <section className="landing-section landing-section--alt">
        <div className="section-label reveal"><span>Cobertura</span></div>
        <h2 className="section-title reveal" style={{ '--delay': '0.05s' }}>Cultivos y enfermedades detectadas</h2>
        <p className="section-desc reveal" style={{ '--delay': '0.1s' }}>
          El sistema reconoce <strong>38 condiciones distintas</strong> entre enfermedades y plantas sanas,
          en los 14 cultivos más comunes.
        </p>
        <div className="crops-table-grid">
          {CROPS.map((c, i) => (
            <div className="crop-row reveal" key={c.name} style={{ '--delay': `${i * 0.04}s` }}>
              <div className="crop-row-dot" />
              <span className="crop-row-name">{c.name}</span>
              <span className="crop-row-tag">
                {c.diseases} {c.diseases === 1 ? 'condición' : 'condiciones'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONSEJOS ── */}
      <section className="landing-section">
        <div className="section-label reveal"><span>Consejos</span></div>
        <h2 className="section-title reveal" style={{ '--delay': '0.05s' }}>Para obtener el mejor diagnóstico</h2>
        <p className="section-desc reveal" style={{ '--delay': '0.1s' }}>Sigue estas recomendaciones para mejores resultados.</p>
        <div className="tips-list">
          {TIPS.map(({ icon: Icon, text, ok }, i) => (
            <div className={`tip-row reveal ${ok ? 'tip-ok' : 'tip-warn'}`} key={i} style={{ '--delay': `${i * 0.07}s` }}>
              <Icon size={16} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="landing-cta">
        <div className="landing-cta-inner reveal">
          <Sprout size={32} style={{ marginBottom: '0.75rem', color: 'var(--green-400)' }} />
          <h2>¿Listo para diagnosticar?</h2>
          <p>Sube la foto de una hoja y obtén el resultado en segundos.</p>
          <button className="hero-btn" onClick={onDiagnosticar}>
            Ir al diagnóstico
            <ChevronDown size={16} className="bounce-icon" />
          </button>
        </div>
      </section>

    </div>
  );
}
