import styles from './Quote.module.css';
import { useT } from '../../hooks/useT.js';

export default function Quote() {
  const t = useT();
  const q = t.quote;

  return (
    <section className={styles.section}>
      <blockquote className={styles.blockquote}>
        <span className={styles.mark}>&ldquo;</span>
        <p className={styles.text}>{q.text}</p>
        <footer>
          <span className={styles.author}>— {q.author}</span>
          <span className={styles.role}>{q.role}</span>
        </footer>
      </blockquote>
    </section>
  );
}
