import { Navigate, Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useT } from '../../hooks/useT.js';
import { useLang } from '../../context/LangContext.jsx';
import styles from './AdminLayout.module.css';

const LANGS = ['ro', 'ru', 'en'];

const NAV_KEYS = [
  { to: '/admin/news',        icon: '◈', key: 'news' },
  { to: '/admin/events',      icon: '◆', key: 'events' },
  { to: '/admin/contacts',    icon: '◉', key: 'contacts' },
  { to: '/admin/gallery',     icon: '◎', key: 'gallery' },
  { to: '/admin/instructors', icon: '◇', key: 'instructors' },
];

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();
  const t = useT();
  const { lang, changeLang } = useLang();
  const a = t.admin.layout;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandKanji}>道</div>
          <div className={styles.brandTitle}>JKA Moldova</div>
          <span className={styles.brandSub}>{a.panelTitle}</span>
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          <div className={styles.navLabel}>{a.contentLabel}</div>
          {NAV_KEYS.map(({ to, icon, key }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.navLink}${isActive ? ' ' + styles.active : ''}`
              }
            >
              <span className={styles.navIcon}>{icon}</span>
              {a.nav[key]}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <div className={styles.langRow}>
            {LANGS.map((l) => (
              <button
                key={l}
                className={`${styles.langBtn} ${lang === l ? styles.langActive : ''}`}
                onClick={() => changeLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <Link to="/" className={styles.backLink}>
            {a.backToSite}
          </Link>
          <button className={styles.logout} onClick={logout}>
            <span>⎋</span> {a.logout}
          </button>
        </div>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
