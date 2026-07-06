import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import PagesList from './pages/PagesList';
import PageEditor from './pages/PageEditor';
import ServicesList from './pages/ServicesList';
import ServiceEditor from './pages/ServiceEditor';
import MessagesList from './pages/MessagesList';
import MessageDetail from './pages/MessageDetail';
import Settings from './pages/Settings';
import Home from './pages/public/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Laluan Laman Web Awam */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Laluan Admin & Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Laluan Khas Admin (Dilindungi) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="pages/:slug" element={<PageEditor />} />
          <Route path="services" element={<ServicesList />} />
          <Route path="services/:id" element={<ServiceEditor />} />
          <Route path="messages" element={<MessagesList />} />
          <Route path="messages/:id" element={<MessageDetail />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* Kalau user buka root '/', kita bawa ke login/admin terus */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
