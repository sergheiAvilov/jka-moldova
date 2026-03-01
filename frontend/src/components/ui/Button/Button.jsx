import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', href, onClick, type = 'button' }) {
  const className = `${styles.btn} ${styles[variant]}`;

  if (href) {
    const isExternal = href.startsWith('http');
    if (isExternal) {
      return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>;
    }
    if (href.startsWith('#')) {
      return <a href={href} className={className}>{children}</a>;
    }
    return <Link to={href} className={className}>{children}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
