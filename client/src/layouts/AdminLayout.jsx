import { Navigate, Outlet, useNavigate, Link } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();
  
  // Periksa jika user dah login
  const token = localStorage.getItem('cms_token');
  const user = JSON.parse(localStorage.getItem('cms_user') || '{}');

  // Kalau tiada token, tendang keluar ke page login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
    } catch (err) { console.error(err); }
    localStorage.removeItem('cms_user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex font-sans">
      
      {/* Sidebar Kiri */}
      <aside className="w-64 bg-secondary text-white flex flex-col hidden md:flex shadow-2xl z-10">
        <div className="p-6">
          <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-primary flex items-center justify-center text-sm">C</span>
            Company CMS
          </h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link to="/admin" className="block px-4 py-3 hover:bg-white/10 text-white rounded-lg transition font-medium">
            📊 Papan Pemuka
          </Link>
          <Link to="/admin/pages" className="block px-4 py-3 hover:bg-white/10 text-white rounded-lg transition font-medium">
            📄 Halaman (Pages)
          </Link>
          <Link to="/admin/services" className="block px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg transition font-medium">
            🛠️ Servis Kami
          </Link>
          <Link to="/admin/messages" className="block px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg transition font-medium">
            📥 Peti Masuk (Inbox)
          </Link>
          <Link to="/admin/settings" className="block px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg transition font-medium">
            ⚙️ Tetapan Sistem
          </Link>
        </nav>
      </aside>

      {/* Ruang Kanan (Content) */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Navbar Atas */}
        <header className="bg-surface h-16 shadow-sm flex items-center justify-between px-8 z-0">
          <h1 className="text-xl font-bold text-secondary">Dashboard</h1>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {user.name?.charAt(0) || 'A'}
              </div>
              <span className="text-sm font-medium text-secondary">{user.name}</span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="text-sm px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 font-medium rounded-lg transition-colors"
            >
              Log Keluar
            </button>
          </div>
        </header>

        {/* Tempat Render Page Berubah-ubah */}
        <div className="p-8 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
