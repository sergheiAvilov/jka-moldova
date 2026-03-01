import styles from './RedStripe.module.css';
import { useT } from '../../hooks/useT.js';

export default function RedStripe() {
  const t = useT();
  const r = t.redStripe;

  const stats = [
    { num: '1955', label: r.year,     sub: 'JKA Japan' },
    { num: '500+', label: r.members,  sub: 'Moldova' },
    { num: '12',   label: r.clubs,    sub: 'Moldova' },
    { num: '30+',  label: r.champions, sub: '' },
  ];

  return (
    <div className={styles.stripe}>
      {stats.map((s, i) => (
        <div key={i} className={styles.wrapper}>
          {i > 0 && <div className={styles.divider} />}
          <div className={styles.item}>
            <div className={styles.num}>{s.num}</div>
            <div className={styles.labelBlock}>
              <span>{s.label}</span>
              {s.sub && <span>{s.sub}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
