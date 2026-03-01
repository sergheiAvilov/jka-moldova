import { useEffect, useRef, useState } from 'react';
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
  const a = t.a11y;
  const [photos, setPhotos] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const lightboxRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    apiClient.get('/gallery').then((r) => setPhotos(r.data)).catch(() => {});
  }, []);

  // Lightbox: auto-focus + Escape key
  useEffect(() => {
    if (!lightbox) return;
    requestAnimationFrame(() => {
      lightboxRef.current?.querySelector('button')?.focus();
    });
    const handleKeyDown = (e) => { if (e.key === 'Escape') closeLightbox(); };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]); // eslint-disable-line react-hooks/exhaustive-deps

  const openLightbox = (photo, el) => {
    triggerRef.current = el;
    setLightbox(photo);
  };

  const closeLightbox = () => {
    setLightbox(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const hasPhotos = photos.length > 0;

  return (
    <section id="gallery" className={styles.section}>
      <div className="container">
        <div className={styles.label}>
          <span className={styles.line} aria-hidden="true" />{g.label}
        </div>
        <h2 className={styles.title}>
          <span className={styles.jp} aria-hidden="true">写真</span>
          {g.title1}<br />{g.title2}
        </h2>

        <div className={styles.grid}>
          {hasPhotos ? photos.map((photo, i) => (
            <div
              key={photo.id}
              className={`${styles.item} ${i === 0 ? styles.span : ''}`}
              onClick={(e) => openLightbox(photo, e.currentTarget)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(photo, e.currentTarget);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={photo.caption || a.viewPhoto}
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
              <span className={styles.kanji} aria-hidden="true">{item.kanji}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          ref={lightboxRef}
          className={styles.lightbox}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={a.lightboxTitle}
        >
          <button
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label={a.closePhoto}
          >
            ✕
          </button>
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
