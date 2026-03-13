import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useT } from '../hooks/useT.js';
import { useLang } from '../context/LangContext.jsx';
import { CAMPS } from '../data/camps.js';
import styles from './CampDetailPage.module.css';

export default function CampDetailPage() {
  const { id } = useParams();
  const t = useT();
  const { lang } = useLang();
  const p = t.campDetailPage;

  const camp = CAMPS.find((c) => c.id === parseInt(id));

  if (!camp) {
    return (
      <>
        <Header />
        <main id="main-content" className={styles.main}>
          <div className="container">
            <p className={styles.notFound}>{p.notFound}</p>
            <Link to="/camps" className={styles.back}>{p.back}</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const registrationHref = camp.registrationUrl
    ? camp.registrationUrl
    : `mailto:info@jkamoldova.md?subject=${encodeURIComponent(camp.name.ro)}`;

  return (
    <>
      <Header />
      <main id="main-content" className={styles.main}>
        <div className="container">
          <Link to="/camps" className={styles.back}>{p.back}</Link>

          <div className={styles.hero}>
            <span className={styles.kanji} aria-hidden="true">{camp.kanji}</span>
            <div className={styles.heroText}>
              <span className={styles.label}>JKA Moldova</span>
              <h1 className={styles.title}>{camp.name[lang] || camp.name.en}</h1>
              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <span className={styles.metaLabel}>{p.dateLabel}:</span>
                  {camp.date[lang] || camp.date.en}
                </span>
                <span className={styles.metaSep} aria-hidden="true">·</span>
                <span className={styles.metaItem}>
                  <span className={styles.metaLabel}>{p.locationLabel}:</span>
                  {camp.location}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.body}>
            <p className={styles.desc}>{camp.fullDesc[lang] || camp.fullDesc.en}</p>
          </div>

          <div className={styles.register}>
            <h2 className={styles.registerTitle}>{p.registerTitle}</h2>
            <p className={styles.registerNote}>{p.registerNote}</p>
            <a
              href={registrationHref}
              target={camp.registrationUrl ? '_blank' : undefined}
              rel={camp.registrationUrl ? 'noopener noreferrer' : undefined}
              className={styles.registerBtn}
            >
              {p.registerBtn}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
