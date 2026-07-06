import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

export default function PublicLayout() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/settings`);
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error("Gagal memuat turun tetapan CMS", err);
      }
    };
    fetchSettings();
  }, []);

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
