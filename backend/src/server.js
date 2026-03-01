require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const authRoutes        = require('./routes/auth');
const newsRoutes        = require('./routes/news');
const eventsRoutes      = require('./routes/events');
const contactsRoutes    = require('./routes/contacts');
const galleryRoutes     = require('./routes/gallery');
const instructorsRoutes = require('./routes/instructors');
const uploadRoutes      = require('./routes/upload');

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files as static assets
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth',        authRoutes);
app.use('/api/news',        newsRoutes);
app.use('/api/events',      eventsRoutes);
app.use('/api/contacts',    contactsRoutes);
app.use('/api/gallery',     galleryRoutes);
app.use('/api/instructors', instructorsRoutes);
app.use('/api/upload',      uploadRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
