import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useT } from '../../hooks/useT.js';
import { useLang } from '../../context/LangContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import JKALogo from '../Logo/JKALogo.jsx';

const LANGS = ['ro', 'ru', 'en'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useT();
  const { lang, changeLang } = useLang();
  const { theme } = useTheme();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <JKALogo dark={theme === 'dark'} className={styles.logoImg} />
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
