import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client.js';
import { useT } from '../../hooks/useT.js';
import styles from './AdminTable.module.css';

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const t = useT();
  const a = t.admin.contacts;
  const c = t.admin.common;

  const load = () => apiClient.get('/contacts').then((r) => setContacts(r.data));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm(a.confirmDelete)) return;
    await apiClient.delete(`/contacts/${id}`);
    load();
  };

  const withPhone = contacts.filter((item) => item.phone).length;

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{a.title}</h1>
          <p className={styles.pageCount}>{contacts.length} {a.total}</p>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <div className={styles.statNum}>{contacts.length}</div>
          <div className={styles.statLabel}>{a.statTotal}</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>{withPhone}</div>
          <div className={styles.statLabel}>{a.statWithPhone}</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statNum}>{contacts.length - withPhone}</div>
          <div className={styles.statLabel}>{a.statEmailOnly}</div>
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{a.colName}</th>
              <th>{a.colEmail}</th>
              <th>{a.colPhone}</th>
              <th>{a.colMessage}</th>
              <th>{a.colDate}</th>
              <th>{a.colActions}</th>
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
                      {c.delete}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr><td colSpan={6} className={styles.empty}>{a.empty}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
