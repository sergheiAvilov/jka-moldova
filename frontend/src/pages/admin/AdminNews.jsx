import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client.js';
import styles from './AdminTable.module.css';

const emptyForm = { title: '', content: '', image: '' };

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

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
    if (!confirm('Удалить запись?')) return;
    await apiClient.delete(`/news/${id}`);
    load();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Новости</h1>
          <p className={styles.pageCount}>{news.length} записей в базе</p>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.formTitle}>
          {editId ? '— Редактирование записи' : '— Новая запись'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>Заголовок *</label>
              <input
                className={styles.input}
                placeholder="Введите заголовок"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>Содержание *</label>
              <textarea
                className={styles.textarea}
                placeholder="Текст новости..."
                rows={5}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                required
              />
            </div>
            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>URL изображения</label>
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
              {editId ? 'Сохранить изменения' : 'Добавить новость'}
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
              <th>Заголовок</th>
              <th>Дата публикации</th>
              <th>Действия</th>
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
                      Редактировать
                    </button>
                    <button className={styles.btnDelete} onClick={() => handleDelete(item.id)}>
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr><td colSpan={3} className={styles.empty}>Нет записей</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
