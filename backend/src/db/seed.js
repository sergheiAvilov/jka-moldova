require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const { getDb } = require('./database');

const db = getDb();

// Seed admin
const adminPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10);
const insertAdmin = db.prepare(`
  INSERT OR IGNORE INTO admins (username, password) VALUES (?, ?)
`);
insertAdmin.run(process.env.ADMIN_USERNAME || 'admin', adminPassword);

// Seed news
const insertNews = db.prepare(`
  INSERT INTO news (title, content, image) VALUES (?, ?, ?)
`);

const newsData = [
  {
    title: 'JKA Moldova открывает новый сезон',
    content: 'Федерация карате JKA Moldova рада сообщить об открытии нового тренировочного сезона. Приглашаем всех желающих присоединиться к занятиям.',
    image: null,
  },
  {
    title: 'Результаты чемпионата',
    content: 'Наши спортсмены показали отличные результаты на последнем чемпионате. Поздравляем всех участников!',
    image: null,
  },
];

newsData.forEach(({ title, content, image }) => {
  insertNews.run(title, content, image);
});

// Seed events
const insertEvent = db.prepare(`
  INSERT INTO events (title, description, date, location) VALUES (?, ?, ?, ?)
`);

const eventsData = [
  {
    title: 'Открытый чемпионат Молдовы',
    description: 'Ежегодный открытый чемпионат по каратэ JKA среди всех возрастных групп.',
    date: '2026-03-15',
    location: 'Кишинёв, Спортивный комплекс',
  },
  {
    title: 'Летний семинар',
    description: 'Интенсивный летний семинар с приглашёнными инструкторами из Японии.',
    date: '2026-06-20',
    location: 'Кишинёв',
  },
];

eventsData.forEach(({ title, description, date, location }) => {
  insertEvent.run(title, description, date, location);
});

console.log('Seed completed successfully.');
process.exit(0);
