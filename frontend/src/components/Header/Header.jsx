import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useT } from '../../hooks/useT.js';
import { useLang } from '../../context/LangContext.jsx';

const LANGS = ['ro', 'ru', 'en'];

function LogoEmblem() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.emblemSvg}>
      <circle cx="24" cy="24" r="22" stroke="#C0392B" strokeWidth="1.5"/>
      <circle cx="24" cy="24" r="18" stroke="rgba(192,57,43,0.3)" strokeWidth="0.5"/>
      <path d="M24 6 L24 42 M6 24 L42 24" stroke="#C0392B" strokeWidth="0.8" opacity="0.4"/>
      <path d="M24 14 L28 20 L24 18 L20 20Z" fill="#C0392B"/>
      <path d="M24 34 L20 28 L24 30 L28 28Z" fill="rgba(192,57,43,0.5)"/>
      <circle cx="24" cy="24" r="4" fill="#C0392B"/>
      <path d="M14 14 L20 20 M34 14 L28 20 M14 34 L20 28 M34 34 L28 28" stroke="#C0392B" strokeWidth="0.8" opacity="0.4"/>
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useT();
  const { lang, changeLang } = useLang();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <div className={styles.logoEmblem}><LogoEmblem /></div>
        <div className={styles.logoText}>
          <span className={styles.jka}>JKA</span>
          <span className={styles.moldova}>Moldova</span>
        </div>
      </Link>

      <button
        className={styles.burger}
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        <a href="/#about" onClick={() => setMenuOpen(false)}>{t.nav.about}</a>
        <a href="/#disciplines" onClick={() => setMenuOpen(false)}>{t.nav.disciplines}</a>
        <a href="/#instructors" onClick={() => setMenuOpen(false)}>{t.nav.instructors}</a>
        <NavLink to="/events" onClick={() => setMenuOpen(false)}>{t.nav.events}</NavLink>
        <NavLink to="/news" onClick={() => setMenuOpen(false)}>{t.nav.news}</NavLink>
        <a href="/#cta" className={styles.navBtn} onClick={() => setMenuOpen(false)}>{t.nav.join}</a>

        <div className={styles.langSwitcher}>
          {LANGS.map((l) => (
            <button
              key={l}
              className={`${styles.langBtn} ${lang === l ? styles.langActive : ''}`}
              onClick={() => { changeLang(l); setMenuOpen(false); }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
