import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useApi } from '../hooks/useApi.js';
import styles from './NewsPage.module.css';
import { useT } from '../hooks/useT.js';

export default function NewsPage() {
  const { data: news, loading, error } = useApi('/news');
  const t = useT();
  const n = t.news;

  return (
    <>
      <Header />
      <main className={styles.main} style={{ paddingTop: 120 }}>
        <div className="container">
          <h1 className={styles.title}>{n.title1} {n.title2}</h1>
          {loading && <p className={styles.state}>…</p>}
          {error && <p className={styles.state}>!</p>}
          {news && (
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
                    <h2 className={styles.cardTitle}>{item.title}</h2>
                    <p className={styles.cardContent}>{item.content}</p>
                  </div>
                </article>
              ))}
              {news.length === 0 && <p className={styles.state}>{n.empty}</p>}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
