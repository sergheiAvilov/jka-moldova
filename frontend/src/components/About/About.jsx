import styles from './About.module.css';
import { useT } from '../../hooks/useT.js';

export default function About() {
  const t = useT();
  const a = t.about;

  return (
    <section id="about" className={styles.section}>
      <div className={`container ${styles.about}`}>
        <div className={styles.text}>
          <div className={styles.label}>
            <span className={styles.line} />
            {a.label}
          </div>
          <h2 className={styles.title}>
            <span className={styles.jp}>私たちについて</span>
            {a.title1}<br />{a.title2}
          </h2>
          <p>{a.p1}</p>
          <p>{a.p2}</p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>70</span>
              <span className={styles.statLabel}>{a.stat1}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statLabel}>{a.stat2}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNum}>12</span>
              <span className={styles.statLabel}>{a.stat3}</span>
            </div>
          </div>

          <a href="#cta" className={styles.btn}>{a.cta}</a>
        </div>

        <div className={styles.visual}>
          <div className={styles.card}>
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghXLPwf-KUoR_6UQkNUlnOY7IsNRyRWXwRcEqpcv5YJEygR17-WhbZDP3JZrssNg3ynGStkxjnKDUHiG3MOwG3Y7zz5BfzHbTFe_GjTgDEgy6QjjWt7Nd_VSJfT7PhmbjCfQJut8anKls/s1600/1604489_1530060010581324_1539063908275117806_n.jpg"
              alt={t.instructorPage.imageAlt}
              className={styles.cardPhoto}
            />
            <div className={styles.cardOverlay} />
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeKanji}>道</span>
            <span className={styles.badgeLabel}>{a.badge}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
