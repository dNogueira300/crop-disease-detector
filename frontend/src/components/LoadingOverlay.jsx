import { useEffect, useState } from 'react';
import { Check, ScanSearch } from 'lucide-react';

const STEPS = [
  'Preparando imagen',
  'Ejecutando modelo IA',
  'Procesando resultados',
];

export default function LoadingOverlay() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 900);
    const t2 = setTimeout(() => setStep(2), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const progress = step === 0 ? 22 : step === 1 ? 60 : 88;

  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div className="loading-spinner-inner">
          <ScanSearch size={20} color="var(--green-600)" />
        </div>
      </div>
      <p className="loading-title">Analizando imagen...</p>
      <p className="loading-subtitle">El modelo está procesando tu foto</p>

      <div className="loading-steps">
        {STEPS.map((label, i) => {
          const state = i < step ? 'done' : i === step ? 'active' : 'pending';
          return (
            <div key={i} className={`step-row ${state}`}>
              <div className="step-icon">
                {state === 'done'   ? <Check size={12} strokeWidth={3} /> :
                 state === 'active' ? <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'white', display: 'block' }} /> :
                                      <span>{i + 1}</span>}
              </div>
              {label}
            </div>
          );
        })}
      </div>

      <div className="step-bar" style={{ marginTop: '1.25rem' }}>
        <div className="step-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
