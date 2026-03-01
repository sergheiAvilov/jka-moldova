import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client.js';
import { useT } from '../../hooks/useT.js';
import styles from './AdminTable.module.css';

const emptyForm = { title: '', description: '', date: '', location: '', image: '' };

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const t = useT();
  const a = t.admin.events;
  const c = t.admin.common;

  const load = () => apiClient.get('/events').then((r) => setEvents(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await apiClient.put(`/events/${editId}`, form);
    } else {
      await apiClient.post('/events', form);
    }
    setForm(emptyForm);
    setEditId(null);
    load();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      date: item.date,
      location: item.location || '',
      image: item.image || '',
    });
  };

  const handleDelete = async (id) => {
    if (!confirm(a.confirmDelete)) return;
    await apiClient.delete(`/events/${id}`);
    load();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{a.title}</h1>
          <p className={styles.pageCount}>{events.length} {c.records}</p>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.formTitle}>
          {editId ? a.editRecord : a.newRecord}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>{a.nameLabel}</label>
              <input
                className={styles.input}
                placeholder={a.namePlaceholder}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{a.dateLabel}</label>
              <input
                className={styles.input}
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{a.locationLabel}</label>
              <input
                className={styles.input}
                placeholder={a.locationPlaceholder}
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>{a.descLabel}</label>
              <textarea
                className={styles.textarea}
                placeholder={a.descPlaceholder}
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
          </div>
          <div className={styles.formActions}>
            <button className={styles.btnPrimary} type="submit">
              {editId ? c.save : a.addBtn}
            </button>
            {editId && (
              <button className={styles.btnSecondary} type="button"
                onClick={() => { setEditId(null); setForm(emptyForm); }}>
                {c.cancel}
              </button>
            )}
          </div>
        </form>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{a.colName}</th>
              <th>{a.colDate}</th>
              <th>{a.colLocation}</th>
              <th>{a.colActions}</th>
            </tr>
          </thead>
          <tbody>
            {events.map((item) => (
              <tr key={item.id}>
                <td className={styles.cellTitle}>{item.title}</td>
                <td className={styles.cellDate}>
                  {new Date(item.date).toLocaleDateString('ru-RU')}
                </td>
                <td className={styles.cellLocation}>{item.location || '—'}</td>
                <td>
                  <div className={styles.cellActions}>
                    <button className={styles.btnEdit} onClick={() => handleEdit(item)}>
                      {c.edit}
                    </button>
                    <button className={styles.btnDelete} onClick={() => handleDelete(item.id)}>
                      {c.delete}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr><td colSpan={4} className={styles.empty}>{c.empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
