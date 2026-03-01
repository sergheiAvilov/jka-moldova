import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiClient } from '../api/client.js';
import styles from './InstructorPage.module.css';

export default function InstructorPage() {
  const { id } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get(`/instructors/${id}`)
      .then((r) => setInstructor(r.data))
      .catch(() => setInstructor(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className={styles.loading}>...</div>;
  if (!instructor) return (
    <div className={styles.notFound}>
      <p>Инструктор не найден</p>
      <Link to="/#instructors">← Назад</Link>
    </div>
  );

  const achievements = instructor.achievements
    ? instructor.achievements.split('\n').filter(Boolean)
    : [];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <div className={styles.hero}>

        {/* Left — portrait */}
        <div className={styles.heroRight}>
          {instructor.image ? (
            <img
              src={instructor.image}
              alt={instructor.name}
              className={styles.portrait}
            />
          ) : (
            <span className={styles.heroKanji}>{instructor.kanji}</span>
          )}
        </div>

        {/* Right — info */}
        <div className={styles.heroLeft}>
          <span className={styles.kanjiWatermark} aria-hidden="true">松濤館</span>
          <Link to="/#instructors" className={styles.back}>
            <span>←</span> Все инструкторы
          </Link>
          <div className={styles.heroMeta}>
            <div className={styles.danBadge}>{instructor.dan}</div>
            <h1 className={styles.name}>{instructor.name}</h1>
            <p className={styles.role}>{instructor.role}</p>
          </div>
        </div>

      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className="container">
          <div className={styles.content}>

            {instructor.bio && (
              <div className={styles.section}>
                <div className={styles.sectionLabel}>
                  <span className={styles.sectionLine} />
                  Биография
                </div>
                <div className={styles.bio}>
                  {instructor.bio.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            {achievements.length > 0 && (
              <div className={styles.section}>
                <div className={styles.sectionLabel}>
                  <span className={styles.sectionLine} />
                  Достижения
                </div>
                <ul className={styles.achievements}>
                  {achievements.map((a, i) => (
                    <li key={i}>
                      <span className={styles.achievementDot} />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!instructor.bio && achievements.length === 0 && (
              <div className={styles.empty}>
                Информация об инструкторе скоро появится
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
