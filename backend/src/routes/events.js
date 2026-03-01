const express = require('express');
const { getDb } = require('../db/database');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// GET /api/events
router.get('/', (req, res) => {
  const db = getDb();
  const events = db.prepare('SELECT * FROM events ORDER BY date ASC').all();
  res.json(events);
});

// GET /api/events/:id
router.get('/:id', (req, res) => {
  const db = getDb();
  const item = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// POST /api/events
router.post('/', authMiddleware, (req, res) => {
  const { title, description, date, location, image } = req.body;
  if (!title || !description || !date) {
    return res.status(400).json({ error: 'Title, description and date are required' });
  }
  const db = getDb();
  const result = db.prepare(
    'INSERT INTO events (title, description, date, location, image) VALUES (?, ?, ?, ?, ?)'
  ).run(title, description, date, location || null, image || null);
  const created = db.prepare('SELECT * FROM events WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(created);
});

// PUT /api/events/:id
router.put('/:id', authMiddleware, (req, res) => {
  const { title, description, date, location, image } = req.body;
  const db = getDb();
  const existing = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  db.prepare(
    'UPDATE events SET title = ?, description = ?, date = ?, location = ?, image = ? WHERE id = ?'
  ).run(
    title ?? existing.title,
    description ?? existing.description,
    date ?? existing.date,
    location ?? existing.location,
    image ?? existing.image,
    req.params.id
  );

  const updated = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE /api/events/:id
router.delete('/:id', authMiddleware, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM events WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });

  db.prepare('DELETE FROM events WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

module.exports = router;
