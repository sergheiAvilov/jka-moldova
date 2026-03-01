import Header from '../components/Header/Header.jsx';
import Footer from '../components/Footer/Footer.jsx';
import { useApi } from '../hooks/useApi.js';
import styles from './EventsPage.module.css';
import { useT } from '../hooks/useT.js';
import { useLang } from '../context/LangContext.jsx';

const MONTHS = {
  ro: ['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'],
  ru: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
};

export default function EventsPage() {
  const { data: events, loading, error } = useApi('/events');
  const t = useT();
  const { lang } = useLang();
  const ev = t.events;
  const months = MONTHS[lang] || MONTHS.en;

  return (
    <>
      <Header />
      <main className={styles.main} style={{ paddingTop: 120 }}>
        <div className="container">
          <h1 className={styles.title}>{ev.title1} {ev.title2}</h1>
          {loading && <p className={styles.state}>…</p>}
          {error && <p className={styles.state}>!</p>}
          {events && (
            <div className={styles.list}>
              {events.map((e) => {
                const d = new Date(e.date);
                return (
                  <article key={e.id} className={styles.item}>
                    <div className={styles.dateBlock}>
                      <span className={styles.day}>{String(d.getDate()).padStart(2, '0')}</span>
                      <span className={styles.month}>{months[d.getMonth()]}</span>
                    </div>
                    <div className={styles.body}>
                      <h2 className={styles.itemTitle}>{e.title}</h2>
                      {e.location && <p className={styles.location}>{e.location}</p>}
                      <p className={styles.desc}>{e.description}</p>
                    </div>
                  </article>
                );
              })}
              {events.length === 0 && <p className={styles.state}>{ev.empty}</p>}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
