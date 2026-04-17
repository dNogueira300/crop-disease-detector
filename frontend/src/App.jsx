import { useState, useRef } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import UploadZone from './components/UploadZone';
import LoadingOverlay from './components/LoadingOverlay';
import ResultCard from './components/ResultCard';
import { diagnosticarImagen } from './services/api';
import { AlertCircle, ExternalLink, Leaf } from 'lucide-react';
import './App.css';

export default function App() {
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const diagnosisRef = useRef(null);

  function scrollToDiagnosis() {
    diagnosisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function handleFileSelect(f) {
    setResultado(null);
    setError(null);
    setLoading(true);
    scrollToDiagnosis();
    try {
      const res = await diagnosticarImagen(f);
      setResultado(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <Header onDiagnosticar={scrollToDiagnosis} />

      {/* LANDING */}
      <LandingPage onDiagnosticar={scrollToDiagnosis} />

      {/* DIAGNOSIS SECTION */}
      <section ref={diagnosisRef} className="diagnosis-section">
        <div className="diagnosis-header">
          <Leaf size={18} color="var(--green-600)" />
          <h2>Diagnóstico</h2>
        </div>
        <div className="diagnosis-container">

          <UploadZone onFileSelect={handleFileSelect} loading={loading} />

          {loading && <LoadingOverlay />}

          {error && !loading && (
            <div className="error-msg">
              <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <div><strong>No se pudo completar el diagnóstico.</strong><br />{error}</div>
            </div>
          )}

          {resultado && !loading && <ResultCard resultado={resultado} />}

        </div>
      </section>

      <footer className="footer">
        <span className="footer-item">Dr. Cultivo</span>
        <span className="footer-dot" />
        <span className="footer-item">PlantVillage · MobileNetV2 · 38 clases</span>
        <span className="footer-dot" />
        <a
          href="https://github.com/dNogueira300/crop-disease-detector"
          target="_blank" rel="noopener noreferrer"
          className="footer-item"
          style={{ color: 'inherit', textDecoration: 'none', display: 'flex', gap: '0.3rem', alignItems: 'center' }}
        >
          <ExternalLink size={12} /> GitHub
        </a>
      </footer>
    </div>
  );
}
