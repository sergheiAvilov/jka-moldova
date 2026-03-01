import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './News.module.css';
import { apiClient } from '../../api/client.js';
import { useT } from '../../hooks/useT.js';

export default function News() {
  const [news, setNews] = useState([]);
  const t = useT();
  const n = t.news;

  useEffect(() => {
    apiClient.get('/news').then((res) => setNews(res.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={styles.label}><span className={styles.line} />{n.label}</div>
            <h2 className={styles.title}>
              <span className={styles.jp}>ニュース</span>
              {n.title1}<br />{n.title2}
            </h2>
          </div>
          <Link to="/news" className={styles.more}>{n.all} →</Link>
        </div>

        {news.length === 0 ? (
          <p className={styles.empty}>{n.empty}</p>
        ) : (
          <div className={styles.grid}>
            {news.map((item) => (
              <article key={item.id} className={styles.card}>
                <div
                  className={styles.cardImage}
                  style={item.image ? {
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  } : {}}
                />
                <div className={styles.cardBody}>
                  <span className={styles.cardDate}>
                    {new Date(item.published_at).toLocaleDateString('ru-RU')}
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardExcerpt}>
                    {item.content.length > 120 ? item.content.slice(0, 120) + '...' : item.content}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
