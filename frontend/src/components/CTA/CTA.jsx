import { useState } from 'react';
import styles from './CTA.module.css';
import Modal from '../ui/Modal/Modal.jsx';
import { apiClient } from '../../api/client.js';
import { useT } from '../../hooks/useT.js';

export default function CTA() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const t = useT();
  const c = t.cta;
  const m = t.contactModal;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/contacts', form);
      setSubmitted(true);
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <section id="cta" className={styles.section}>
        <div className={styles.label}>
          <span className={styles.line} />{t.nav.join}
        </div>
        <h2 className={styles.title}>{c.title}</h2>
        <p className={styles.subtitle}>{c.subtitle}</p>
        <p className={styles.desc}>{c.desc}</p>
        <button className={styles.btn} onClick={() => setOpen(true)}>
          {c.button}
        </button>
      </section>

      <Modal open={open} onClose={() => { setOpen(false); setSubmitted(false); setError(false); }} title={m.title}>
        {submitted ? (
          <p className={styles.success}>{m.success}</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              className={styles.input}
              placeholder={m.namePlaceholder + ' *'}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className={styles.input}
              type="email"
              placeholder={m.emailPlaceholder + ' *'}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className={styles.input}
              placeholder={m.phonePlaceholder}
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <textarea
              className={styles.textarea}
              placeholder={m.messagePlaceholder}
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            {error && <p className={styles.error}>{m.error}</p>}
            <button type="submit" className={styles.submitBtn}>{m.submit}</button>
          </form>
        )}
      </Modal>
    </>
  );
}
