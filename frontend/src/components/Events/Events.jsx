import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Events.module.css';
import { apiClient } from '../../api/client.js';
import { useT } from '../../hooks/useT.js';
import { useLang } from '../../context/LangContext.jsx';

const MONTHS = {
  ro: ['Ian','Feb','Mar','Apr','Mai','Iun','Iul','Aug','Sep','Oct','Nov','Dec'],
  ru: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
  en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const t = useT();
  const { lang } = useLang();
  const ev = t.events;
  const months = MONTHS[lang] || MONTHS.en;

  useEffect(() => {
    apiClient.get('/events').then((res) => setEvents(res.data.slice(0, 4))).catch(() => {});
  }, []);

  return (
    <section id="events" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={styles.label}><span className={styles.line} />{ev.label}</div>
            <h2 className={styles.title}>
              <span className={styles.jp}>行事</span>
              {ev.title1}<br />{ev.title2}
            </h2>
          </div>
          <Link to="/events" className={styles.more}>{ev.all} →</Link>
        </div>

        <div className={styles.list}>
          {events.length === 0 && (
            <p className={styles.empty}>{ev.empty}</p>
          )}
          {events.map((e) => {
            const d = new Date(e.date);
            return (
              <div key={e.id} className={styles.item}>
                <div className={styles.dateBlock}>
                  <span className={styles.day}>{String(d.getDate()).padStart(2, '0')}</span>
                  <span className={styles.month}>{months[d.getMonth()]} {d.getFullYear()}</span>
                </div>
                <div className={styles.body}>
                  <div className={styles.itemTitle}>{e.title}</div>
                  <div className={styles.meta}>{e.location || ''}</div>
                </div>
                <div className={styles.tag}>{ev.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
