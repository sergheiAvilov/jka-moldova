import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useT } from '../hooks/useT.js';
import { useLang } from '../context/LangContext.jsx';
import styles from './AboutPage.module.css';

const STRUCTURE = [
  { role: { ro: 'Președinte', ru: 'Президент', en: 'President' }, name: 'Anton Ignat', dan: '6 Dan', kanji: '先' },
  { role: { ro: 'Instructor principal', ru: 'Главный инструктор', en: 'Chief Instructor' }, name: 'Ion Popescu', dan: '7 Dan', kanji: '師' },
  { role: { ro: 'Secretar general', ru: 'Генеральный секретарь', en: 'General Secretary' }, name: 'Maria Ionescu', dan: '', kanji: '道' },
  { role: { ro: 'Trezorier', ru: 'Казначей', en: 'Treasurer' }, name: 'Vasile Moraru', dan: '', kanji: '空' },
];

const DOCUMENTS = [
  { name: { ro: 'Statutul Federației JKA Moldova', ru: 'Устав Федерации JKA Moldova', en: 'JKA Moldova Federation Charter' }, year: '2015' },
  { name: { ro: 'Regulamentul competițiilor', ru: 'Положение о соревнованиях', en: 'Competition Regulations' }, year: '2023' },
  { name: { ro: 'Regulamentul de examinare', ru: 'Положение об аттестации', en: 'Examination Regulations' }, year: '2022' },
  { name: { ro: 'Codul de etică', ru: 'Кодекс этики', en: 'Code of Ethics' }, year: '2020' },
];

const PARTNERS = [
  { name: 'Japan Karate Association (JKA)', country: { ro: 'Japonia', ru: 'Япония', en: 'Japan' }, url: 'https://www.jka.or.jp' },
  { name: 'European Karate Federation (EKF)', country: { ro: 'Europa', ru: 'Европа', en: 'Europe' }, url: '#' },
  { name: 'Federația de Karate a Moldovei', country: { ro: 'Moldova', ru: 'Молдова', en: 'Moldova' }, url: '#' },
  { name: 'Comitetul Olimpic al Moldovei', country: { ro: 'Moldova', ru: 'Молдова', en: 'Moldova' }, url: '#' },
];

export default function AboutPage() {
  const t = useT();
  const { lang } = useLang();
  const p = t.aboutPage;

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Structure */}
        <section id="structure" className={styles.section}>
          <div className="container">
            <span className={styles.label}>JKA Moldova</span>
            <h2 className={styles.title}>{p.structure.title}</h2>
            <p className={styles.subtitle}>{p.structure.subtitle}</p>
            <div className={styles.structureGrid}>
              {STRUCTURE.map((item) => (
                <div key={item.name} className={styles.memberCard}>
                  <div className={styles.memberKanji}>{item.kanji}</div>
                  <div className={styles.memberInfo}>
                    <span className={styles.memberRole}>{item.role[lang] || item.role.en}</span>
                    <span className={styles.memberName}>{item.name}</span>
                    {item.dan && <span className={styles.memberDan}>{item.dan}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents */}
        <section id="documents" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className="container">
            <span className={styles.label}>JKA Moldova</span>
            <h2 className={styles.title}>{p.documents.title}</h2>
            <p className={styles.subtitle}>{p.documents.subtitle}</p>
            <div className={styles.docList}>
              {DOCUMENTS.map((doc) => (
                <div key={doc.year + doc.name.en} className={styles.docItem}>
                  <div className={styles.docIcon}>⬡</div>
                  <div className={styles.docInfo}>
                    <span className={styles.docName}>{doc.name[lang] || doc.name.en}</span>
                    <span className={styles.docYear}>{doc.year}</span>
                  </div>
                  <button className={styles.docBtn}>{p.documents.download}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section id="partners" className={styles.section}>
          <div className="container">
            <span className={styles.label}>JKA Moldova</span>
            <h2 className={styles.title}>{p.partners.title}</h2>
            <p className={styles.subtitle}>{p.partners.subtitle}</p>
            <div className={styles.partnersGrid}>
              {PARTNERS.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.partnerCard}
                >
                  <div className={styles.partnerKanji}>道</div>
                  <div className={styles.partnerInfo}>
                    <span className={styles.partnerName}>{partner.name}</span>
                    <span className={styles.partnerCountry}>{partner.country[lang] || partner.country.en}</span>
                  </div>
                  <span className={styles.partnerArrow}>→</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
