import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useT } from '../hooks/useT.js';
import styles from './ClubMembershipPage.module.css';

// ─── Заполните данные клубов ──────────────────────────────────────────────────
// logo: путь к изображению (например '/clubs/logo-dojo-central.png')
// url:  сайт клуба (откроется в новой вкладке)
const CLUBS = [
  {
    name: 'Dojo Central',
    logo: null,
    url: '#',
  },
  {
    name: 'Dojo Botanica',
    logo: null,
    url: '#',
  },
  {
    name: 'Dojo Bălți',
    logo: null,
    url: '#',
  },
  {
    name: 'Dojo Cahul',
    logo: null,
    url: '#',
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function ClubMembershipPage() {
  const t = useT();
  const p = t.membershipPage;

  return (
    <>
      <Header />
      <main id="main-content" className={styles.main}>
        <div className="container">
          <span className={styles.label}>JKA Moldova</span>
          <h1 className={styles.title}>
            {p.title1} <span className={styles.accent}>{p.title2}</span>
          </h1>
          <p className={styles.subtitle}>{p.subtitle}</p>

          <div className={styles.grid}>
            {CLUBS.map((club) => {
              const isReal = club.url && club.url !== '#';
              const inner = (
                <>
                  <div className={styles.logoWrap}>
                    {club.logo
                      ? <img src={club.logo} alt={club.name} className={styles.logoImg} />
                      : <span className={styles.logoPlaceholder}>JKA</span>
                    }
                  </div>
                  <span className={styles.clubName}>{club.name}</span>
                  {isReal && <span className={styles.arrow} aria-hidden="true">→</span>}
                </>
              );

              return isReal ? (
                <a
                  key={club.name}
                  href={club.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.card}
                  aria-label={`${club.name} — ${t.a11y.opensInNewTab}`}
                >
                  {inner}
                </a>
              ) : (
                <div key={club.name} className={styles.card}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
