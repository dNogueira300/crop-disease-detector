import { Leaf, ShieldCheck, Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <div className="header-brand">
          <div className="header-icon">
            <Leaf size={22} color="white" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="header-title">Dr. Cultivo</span>
              <span className="header-version">IA</span>
            </div>
            <p className="header-sub">Diagnóstico de enfermedades en cultivos</p>
          </div>
        </div>
        <div className="header-badge">
          <ShieldCheck size={13} />
          ~90% precisión
        </div>
      </div>
      <div className="header-stats">
        <div className="stat-item">
          <span className="stat-num">38</span>
          <span className="stat-label">Enfermedades</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">14</span>
          <span className="stat-label">Cultivos</span>
        </div>
        <div className="stat-item">
          <span className="stat-num">54K</span>
          <span className="stat-label">Imágenes entrenadas</span>
        </div>
        <div className="stat-item">
          <span className="stat-num" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <Zap size={16} style={{ color: '#86efac' }} /> CPU
          </span>
          <span className="stat-label">Sin GPU requerida</span>
        </div>
      </div>
    </header>
  );
}
