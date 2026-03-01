import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client.js';
import styles from './AdminTable.module.css';

const emptyForm = { title: '', description: '', date: '', location: '', image: '' };

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

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
    if (!confirm('Удалить событие?')) return;
    await apiClient.delete(`/events/${id}`);
    load();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>События</h1>
          <p className={styles.pageCount}>{events.length} записей в базе</p>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.formTitle}>
          {editId ? '— Редактирование события' : '— Новое событие'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>Название *</label>
              <input
                className={styles.input}
                placeholder="Название события"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Дата *</label>
              <input
                className={styles.input}
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Место проведения</label>
              <input
                className={styles.input}
                placeholder="Город, адрес"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>Описание *</label>
              <textarea
                className={styles.textarea}
                placeholder="Описание события..."
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
          </div>
          <div className={styles.formActions}>
            <button className={styles.btnPrimary} type="submit">
              {editId ? 'Сохранить изменения' : 'Добавить событие'}
            </button>
            {editId && (
              <button className={styles.btnSecondary} type="button"
                onClick={() => { setEditId(null); setForm(emptyForm); }}>
                Отмена
              </button>
            )}
          </div>
        </form>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Название</th>
              <th>Дата</th>
              <th>Место</th>
              <th>Действия</th>
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
                      Редактировать
                    </button>
                    <button className={styles.btnDelete} onClick={() => handleDelete(item.id)}>
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr><td colSpan={4} className={styles.empty}>Нет записей</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
