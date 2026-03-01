import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { useT } from '../../hooks/useT.js';
import JKALogo from '../Logo/JKALogo.jsx';

export default function Footer() {
  const t = useT();
  const f = t.footer;
  const newTab = t.a11y.opensInNewTab;

  return (
    <footer className={styles.footer}>
      <span className={styles.kanji} aria-hidden="true">道</span>

      <div className="container">
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo} aria-label="JKA Moldova">
              <JKALogo dark className={styles.logoImg} />
            </Link>
            <p className={styles.brandDesc}>
              Japan Karate Association — Moldova.
            </p>
            <span className={styles.brandTagline}>{f.tagline}</span>
          </div>

          {/* Organisation nav */}
          <nav className={styles.col} aria-label={f.org.title}>
            <h4>{f.org.title}</h4>
            <Link to="/#about">{f.org.about}</Link>
            <Link to="/about#structure">{f.org.structure}</Link>
            <Link to="/about#documents">{f.org.documents}</Link>
            <Link to="/about#partners">{f.org.partners}</Link>
          </nav>

          {/* Training nav */}
          <nav className={styles.col} aria-label={f.training.title}>
            <h4>{f.training.title}</h4>
            <Link to="/schedule">{f.training.schedule}</Link>
            <Link to="/clubs">{f.training.clubs}</Link>
            <Link to="/camps">{f.training.camps}</Link>
            <Link to="/events">{f.training.exams}</Link>
          </nav>

          {/* Contacts */}
          <address className={styles.col}>
            <h4>{f.contacts.title}</h4>
            <a
              href="https://maps.google.com/?q=Chisinau,Moldova"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
              aria-label={`${f.contacts.address} — ${newTab}`}
            >
              {f.contacts.address}
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&to=${f.contacts.email}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${f.contacts.email} — ${newTab}`}
            >
              {f.contacts.email}
            </a>
            <a href={`tel:${f.contacts.phone.replace(/\s/g, '')}`}>
              {f.contacts.phone}
            </a>
            <a
              href="https://www.facebook.com/JKAMOLDOVA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${f.contacts.social} — ${newTab}`}
            >
              {f.contacts.social}
            </a>
          </address>
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
