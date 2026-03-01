import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client.js';
import ImageUpload from '../../components/ui/ImageUpload/ImageUpload.jsx';
import styles from './AdminTable.module.css';
import galleryStyles from './AdminGallery.module.css';

const emptyForm = { url: '', caption: '' };

export default function AdminGallery() {
  const [photos, setPhotos] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

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
    if (!confirm('Удалить фото?')) return;
    await apiClient.delete(`/gallery/${id}`);
    load();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Галерея</h1>
          <p className={styles.pageCount}>{photos.length} фото в базе</p>
        </div>
      </div>

      {/* Add photo form */}
      <div className={styles.card}>
        <h2 className={styles.formTitle}>— Добавить фото</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.field} ${styles.formFull}`}>
              <ImageUpload
                label="Фотография"
                value={form.url}
                onChange={(url) => setForm((f) => ({ ...f, url }))}
              />
            </div>
            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>Подпись (необязательно)</label>
              <input
                className={styles.input}
                placeholder="Например: Соревнования 2024"
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
              />
            </div>
          </div>
          <div className={styles.formActions}>
            <button className={styles.btnPrimary} type="submit" disabled={loading}>
              {loading ? 'Добавление...' : 'Добавить фото'}
            </button>
            {form.url && (
              <button
                className={styles.btnSecondary}
                type="button"
                onClick={() => setForm(emptyForm)}
              >
                Очистить
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
                  title="Удалить"
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
            Фотографий пока нет. Добавьте первое фото выше.
          </p>
        </div>
      )}
    </div>
  );
}
