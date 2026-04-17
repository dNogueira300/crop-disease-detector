import { Leaf } from 'lucide-react';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <Leaf size={28} />
          <span>Dr. Cultivo</span>
        </div>
        <p className="header-sub">Diagnóstico de enfermedades en cultivos con IA</p>
      </div>
    </header>
  );
}
