import { Leaf } from 'lucide-react';

export default function Header({ onDiagnosticar }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-icon">
            <Leaf size={20} color="white" />
          </div>
          <div>
            <span className="header-title">Dr. Cultivo</span>
            <p className="header-sub">Diagnóstico de enfermedades en cultivos con IA</p>
          </div>
        </div>
        <button className="header-cta" onClick={onDiagnosticar}>
          Iniciar diagnóstico
        </button>
      </div>
    </header>
  );
}
