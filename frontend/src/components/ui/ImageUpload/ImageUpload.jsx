import { useRef, useState } from 'react';
import { apiClient } from '../../../api/client.js';
import styles from './ImageUpload.module.css';

/**
 * ImageUpload
 * Props:
 *   value    – current image URL (string)
 *   onChange – called with new URL string after upload or manual input
 *   label    – optional label text (default "Фото")
 */
export default function ImageUpload({ value, onChange, label = 'Фото' }) {
  const inputRef   = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  async function uploadFile(file) {
    if (!file) return;
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await apiClient.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange(res.data.url);
    } catch (e) {
      setError(e.response?.data?.error || 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  }

  function onFileInput(e) {
    uploadFile(e.target.files[0]);
    e.target.value = '';
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  }

  function onUrlChange(e) {
    onChange(e.target.value);
    setError('');
  }

  const preview = value && (value.startsWith('/uploads') || value.startsWith('http'));

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>{label}</span>

      {/* Drop zone */}
      <div
        className={`${styles.dropzone} ${dragging ? styles.dragover : ''} ${loading ? styles.loading : ''}`}
        onClick={() => !loading && inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
      >
        {loading ? (
          <span className={styles.spinner}>↻ Загрузка…</span>
        ) : preview ? (
          <img src={value} alt="preview" className={styles.preview} />
        ) : (
          <span className={styles.placeholder}>
            <span className={styles.icon}>↑</span>
            Перетащи или нажми для выбора
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className={styles.hidden}
          onChange={onFileInput}
        />
      </div>

      {/* Manual URL fallback */}
      <input
        type="text"
        className={styles.urlInput}
        placeholder="или вставь URL"
        value={value}
        onChange={onUrlChange}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
