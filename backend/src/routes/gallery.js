const express = require('express');
const { getDb } = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/gallery — public
router.get('/', (req, res) => {
  const db = getDb();
  const items = db.prepare('SELECT * FROM gallery ORDER BY created_at DESC').all();
  res.json(items);
});

// POST /api/gallery — admin only
router.post('/', authMiddleware, (req, res) => {
  const { url, caption } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO gallery (url, caption) VALUES (?, ?)'
  ).run(url, caption || null);
  const created = db.prepare('SELECT * FROM gallery WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

// DELETE /api/gallery/:id — admin only
router.delete('/:id', authMiddleware, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

module.exports = router;
