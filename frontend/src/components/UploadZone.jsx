import { useState, useRef } from 'react';
import { ImagePlus, RefreshCw, Microscope } from 'lucide-react';

export default function UploadZone({ onFileSelect, loading }) {
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    setPreview(URL.createObjectURL(file));
    onFileSelect(file);
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div className="upload-section">
      <div
        className={`drop-zone ${dragging ? 'dragging' : ''} ${preview ? 'has-preview' : ''}`}
        onClick={() => !loading && inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files[0])} />
        {preview ? (
          <img src={preview} alt="Vista previa" className="preview-img" />
        ) : (
          <div className="drop-placeholder">
            <div className="drop-icon-wrap">
              <ImagePlus size={30} strokeWidth={1.5} />
            </div>
            <h3>Sube la foto de una hoja</h3>
            <p>Arrastra la imagen aquí o haz clic para seleccionar</p>
            <span className="drop-hint">JPG · PNG · WEBP · hasta 10 MB</span>
          </div>
        )}
      </div>

      {preview && !loading && (
        <div className="upload-actions">
          <button className="btn-primary" onClick={() => inputRef.current.click()} disabled={loading}>
            <Microscope size={17} />
            Diagnosticar de nuevo
          </button>
          <button className="btn-secondary" onClick={() => { setPreview(null); inputRef.current.click(); }}>
            <RefreshCw size={16} />
            Nueva imagen
          </button>
        </div>
      )}

      {!preview && (
        <button className="btn-primary" onClick={() => inputRef.current.click()} disabled={loading}>
          <ImagePlus size={17} />
          Seleccionar imagen
        </button>
      )}
    </div>
  );
}
