import { useState, useEffect } from 'react';
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

  // Close menu on Escape
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <header className={styles.header}>
      <a href="#main-content" className="skip-link">{t.a11y.skipToContent}</a>

      <Link to="/" className={styles.logo} aria-label="JKA Moldova">
        <JKALogo dark={theme === 'dark'} className={styles.logoImg} />
      </Link>

      <button
        className={styles.burger}
        onClick={() => setMenuOpen(v => !v)}
        aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
        aria-expanded={menuOpen}
        aria-controls="main-nav"
      >
        <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
      </button>

      <nav
        id="main-nav"
        className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
        aria-label={t.a11y.mainNav}
      >
        <a href="/#about" onClick={() => setMenuOpen(false)}>{t.nav.about}</a>
        <a href="/#disciplines" onClick={() => setMenuOpen(false)}>{t.nav.disciplines}</a>
        <a href="/#instructors" onClick={() => setMenuOpen(false)}>{t.nav.instructors}</a>
        <NavLink to="/events" onClick={() => setMenuOpen(false)}>{t.nav.events}</NavLink>
        <NavLink to="/news" onClick={() => setMenuOpen(false)}>{t.nav.news}</NavLink>
        <a href="/#cta" className={styles.navBtn} onClick={() => setMenuOpen(false)}>{t.nav.join}</a>

        <div className={styles.langSwitcher} role="group" aria-label={t.a11y.changeLanguage}>
          {LANGS.map((l) => (
            <button
              key={l}
              className={`${styles.langBtn} ${lang === l ? styles.langActive : ''}`}
              onClick={() => { changeLang(l); setMenuOpen(false); }}
              aria-current={lang === l ? 'true' : undefined}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
