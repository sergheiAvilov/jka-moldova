import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { useT } from '../../hooks/useT.js';
import JKALogo from '../Logo/JKALogo.jsx';

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
              <JKALogo dark className={styles.logoImg} />
            </Link>
            <p className={styles.brandDesc}>
              Japan Karate Association — Moldova.
            </p>
            <span className={styles.brandTagline}>{f.tagline}</span>
          </div>

          <div className={styles.col}>
            <h4>{f.org.title}</h4>
            <Link to="/#about">{f.org.about}</Link>
            <Link to="/about#structure">{f.org.structure}</Link>
            <Link to="/about#documents">{f.org.documents}</Link>
            <Link to="/about#partners">{f.org.partners}</Link>
          </div>

          <div className={styles.col}>
            <h4>{f.training.title}</h4>
            <Link to="/schedule">{f.training.schedule}</Link>
            <Link to="/clubs">{f.training.clubs}</Link>
            <Link to="/camps">{f.training.camps}</Link>
            <Link to="/events">{f.training.exams}</Link>
          </div>

          <div className={styles.col}>
            <h4>{f.contacts.title}</h4>
            <span className={styles.contactItem}>{f.contacts.address}</span>
            <a href={`mailto:${f.contacts.email}`}>{f.contacts.email}</a>
            <a href="tel:+37322000000">{f.contacts.phone}</a>
            <a href="https://www.facebook.com/JKAMOLDOVA" target="_blank" rel="noopener noreferrer">{f.contacts.social}</a>
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
