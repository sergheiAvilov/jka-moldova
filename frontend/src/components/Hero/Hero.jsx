import styles from './Hero.module.css';
import { useT } from '../../hooks/useT.js';

export default function Hero() {
  const t = useT();
  const h = t.hero;

  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} aria-hidden="true" />
      <div className={styles.heroPattern} aria-hidden="true" />
      <div className={styles.heroKanji} aria-hidden="true">空手道</div>

      <div className={styles.content}>
        <div className={styles.eyebrow} aria-hidden="true">
          <span className={styles.line} />
          {h.label}
          <span className={styles.line} />
        </div>

        <h1 className={styles.title}>
          {h.title1} <span className={styles.red}>{h.title2}</span>
        </h1>

        <p className={styles.subtitleJp} lang="ja">日本空手協会</p>

        <p className={styles.desc}>{h.subtitle}</p>

        <div className={styles.actions}>
          <a href={'#cta'} className={styles.btnPrimary}>{h.cta}</a>
          <a href={'#about'} className={styles.btnOutline}>{t.about.cta}</a>
        </div>
      </div>

      <div className={styles.scroll} aria-hidden="true">
        <div className={styles.scrollLine} />
        {h.scroll}
      </div>
    </section>
  );
}
