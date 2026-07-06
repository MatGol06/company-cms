import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ settings }) {
  const location = useLocation();

  const navLinks = [
    { name: 'Utama', path: '/' },
    { name: 'Tentang Kami', path: '/tentang-kami' },
    { name: 'Servis', path: '/services' },
    { name: 'Hubungi Kami', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Bahagian Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {settings?.logoUrl ? (
              <img 
                src={settings.logoUrl} 
                alt={settings.siteName} 
                className="h-10 object-contain transition-transform group-hover:scale-105"
                onError={(e) => e.target.style.display='none'}
              />
            ) : (
              <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-xl font-bold text-xl shadow-md group-hover:shadow-primary/30 transition-all">
                {settings?.siteName ? settings.siteName.charAt(0).toUpperCase() : 'C'}
              </div>
            )}
            <span className="font-bold text-xl text-secondary tracking-tight group-hover:text-primary transition-colors">
              {settings?.siteName || 'Syarikat Kami'}
            </span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-slate-500 hover:text-secondary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/contact" 
              className="bg-secondary hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Mula Projek
            </Link>
          </div>

          {/* Butang Menu Mobile (Ringkas buat masa ini) */}
          <div className="md:hidden flex items-center">
             <button className="text-slate-500 hover:text-secondary focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
