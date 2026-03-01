import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LangProvider } from './context/LangContext.jsx';
import ThemeToggle from './components/ui/ThemeToggle/ThemeToggle.jsx';
import Home from './pages/Home.jsx';
import NewsPage from './pages/NewsPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import SchedulePage from './pages/SchedulePage.jsx';
import ClubsPage from './pages/ClubsPage.jsx';
import CampsPage from './pages/CampsPage.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminNews from './pages/admin/AdminNews.jsx';
import AdminEvents from './pages/admin/AdminEvents.jsx';
import AdminContacts from './pages/admin/AdminContacts.jsx';
import AdminGallery from './pages/admin/AdminGallery.jsx';
import AdminInstructors from './pages/admin/AdminInstructors.jsx';
import InstructorPage from './pages/InstructorPage.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <LangProvider>
        <AuthProvider>
          <ThemeToggle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/camps" element={<CampsPage />} />
            <Route path="/instructors/:id" element={<InstructorPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="news" element={<AdminNews />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="instructors" element={<AdminInstructors />} />
            </Route>
          </Routes>
        </AuthProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
