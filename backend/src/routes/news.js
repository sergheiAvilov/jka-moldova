const express = require('express');
const { getDb } = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/news
router.get('/', (req, res) => {
  const db = getDb();
  const news = db.prepare('SELECT * FROM news ORDER BY published_at DESC').all();
  res.json(news);
});

// GET /api/news/:id
router.get('/:id', (req, res) => {
  const db = getDb();
  const item = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// POST /api/news
router.post('/', authMiddleware, (req, res) => {
  const { title, content, image } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO news (title, content, image) VALUES (?, ?, ?)'
  ).run(title, content, image || null);
  const created = db.prepare('SELECT * FROM news WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

// PUT /api/news/:id
router.put('/:id', authMiddleware, (req, res) => {
  const { title, content, image } = req.body;
  const db = getDb();
  const existing = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  db.prepare(
    'UPDATE news SET title = ?, content = ?, image = ? WHERE id = ?'
  ).run(title ?? existing.title, content ?? existing.content, image ?? existing.image, req.params.id);

  const updated = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE /api/news/:id
router.delete('/:id', authMiddleware, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

module.exports = router;
