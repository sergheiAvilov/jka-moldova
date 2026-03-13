import { Link } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useT } from '../hooks/useT.js';
import { useLang } from '../context/LangContext.jsx';
import { CAMPS } from '../data/camps.js';
import styles from './CampsPage.module.css';

export default function CampsPage() {
  const t = useT();
  const { lang } = useLang();
  const p = t.campsPage;

  return (
    <>
      <Header />
      <main id="main-content" className={styles.main}>
        <div className="container">
          <span className={styles.label}>JKA Moldova</span>
          <h1 className={styles.title}>
            {p.title1} <span className={styles.accent}>{p.title2}</span>
          </h1>

          <div className={styles.list}>
            {CAMPS.map((camp, i) => (
              <div key={camp.id} className={styles.card}>
                <div className={styles.cardSide}>
                  <span className={styles.kanji}>{camp.kanji}</span>
                  <span className={styles.num}>0{i + 1}</span>
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.campName}>{camp.name[lang] || camp.name.en}</h2>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}>
                      <span className={styles.metaLabel}>{p.dateLabel}:</span>
                      {camp.date[lang] || camp.date.en}
                    </span>
                    <span className={styles.metaItem}>
                      <span className={styles.metaLabel}>{p.locationLabel}:</span>
                      {camp.location}
                    </span>
                  </div>
                  <p className={styles.desc}>{camp.desc[lang] || camp.desc.en}</p>
                </div>
                <div className={styles.cardAction}>
                  <Link to={`/camps/${camp.id}`} className={styles.registerBtn}>
                    {p.register}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
