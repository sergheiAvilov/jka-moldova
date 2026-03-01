const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data/jka.db');

let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initSchema();
  }
  return db;
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      image TEXT,
      published_at TEXT DEFAULT (datetime('now')),
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      location TEXT,
      image TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      caption TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS instructors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      dan TEXT NOT NULL,
      kanji TEXT DEFAULT '先',
      image TEXT,
      bio TEXT,
      achievements TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Seed default instructors on first run
  const count = db.prepare('SELECT COUNT(*) as n FROM instructors').get().n;
  if (count === 0) {
    const ins = db.prepare(
      'INSERT INTO instructors (name, role, dan, kanji, image, bio, achievements, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    ins.run('Anton Ignat',   'Президент JKA Молдова', '6 Dan', '先', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuqoqIsVJmXP5WK5tZhaRZ_4LYmD07k7Z_7A&s', '', '', 1);
    ins.run('Ion Popescu',   'Главный инструктор',    '7 Dan', '先', '', '', '', 2);
    ins.run('Andrei Rusu',   'Старший инструктор',    '5 Dan', '師', '', '', '', 3);
    ins.run('Elena Cojocar', 'Инструктор',            '4 Dan', '道', '', '', '', 4);
    ins.run('Victor Lungu',  'Инструктор',            '3 Dan', '空', '', '', '', 5);
  }
}

module.exports = { getDb };
