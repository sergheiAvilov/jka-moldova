const express = require('express');
const { getDb } = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/instructors — public
router.get('/', (req, res) => {
  const db = getDb();
  const items = db.prepare('SELECT * FROM instructors ORDER BY sort_order ASC, id ASC').all();
  res.json(items);
});

// GET /api/instructors/:id — public
router.get('/:id', (req, res) => {
  const db = getDb();
  const item = db.prepare('SELECT * FROM instructors WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// POST /api/instructors — admin only
router.post('/', authMiddleware, (req, res) => {
  const { name, role, dan, kanji, image, bio, achievements, sort_order } = req.body;
  if (!name || !role || !dan) {
    return res.status(400).json({ error: 'Name, role and dan are required' });
  }
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO instructors (name, role, dan, kanji, image, bio, achievements, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).run(name, role, dan, kanji || '先', image || null, bio || null, achievements || null, sort_order || 0);
  const created = db.prepare('SELECT * FROM instructors WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

// PUT /api/instructors/:id — admin only
router.put('/:id', authMiddleware, (req, res) => {
  const { name, role, dan, kanji, image, bio, achievements, sort_order } = req.body;
  if (!name || !role || !dan) {
    return res.status(400).json({ error: 'Name, role and dan are required' });
  }
  const db = getDb();
  const existing = db.prepare('SELECT * FROM instructors WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  db.prepare(
    'UPDATE instructors SET name=?, role=?, dan=?, kanji=?, image=?, bio=?, achievements=?, sort_order=? WHERE id=?'
  ).run(name, role, dan, kanji || '先', image || null, bio || null, achievements || null, sort_order || 0, req.params.id);
  const updated = db.prepare('SELECT * FROM instructors WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE /api/instructors/:id — admin only
router.delete('/:id', authMiddleware, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM instructors WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  db.prepare('DELETE FROM instructors WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

module.exports = router;
