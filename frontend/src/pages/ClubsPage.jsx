import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useT } from '../hooks/useT.js';
import styles from './ClubsPage.module.css';

const CLUBS = [
  {
    name: 'Dojo Central',
    city: 'Chișinău',
    address: 'Str. Columna 106',
    phone: '+373 22 000-001',
    coach: 'Anton Ignat',
    dan: '6 Dan',
    kanji: '先',
  },
  {
    name: 'Dojo Botanica',
    city: 'Chișinău',
    address: 'Bd. Dacia 23',
    phone: '+373 22 000-002',
    coach: 'Andrei Rusu',
    dan: '5 Dan',
    kanji: '師',
  },
  {
    name: 'Dojo Bălți',
    city: 'Bălți',
    address: 'Str. Independenței 14',
    phone: '+373 231 000-03',
    coach: 'Victor Lungu',
    dan: '3 Dan',
    kanji: '道',
  },
  {
    name: 'Dojo Cahul',
    city: 'Cahul',
    address: 'Str. Republicii 8',
    phone: '+373 299 000-04',
    coach: 'Ion Popescu',
    dan: '7 Dan',
    kanji: '空',
  },
];

export default function ClubsPage() {
  const t = useT();
  const p = t.clubsPage;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <span className={styles.label}>JKA Moldova</span>
          <h1 className={styles.title}>
            {p.title1} <span className={styles.accent}>{p.title2}</span>
          </h1>

          <div className={styles.grid}>
            {CLUBS.map((club) => (
              <div key={club.name} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.kanji}>{club.kanji}</span>
                  <div>
                    <h2 className={styles.clubName}>{club.name}</h2>
                    <span className={styles.city}>{club.city}</span>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.row}>
                    <span className={styles.rowLabel}>{p.coachLabel}</span>
                    <span className={styles.rowValue}>
                      {club.coach} <span className={styles.dan}>{club.dan}</span>
                    </span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.rowLabel}>{p.addressLabel}</span>
                    <span className={styles.rowValue}>{club.address}</span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.rowLabel}>{p.phoneLabel}</span>
                    <a href={`tel:${club.phone.replace(/\s/g, '')}`} className={styles.phone}>
                      {club.phone}
                    </a>
                  </div>
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
