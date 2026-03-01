import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useT } from '../hooks/useT.js';
import { useLang } from '../context/LangContext.jsx';
import styles from './CampsPage.module.css';

const CAMPS = [
  {
    name: {
      ro: 'Stagiu de vară JKA Moldova 2026',
      ru: 'Летний сбор JKA Moldova 2026',
      en: 'JKA Moldova Summer Camp 2026',
    },
    date: { ro: 'Iulie 2026', ru: 'Июль 2026', en: 'July 2026' },
    location: 'Chișinău, Moldova',
    desc: {
      ro: 'Stagiu intensiv de 5 zile cu instructori invitați din Japonia. Kata, kihon, kumite pentru toate nivelele.',
      ru: 'Интенсивный 5-дневный сбор с приглашёнными инструкторами из Японии. Ката, кихон, кумитэ для всех уровней.',
      en: 'Intensive 5-day camp with guest instructors from Japan. Kata, kihon, kumite for all levels.',
    },
    kanji: '先',
  },
  {
    name: {
      ro: 'Seminar tehnic de toamnă',
      ru: 'Осенний технический семинар',
      en: 'Autumn Technical Seminar',
    },
    date: { ro: 'Octombrie 2026', ru: 'Октябрь 2026', en: 'October 2026' },
    location: 'Bălți, Moldova',
    desc: {
      ro: 'Seminar de 2 zile dedicat perfecționării tehnicii de bază și pregătirii pentru examen de grad.',
      ru: '2-дневный семинар по совершенствованию базовой техники и подготовке к аттестации.',
      en: '2-day seminar focused on perfecting basic technique and exam preparation.',
    },
    kanji: '師',
  },
  {
    name: {
      ro: 'Stagiu internațional JKA',
      ru: 'Международный сбор JKA',
      en: 'JKA International Camp',
    },
    date: { ro: 'Noiembrie 2026', ru: 'Ноябрь 2026', en: 'November 2026' },
    location: 'București, România',
    desc: {
      ro: 'Stagiu comun cu federațiile JKA din România și Ucraina. Schimb de experiență internațional.',
      ru: 'Совместный сбор с федерациями JKA Румынии и Украины. Международный обмен опытом.',
      en: 'Joint camp with JKA federations from Romania and Ukraine. International experience exchange.',
    },
    kanji: '道',
  },
];

export default function CampsPage() {
  const t = useT();
  const { lang } = useLang();
  const p = t.campsPage;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <span className={styles.label}>JKA Moldova</span>
          <h1 className={styles.title}>
            {p.title1} <span className={styles.accent}>{p.title2}</span>
          </h1>

          <div className={styles.list}>
            {CAMPS.map((camp, i) => (
              <div key={i} className={styles.card}>
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
                  <button className={styles.registerBtn}>{p.register}</button>
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
