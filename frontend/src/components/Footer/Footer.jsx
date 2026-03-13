import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { useT } from '../../hooks/useT.js';
import { useApi } from '../../hooks/useApi.js';
import JKALogo from '../Logo/JKALogo.jsx';

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <polyline points="2,4 12,13 22,4"/>
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.06 2.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export default function Footer() {
  const t = useT();
  const f = t.footer;
  const newTab = t.a11y.opensInNewTab;

  const { data: events } = useApi('/events');
  const upcoming = events
    ? events
        .filter((e) => new Date(e.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 2)
    : [];

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
            <p className={styles.brandDesc}>{f.brandDesc}</p>
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
            <Link to="/clubs">{f.training.clubs}</Link>
            {upcoming.map((e) => (
              <Link key={e.id} to="/events" className={styles.eventLink}>
                {e.title}
              </Link>
            ))}
            {upcoming.length === 0 && (
              <Link to="/events">{t.nav.events}</Link>
            )}
          </nav>

          {/* Contacts */}
          <address className={styles.col}>
            <h4>{f.contacts.title}</h4>
            <a
              href="https://maps.google.com/?q=str.+Eugen+Coca+35+Chisinau+Moldova"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactItem}
              aria-label={`${f.contacts.address} — ${newTab}`}
            >
              <MapPinIcon />{f.contacts.address}
            </a>
            <a href={`mailto:${f.contacts.email}`} className={styles.contactItem}>
              <MailIcon />{f.contacts.email}
            </a>
            <a href={`tel:${f.contacts.phone.replace(/\s/g, '')}`} className={styles.contactItem}>
              <PhoneIcon />{f.contacts.phone}
            </a>
            <a href={`tel:${f.contacts.phone2.replace(/\s/g, '')}`} className={styles.contactItem}>
              <PhoneIcon />{f.contacts.phone2}
            </a>
            <div className={styles.socialRow}>
              <a
                href="https://www.facebook.com/JKAMOLDOVA"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={`Facebook — ${newTab}`}
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.instagram.com/jkamoldova"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={`Instagram — ${newTab}`}
              >
                <InstagramIcon />
              </a>
            </div>
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
