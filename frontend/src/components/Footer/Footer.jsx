import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { useT } from '../../hooks/useT.js';

function LogoEmblem() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.emblemSvg}>
      <circle cx="24" cy="24" r="22" stroke="#C0392B" strokeWidth="1.5"/>
      <path d="M24 14 L28 20 L24 18 L20 20Z" fill="#C0392B"/>
      <circle cx="24" cy="24" r="4" fill="#C0392B"/>
    </svg>
  );
}

export default function Footer() {
  const t = useT();
  const f = t.footer;

  return (
    <footer className={styles.footer}>
      <span className={styles.kanji} aria-hidden="true">道</span>

      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <div className={styles.logoEmblem}><LogoEmblem /></div>
              <div className={styles.logoText}>
                <span className={styles.jka}>JKA</span>
                <span className={styles.moldova}>Moldova</span>
              </div>
            </Link>
            <p className={styles.brandDesc}>
              Japan Karate Association — Moldova.
            </p>
            <span className={styles.brandTagline}>{f.tagline}</span>
          </div>

          <div className={styles.col}>
            <h4>{f.org.title}</h4>
            <a href="#about">{f.org.about}</a>
            <a href="#about">{f.org.structure}</a>
            <a href="#about">{f.org.documents}</a>
            <a href="#about">{f.org.partners}</a>
          </div>

          <div className={styles.col}>
            <h4>{f.training.title}</h4>
            <a href="#disciplines">{f.training.schedule}</a>
            <a href="#disciplines">{f.training.clubs}</a>
            <a href="#disciplines">{f.training.camps}</a>
            <Link to="/events">{f.training.exams}</Link>
          </div>

          <div className={styles.col}>
            <h4>{f.contacts.title}</h4>
            <span className={styles.contactItem}>{f.contacts.address}</span>
            <a href={`mailto:${f.contacts.email}`}>{f.contacts.email}</a>
            <a href="tel:+37322000000">{f.contacts.phone}</a>
            <a href="#">{f.contacts.social}</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{f.copyright}</p>
          <div className={styles.badge}>
            <span className={styles.badgeJka}>JKA</span> Japan Karate Association
          </div>
        </div>
      </div>
    </footer>
  );
}
