import { useState } from 'react';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import ResultCard from './components/ResultCard';
import { diagnosticarImagen } from './services/api';
import { ScanSearch } from 'lucide-react';
import './App.css';

export default function App() {
  const [file, setFile] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFileSelect(f) {
    setFile(f);
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
          <UploadZone onFileSelect={handleFileSelect} loading={loading} />

          {loading && (
            <div className="analyzing">
              <ScanSearch size={36} className="spin" />
              <p>Analizando imagen con IA...</p>
            </div>
          )}

          {error && (
            <div className="error-msg">
              <strong>Error:</strong> {error}
            </div>
          )}

          {resultado && !loading && <ResultCard resultado={resultado} />}
        </div>
      </main>
      <footer className="footer">
        <p>Dr. Cultivo · PlantVillage + MobileNetV2 · 38 clases · ~90% precisión</p>
      </footer>
    </div>
  );
}
