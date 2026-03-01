import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useT } from '../../hooks/useT.js';
import { useLang } from '../../context/LangContext.jsx';
import styles from './AdminLogin.module.css';

const LANGS = ['ro', 'ru', 'en'];

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const t = useT();
  const { lang, changeLang } = useLang();
  const a = t.admin.login;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(username, password);
      navigate('/admin/news');
    } catch {
      setError(a.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
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

        <div className={styles.logo}>
          <span className={styles.logoKanji}>道</span>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>JKA Moldova</span>
            <span className={styles.logoSub}>{a.panelTitle}</span>
          </div>
        </div>

        <h1 className={styles.title}>{a.title}</h1>
        <p className={styles.subtitle}>{a.subtitle}</p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">{a.username}</label>
            <input
              id="username"
              className={styles.input}
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">{a.password}</label>
            <input
              id="password"
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? a.loading : a.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
