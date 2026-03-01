import { Navigate, Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import styles from './AdminLayout.module.css';

const navItems = [
  { to: '/admin/news',     icon: '◈', label: 'Новости' },
  { to: '/admin/events',   icon: '◆', label: 'События' },
  { to: '/admin/contacts', icon: '◉', label: 'Заявки' },
  { to: '/admin/gallery',      icon: '◎', label: 'Галерея' },
  { to: '/admin/instructors',  icon: '◇', label: 'Инструкторы' },
];

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth();

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
          <span className={styles.brandSub}>Панель управления</span>
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          <div className={styles.navLabel}>Контент</div>
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.navLink}${isActive ? ' ' + styles.active : ''}`
              }
            >
              <span className={styles.navIcon}>{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className={styles.sidebarFooter}>
          <Link to="/" className={styles.backLink}>
            <span>←</span> На сайт
          </Link>
          <button className={styles.logout} onClick={logout}>
            <span>⎋</span> Выйти
          </button>
        </div>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}
