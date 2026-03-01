import { useEffect, useState } from 'react';
import styles from './Gallery.module.css';
import { useT } from '../../hooks/useT.js';
import { apiClient } from '../../api/client.js';

const PLACEHOLDERS = [
  { kanji: '道場', span: true },
  { kanji: '型' },
  { kanji: '組' },
  { kanji: '帯' },
  { kanji: '杯' },
];

export default function Gallery() {
  const t = useT();
  const g = t.gallery;
  const [photos, setPhotos] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    apiClient.get('/gallery').then((r) => setPhotos(r.data)).catch(() => {});
  }, []);

  const hasPhotos = photos.length > 0;

  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <div className={styles.label}><span className={styles.line} />{g.label}</div>
        <h2 className={styles.title}>
          <span className={styles.jp}>写真</span>
          {g.title1}<br />{g.title2}
        </h2>

        <div className={styles.grid}>
          {hasPhotos ? photos.map((photo, i) => (
            <div
              key={photo.id}
              className={`${styles.item} ${i === 0 ? styles.span : ''}`}
              onClick={() => setLightbox(photo)}
              style={{
                backgroundImage: `url(${photo.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {photo.caption && (
                <span className={styles.itemLabel}>{photo.caption}</span>
              )}
            </div>
          )) : PLACEHOLDERS.map((item, i) => (
            <div key={i} className={`${styles.item} ${item.span ? styles.span : ''}`}>
              <span className={styles.kanji}>{item.kanji}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <button className={styles.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
          <img
            src={lightbox.url}
            alt={lightbox.caption || ''}
            className={styles.lightboxImg}
            onClick={(e) => e.stopPropagation()}
          />
          {lightbox.caption && (
            <p className={styles.lightboxCaption}>{lightbox.caption}</p>
          )}
        </div>
      )}
    </section>
  );
}
