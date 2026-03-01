import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Instructors.module.css';
import { useT } from '../../hooks/useT.js';
import { apiClient } from '../../api/client.js';

export default function Instructors() {
  const t = useT();
  const ins = t.instructors;
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    apiClient.get('/instructors').then((r) => setInstructors(r.data)).catch(() => {});
  }, []);

  return (
    <section id="instructors" className={styles.section}>
      <div className="container">
        <div className={styles.label}><span className={styles.line} />{ins.label}</div>
        <h2 className={styles.title}>
          <span className={styles.jp}>先生</span>
          {ins.title1}<br />{ins.title2}
        </h2>
        <div className={styles.grid}>
          {instructors.map((i) => (
            <Link key={i.id} to={`/instructors/${i.id}`} className={styles.card}>
              <div
                className={styles.photo}
                style={i.image ? {
                  backgroundImage: `url(${i.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                } : {}}
              >
                {!i.image && <span className={styles.photoKanji}>{i.kanji}</span>}
                <div className={styles.photoOverlay} />
                <div className={styles.dan}>{i.dan}</div>
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{i.name}</div>
                <div className={styles.role}>{t.roleMap?.[i.role] ?? i.role}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
