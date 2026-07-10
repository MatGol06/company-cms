import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

export default function PublicLayout() {
  const [settings, setSettings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/settings`);
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error("Failed to fetch tetapan CMS", err);
      }
    };
    fetchSettings();
  }, []);

  // Keyboard Shortcut (Ctrl + Shift + L)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigate('/login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar settings={settings || {}} />
      <main className="flex-grow">
        <Outlet context={{ settings }} />
      </main>
      <Footer settings={settings || {}} />
    </div>
  );
}
