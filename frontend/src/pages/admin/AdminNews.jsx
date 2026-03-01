import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client.js';
import { useT } from '../../hooks/useT.js';
import styles from './AdminTable.module.css';

const emptyForm = { title: '', content: '', image: '' };

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const t = useT();
  const a = t.admin.news;
  const c = t.admin.common;

  const load = () => apiClient.get('/news').then((r) => setNews(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await apiClient.put(`/news/${editId}`, form);
    } else {
      await apiClient.post('/news', form);
    }
    setForm(emptyForm);
    setEditId(null);
    load();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ title: item.title, content: item.content, image: item.image || '' });
  };

  const handleDelete = async (id) => {
    if (!confirm(a.confirmDelete)) return;
    await apiClient.delete(`/news/${id}`);
    load();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{a.title}</h1>
          <p className={styles.pageCount}>{news.length} {c.records}</p>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.formTitle}>
          {editId ? a.editRecord : a.newRecord}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>{a.titleLabel}</label>
              <input
                className={styles.input}
                placeholder={a.titlePlaceholder}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>{a.contentLabel}</label>
              <textarea
                className={styles.textarea}
                placeholder={a.contentPlaceholder}
                rows={5}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
              />
            </div>
            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>{c.imageUrl}</label>
              <input
                className={styles.input}
                placeholder="https://..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
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
              <th>{a.colTitle}</th>
              <th>{a.colDate}</th>
              <th>{a.colActions}</th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id}>
                <td className={styles.cellTitle}>{item.title}</td>
                <td className={styles.cellDate}>
                  {new Date(item.published_at).toLocaleDateString('ru-RU')}
                </td>
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
            {news.length === 0 && (
              <tr><td colSpan={3} className={styles.empty}>{c.empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
