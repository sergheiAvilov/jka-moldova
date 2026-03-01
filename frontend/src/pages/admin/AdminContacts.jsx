import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client.js';
import styles from './AdminTable.module.css';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);

  const load = () => apiClient.get('/contacts').then((r) => setContacts(r.data));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Удалить заявку?')) return;
    await apiClient.delete(`/contacts/${id}`);
    load();
  };

  const withPhone = contacts.filter((c) => c.phone).length;

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Заявки</h1>
          <p className={styles.pageCount}>{contacts.length} обращений</p>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <div className={styles.statNum}>{contacts.length}</div>
          <div className={styles.statLabel}>Всего заявок</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>{withPhone}</div>
          <div className={styles.statLabel}>С телефоном</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>{contacts.length - withPhone}</div>
          <div className={styles.statLabel}>Только email</div>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Сообщение</th>
              <th>Дата</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item) => (
              <tr key={item.id}>
                <td className={styles.cellTitle}>{item.name}</td>
                <td>{item.email}</td>
                <td className={styles.cellLocation}>{item.phone || '—'}</td>
                <td className={styles.msgCell}>{item.message}</td>
                <td className={styles.cellDate}>
                  {new Date(item.created_at).toLocaleDateString('ru-RU')}
                </td>
                <td>
                  <div className={styles.cellActions}>
                    <button className={styles.btnDelete} onClick={() => handleDelete(item.id)}>
                      Удалить
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr><td colSpan={6} className={styles.empty}>Заявок пока нет</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
