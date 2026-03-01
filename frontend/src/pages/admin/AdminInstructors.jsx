import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client.js';
import ImageUpload from '../../components/ui/ImageUpload/ImageUpload.jsx';
import styles from './AdminTable.module.css';

const emptyForm = {
  name: '', role: '', dan: '', kanji: '先',
  image: '', bio: '', achievements: '', sort_order: 0,
};

export default function AdminInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);

  const load = () => apiClient.get('/instructors').then((r) => setInstructors(r.data));
  useEffect(() => { load(); }, []);

  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await apiClient.put(`/instructors/${editId}`, form);
    } else {
      await apiClient.post('/instructors', form);
    }
    setForm(emptyForm);
    setEditId(null);
    load();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      role: item.role,
      dan: item.dan,
      kanji: item.kanji || '先',
      image: item.image || '',
      bio: item.bio || '',
      achievements: item.achievements || '',
      sort_order: item.sort_order || 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить инструктора?')) return;
    await apiClient.delete(`/instructors/${id}`);
    load();
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Инструкторы</h1>
          <p className={styles.pageCount}>{instructors.length} записей в базе</p>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.formTitle}>
          {editId ? '— Редактирование инструктора' : '— Новый инструктор'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>

            <div className={styles.field}>
              <label className={styles.label}>Имя *</label>
              <input className={styles.input} placeholder="Имя Фамилия"
                value={form.name} onChange={(e) => set('name', e.target.value)} required />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Должность *</label>
              <input className={styles.input} placeholder="Главный инструктор"
                value={form.role} onChange={(e) => set('role', e.target.value)} required />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Дан *</label>
              <input className={styles.input} placeholder="6 Dan"
                value={form.dan} onChange={(e) => set('dan', e.target.value)} required />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Иероглиф</label>
              <input className={styles.input} placeholder="先"
                value={form.kanji} onChange={(e) => set('kanji', e.target.value)} />
            </div>

            <div className={`${styles.field} ${styles.formFull}`}>
              <ImageUpload
                label="Фото инструктора"
                value={form.image}
                onChange={(url) => set('image', url)}
              />
            </div>

            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>Биография</label>
              <textarea className={styles.textarea} rows={5}
                placeholder="Краткая биография инструктора..."
                value={form.bio} onChange={(e) => set('bio', e.target.value)} />
            </div>

            <div className={`${styles.field} ${styles.formFull}`}>
              <label className={styles.label}>Достижения <span style={{opacity:0.5, fontWeight:400}}>(каждое с новой строки)</span></label>
              <textarea className={styles.textarea} rows={4}
                placeholder={'Чемпион Молдовы 2022\nПризёр чемпионата Европы 2023'}
                value={form.achievements} onChange={(e) => set('achievements', e.target.value)} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Порядок сортировки</label>
              <input className={styles.input} type="number" placeholder="1"
                value={form.sort_order} onChange={(e) => set('sort_order', Number(e.target.value))} />
            </div>

          </div>
          <div className={styles.formActions}>
            <button className={styles.btnPrimary} type="submit">
              {editId ? 'Сохранить изменения' : 'Добавить инструктора'}
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
              <th>Фото</th>
              <th>Имя</th>
              <th>Должность</th>
              <th>Дан</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.image
                    ? <img src={item.image} alt={item.name} style={{ width: 40, height: 48, objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                    : <span style={{ fontSize: 24, opacity: 0.3 }}>{item.kanji}</span>
                  }
                </td>
                <td className={styles.cellTitle}>{item.name}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: 12, letterSpacing: 1 }}>{item.role}</td>
                <td className={styles.cellDate}>{item.dan}</td>
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
            {instructors.length === 0 && (
              <tr><td colSpan={5} className={styles.empty}>Нет записей</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
