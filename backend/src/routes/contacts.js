const express = require('express');
const { getDb } = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// POST /api/contacts
router.post('/', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)'
  ).run(name, email, phone || null, message || null);
  const created = db.prepare('SELECT * FROM contacts WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

// GET /api/contacts (admin only)
router.get('/', authMiddleware, (req, res) => {
  const db = getDb();
  const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  res.json(contacts);
});

// DELETE /api/contacts/:id (admin only)
router.delete('/:id', authMiddleware, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM contacts WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  db.prepare('DELETE FROM contacts WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

module.exports = router;
