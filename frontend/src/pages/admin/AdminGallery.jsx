import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client.js';
import { useT } from '../../hooks/useT.js';
import ImageUpload from '../../components/ui/ImageUpload/ImageUpload.jsx';
import styles from './AdminTable.module.css';
import galleryStyles from './AdminGallery.module.css';

const emptyForm = { url: '', caption: '' };

export default function AdminGallery() {
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const t = useT();
  const a = t.admin.gallery;
  const c = t.admin.common;

  const load = () => apiClient.get('/gallery').then((r) => setPhotos(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.url) return;
    setLoading(true);
    try {
      await apiClient.post('/gallery', form);
      setForm(emptyForm);
      load();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(a.confirmDelete)) return;
    await apiClient.delete(`/gallery/${id}`);
    load();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{a.title}</h1>
          <p className={styles.pageCount}>{photos.length} {a.photoCount}</p>
        </div>
      </div>

      {/* Add photo form */}
      <div className={styles.card}>
        <h2 className={styles.formTitle}>{a.addTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.field} ${styles.formFull}`}>
              <ImageUpload
                label={a.photoLabel}
                value={form.url}
                onChange={(url) => setForm((f) => ({ ...f, url }))}
              />
            </div>
            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>{a.captionLabel}</label>
              <input
                className={styles.input}
                placeholder={a.captionPlaceholder}
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.formActions}>
            <button className={styles.btnPrimary} type="submit" disabled={loading}>
              {loading ? a.addingBtn : a.addBtn}
            </button>
            {form.url && (
              <button
                className={styles.btnSecondary}
                type="button"
                onClick={() => setForm(emptyForm)}
              >
                {a.clearBtn}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Photo grid */}
      {photos.length > 0 ? (
        <div className={galleryStyles.grid}>
          {photos.map((photo) => (
            <div key={photo.id} className={galleryStyles.item}>
              <img
                src={photo.url}
                alt={photo.caption || ''}
                className={galleryStyles.img}
                onError={(e) => { e.target.src = ''; e.target.style.display = 'none'; }}
              />
              <div className={galleryStyles.overlay}>
                {photo.caption && (
                  <span className={galleryStyles.caption}>{photo.caption}</span>
                )}
                <span className={galleryStyles.date}>
                  {new Date(photo.created_at).toLocaleDateString('ru-RU')}
                </span>
                <button
                  className={galleryStyles.deleteBtn}
                  onClick={() => handleDelete(photo.id)}
                  title={c.delete}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <p className={styles.empty} style={{ padding: '48px', textAlign: 'center' }}>
            {a.empty}
          </p>
        </div>
      )}
    </div>
  );
}
