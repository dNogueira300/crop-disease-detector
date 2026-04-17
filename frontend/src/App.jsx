import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import UploadZone from './components/UploadZone';
import LoadingOverlay from './components/LoadingOverlay';
import ResultCard from './components/ResultCard';
import { diagnosticarImagen } from './services/api';
import { AlertCircle, ExternalLink } from 'lucide-react';
import './App.css';

export default function App() {
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFileSelect(f) {
    setResultado(null);
    setError(null);
    setLoading(true);
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
      <Header />

      <main className="main">
        <div className="container">

          {!resultado && !loading && <HeroSection />}

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
      </main>

      <footer className="footer">
        <span className="footer-item">Dr. Cultivo</span>
        <span className="footer-dot" />
        <span className="footer-item">PlantVillage · MobileNetV2</span>
        <span className="footer-dot" />
        <span className="footer-item">38 clases · ~90% precisión</span>
        <span className="footer-dot" />
        <a
          href="https://github.com/dNogueira300/crop-disease-detector"
          target="_blank" rel="noopener noreferrer"
          className="footer-item"
          style={{ color: 'inherit', textDecoration: 'none', display: 'flex', gap: '0.3rem', alignItems: 'center' }}
        >
          <ExternalLink size={13} /> GitHub
        </a>
      </footer>
    </div>
  );
}
