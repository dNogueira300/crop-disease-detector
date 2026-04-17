import { useState, useRef } from 'react';
import { Upload, ImageIcon } from 'lucide-react';

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
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {preview ? (
          <img src={preview} alt="Vista previa" className="preview-img" />
        ) : (
          <div className="drop-placeholder">
            <ImageIcon size={48} strokeWidth={1.2} />
            <p>Arrastrá una foto de hoja o hacé clic para seleccionar</p>
            <span>JPG, PNG, WEBP · Máximo 10MB</span>
          </div>
        )}
      </div>
      {preview && (
        <button
          className={`btn-diagnosticar ${loading ? 'loading' : ''}`}
          onClick={() => inputRef.current.click()}
          disabled={loading}
        >
          <Upload size={16} />
          {loading ? 'Analizando...' : 'Cambiar imagen'}
        </button>
      )}
    </div>
  );
}
