import styles from './Disciplines.module.css';
import { useT } from '../../hooks/useT.js';

const KANJI = ['型', '組手', '基本'];
const NUMS = ['01', '02', '03'];
const KEYS = ['kata', 'kumite', 'kihon'];

export default function Disciplines() {
  const t = useT();
  const d = t.disciplines;

  return (
    <section id="disciplines" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <div className={styles.label}><span className={styles.line} />{d.label}</div>
            <h2 className={styles.title}>
              <span className={styles.jp}>稽古</span>
              {d.title1}<br />{d.title2}
            </h2>
          </div>
        </div>
        <div className={styles.grid}>
          {KEYS.map((key, i) => (
            <div key={key} className={styles.card}>
              <div className={styles.num}>{NUMS[i]}</div>
              <div className={styles.kanji}>{KANJI[i]}</div>
              <h3 className={styles.cardTitle}>{d[key].title}</h3>
              <p className={styles.cardDesc}>{d[key].desc}</p>
              <div className={styles.arrow}>→</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
