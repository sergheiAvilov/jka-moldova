# JKA Moldova — Официальный сайт

Официальный сайт Национальной федерации карате JKA Молдовы.

## Технологии

**Backend**
- Node.js + Express
- SQLite (better-sqlite3)
- JWT-аутентификация
- Multer (загрузка изображений)

**Frontend**
- React 18 + Vite
- React Router
- Поддержка двух языков (RO / RU)

## Структура проекта

```
JKAM/
├── backend/
│   ├── src/
│   │   ├── db/          # База данных и схема
│   │   ├── middleware/  # JWT-авторизация
│   │   └── routes/      # API маршруты
│   ├── data/            # SQLite файл (не в git)
│   ├── uploads/         # Загруженные изображения (не в git)
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/  # UI компоненты
    │   ├── pages/       # Страницы + админ-панель
    │   ├── api/         # HTTP-клиент
    │   ├── context/     # React Context
    │   ├── hooks/       # Хуки
    │   └── i18n/        # Переводы
    └── package.json
```

## Установка и запуск

### 1. Клонировать репозиторий

```bash
git clone <repo-url>
cd JKAM
```

### 2. Backend

```bash
cd backend
npm install
```

Создать файл `.env`:

```env
PORT=5002
JWT_SECRET=your_secret_key
```

Запустить сервер:

```bash
# Разработка
npm run dev

# Продакшн
npm start
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

## API

Все маршруты доступны по базовому URL `http://localhost:5002`

| Метод | Путь | Описание |
|-------|------|----------|
| POST | `/api/auth/login` | Вход в админ-панель |
| GET | `/api/news` | Список новостей |
| GET | `/api/events` | Список событий |
| GET | `/api/gallery` | Галерея |
| GET | `/api/instructors` | Инструкторы |
| POST | `/api/contacts` | Форма обратной связи |
| POST | `/api/upload` | Загрузка изображения |
| GET | `/api/health` | Статус сервера |

## Админ-панель

Доступна по адресу `/admin`. Позволяет управлять:
- Новостями
- Событиями
- Галереей
- Инструкторами
- Заявками (contacts)

## База данных

SQLite база создаётся автоматически при первом запуске по пути `backend/data/jka.db`.

Таблицы: `news`, `events`, `contacts`, `admins`, `gallery`, `instructors`

Сбросить и пересоздать данные:

```bash
cd backend
npm run seed
```
