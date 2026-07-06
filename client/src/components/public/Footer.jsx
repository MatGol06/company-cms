import { Link } from 'react-router-dom';

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              {settings?.logoUrl && (
                <img src={settings.logoUrl} alt="Logo" className="h-8 object-contain" onError={(e) => e.target.style.display='none'}/>
              )}
              <span className="font-bold text-xl text-secondary">{settings?.siteName || 'Syarikat Kami'}</span>
            </Link>
            <p className="text-slate-500 leading-relaxed max-w-sm mb-6">
              {settings?.siteDescription || 'Membina penyelesaian digital berinovasi untuk perniagaan masa kini.'}
            </p>
            {settings?.contactEmail && (
              <a href={`mailto:${settings.contactEmail}`} className="text-primary font-medium hover:underline">
                {settings.contactEmail}
              </a>
            )}
          </div>
          
          <div>
            <h4 className="font-bold text-secondary mb-4 uppercase tracking-wider text-sm">Navigasi Utama</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-500 hover:text-primary transition-colors">Utama</Link></li>
              <li><Link to="/tentang-kami" className="text-slate-500 hover:text-primary transition-colors">Tentang Kami</Link></li>
              <li><Link to="/services" className="text-slate-500 hover:text-primary transition-colors">Servis Kami</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-secondary mb-4 uppercase tracking-wider text-sm">Sokongan Pelanggan</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-slate-500 hover:text-primary transition-colors">Hubungi Kami</Link></li>
              <li><Link to="/terma-dan-syarat" className="text-slate-500 hover:text-primary transition-colors">Terma & Syarat</Link></li>
              <li><Link to="/dasar-privasi" className="text-slate-500 hover:text-primary transition-colors">Dasar Privasi</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} {settings?.siteName || 'Syarikat Kami'}. Hak Cipta Terpelihara.
          </p>
          <div className="flex space-x-4">
             {/* Ikon Sosial (Placeholder) */}
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-blue-50 transition-all cursor-pointer font-bold text-xs">FB</div>
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-blue-50 transition-all cursor-pointer font-bold text-xs">IG</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
