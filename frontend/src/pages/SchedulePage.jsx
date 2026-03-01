import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useT } from '../hooks/useT.js';
import styles from './SchedulePage.module.css';

const SCHEDULE = [
  {
    name: { ro: 'Copii (6–12 ani)', ru: 'Дети (6–12 лет)', en: 'Children (6–12 y.o.)' },
    days: { ro: 'Lun, Mie, Vin', ru: 'Пн, Ср, Пт', en: 'Mon, Wed, Fri' },
    time: '16:00 – 17:30',
    location: 'Dojo Central, Chișinău',
  },
  {
    name: { ro: 'Juniori (13–17 ani)', ru: 'Юниоры (13–17 лет)', en: 'Juniors (13–17 y.o.)' },
    days: { ro: 'Mar, Joi, Sâm', ru: 'Вт, Чт, Сб', en: 'Tue, Thu, Sat' },
    time: '17:00 – 18:30',
    location: 'Dojo Central, Chișinău',
  },
  {
    name: { ro: 'Adulți (18+ ani)', ru: 'Взрослые (18+ лет)', en: 'Adults (18+ y.o.)' },
    days: { ro: 'Lun, Mie, Vin', ru: 'Пн, Ср, Пт', en: 'Mon, Wed, Fri' },
    time: '19:00 – 20:30',
    location: 'Dojo Central, Chișinău',
  },
  {
    name: { ro: 'Grup avansat', ru: 'Продвинутая группа', en: 'Advanced group' },
    days: { ro: 'Mar, Joi', ru: 'Вт, Чт', en: 'Tue, Thu' },
    time: '20:30 – 22:00',
    location: 'Dojo Central, Chișinău',
  },
];

import { useLang } from '../context/LangContext.jsx';

export default function SchedulePage() {
  const t = useT();
  const { lang } = useLang();
  const p = t.schedulePage;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <span className={styles.label}>JKA Moldova</span>
          <h1 className={styles.title}>
            {p.title1} <span className={styles.accent}>{p.title2}</span>
          </h1>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{p.group}</th>
                  <th>{p.days}</th>
                  <th>{p.time}</th>
                  <th>{p.location}</th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row, i) => (
                  <tr key={i}>
                    <td className={styles.groupName}>{row.name[lang] || row.name.en}</td>
                    <td className={styles.days}>{row.days[lang] || row.days.en}</td>
                    <td className={styles.time}>{row.time}</td>
                    <td className={styles.location}>{row.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.note}>
            <span className={styles.noteIcon}>◈</span>
            <p>{p.note}</p>
          </div>

          <a href="#disciplines" className={styles.cta}>{p.ctaLabel}</a>
        </div>
      </main>
      <Footer />
    </>
  );
}
