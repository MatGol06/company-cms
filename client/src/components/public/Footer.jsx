import { Link, useNavigate } from 'react-router-dom';

export default function Footer({ settings }) {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              {settings?.logoUrl && (
                <img src={settings.logoUrl} alt="Logo" className="h-8 object-contain" onError={(e) => e.target.style.display='none'}/>
              )}
              <span className="font-bold text-xl text-secondary">{settings?.siteName || 'Our Company'}</span>
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
            <h4 className="font-bold text-secondary mb-4 uppercase tracking-wider text-sm">Main Navigation</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-500 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about-us" className="text-slate-500 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-slate-500 hover:text-primary transition-colors">Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-secondary mb-4 uppercase tracking-wider text-sm">Customer Support</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-slate-500 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/terms" className="text-slate-500 hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-slate-500 hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            <span 
              className="cursor-pointer hover:text-slate-500 transition-colors" 
              onDoubleClick={() => navigate('/login')}
              title="©"
            >
              &copy;
            </span> {currentYear} {settings?.siteName || 'Our Company'}. All Rights Reserved.
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
