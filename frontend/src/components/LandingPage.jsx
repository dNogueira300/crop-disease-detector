import { Sprout, Camera, Brain, FileText, Leaf, AlertTriangle, CheckCircle, Lightbulb, ChevronDown } from 'lucide-react';

const CROPS = [
  { name: 'Tomate',     diseases: 9 },
  { name: 'Papa',       diseases: 3 },
  { name: 'Maíz',       diseases: 4 },
  { name: 'Uva',        diseases: 4 },
  { name: 'Manzana',    diseases: 4 },
  { name: 'Durazno',    diseases: 2 },
  { name: 'Pimiento',   diseases: 2 },
  { name: 'Cerezo',     diseases: 2 },
  { name: 'Naranja',    diseases: 1 },
  { name: 'Frutilla',   diseases: 2 },
  { name: 'Zapallo',    diseases: 1 },
  { name: 'Soja',       diseases: 1 },
  { name: 'Arándano',   diseases: 1 },
  { name: 'Frambuesa',  diseases: 1 },
];

const STEPS = [
  {
    icon: Camera,
    title: 'Fotografiá la hoja',
    desc: 'Tomá una foto clara de una hoja del cultivo, enfocando la zona con síntomas. Funciona con fotos del celular.',
  },
  {
    icon: Brain,
    title: 'La IA analiza la imagen',
    desc: 'El modelo MobileNetV2, entrenado con más de 54.000 imágenes del dataset PlantVillage, clasifica la hoja en segundos.',
  },
  {
    icon: FileText,
    title: 'Recibís el diagnóstico',
    desc: 'Obtenés el nombre de la enfermedad, nivel de urgencia, síntomas para confirmar y pasos de tratamiento en español.',
  },
];

const TIPS = [
  { icon: CheckCircle, text: 'Usá buena iluminación natural — evitá sombras fuertes', ok: true },
  { icon: CheckCircle, text: 'Enfocá solo una hoja, preferentemente la afectada', ok: true },
  { icon: CheckCircle, text: 'Incluí tanto el haz como el envés si hay síntomas en ambos', ok: true },
  { icon: AlertTriangle, text: 'Evitá fotos muy borrosas o con mucho zoom', ok: false },
  { icon: AlertTriangle, text: 'No uses fotos de internet — el modelo espera fotos reales', ok: false },
];

export default function LandingPage({ onDiagnosticar }) {
  return (
    <div className="landing">

      {/* ── HERO ── */}
      <section className="landing-hero">
        <div className="hero-badge animate-fade-up">
          <Leaf size={13} />
          Inteligencia Artificial Agrícola
        </div>
        <h1 className="hero-headline animate-fade-up" style={{ animationDelay: '0.08s' }}>
          Detectá enfermedades<br />en tus cultivos al instante
        </h1>
        <p className="hero-lead animate-fade-up" style={{ animationDelay: '0.16s' }}>
          Subí una foto de la hoja y la IA te dice qué enfermedad tiene,
          con qué urgencia actuar y cómo tratarla — todo en español, sin conocimientos técnicos.
        </p>
        <button
          className="hero-btn animate-fade-up"
          style={{ animationDelay: '0.24s' }}
          onClick={onDiagnosticar}
        >
          <Sprout size={18} />
          Diagnosticar ahora
          <ChevronDown size={16} style={{ opacity: 0.7 }} />
        </button>
        <div className="hero-stats animate-fade-up" style={{ animationDelay: '0.32s' }}>
          <div className="hero-stat"><strong>38</strong><span>enfermedades</span></div>
          <div className="hero-stat-sep" />
          <div className="hero-stat"><strong>14</strong><span>cultivos</span></div>
          <div className="hero-stat-sep" />
          <div className="hero-stat"><strong>54.000+</strong><span>imágenes de entrenamiento</span></div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section className="landing-section">
        <div className="section-label"><span>Proceso</span></div>
        <h2 className="section-title">¿Cómo funciona?</h2>
        <p className="section-desc">Tres pasos simples del agricultor al diagnóstico.</p>
        <div className="steps-grid">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div className="step-card animate-fade-up" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
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
        <div className="section-label"><span>Cobertura</span></div>
        <h2 className="section-title">Cultivos y enfermedades soportadas</h2>
        <p className="section-desc">
          El sistema reconoce <strong>38 condiciones distintas</strong> entre enfermedades y plantas sanas,
          abarcando los 14 cultivos más comunes de la región.
        </p>
        <div className="crops-table-grid">
          {CROPS.map((c, i) => (
            <div className="crop-row animate-fade-up" key={c.name} style={{ animationDelay: `${i * 0.03}s` }}>
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
        <div className="section-label"><span>Consejos</span></div>
        <h2 className="section-title">Para un mejor diagnóstico</h2>
        <p className="section-desc">Seguí estas recomendaciones para obtener los mejores resultados.</p>
        <div className="tips-list">
          {TIPS.map(({ icon: Icon, text, ok }, i) => (
            <div className={`tip-row animate-fade-up ${ok ? 'tip-ok' : 'tip-warn'}`} key={i} style={{ animationDelay: `${i * 0.06}s` }}>
              <Icon size={16} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="landing-cta">
        <div className="landing-cta-inner animate-scale-in">
          <Sprout size={32} style={{ marginBottom: '0.75rem', color: 'var(--green-400)' }} />
          <h2>¿Listo para diagnosticar?</h2>
          <p>Subí la foto de una hoja y obtené el resultado en segundos.</p>
          <button className="hero-btn" onClick={onDiagnosticar}>
            Ir al diagnóstico
            <ChevronDown size={16} style={{ opacity: 0.7 }} />
          </button>
        </div>
      </section>

    </div>
  );
}
