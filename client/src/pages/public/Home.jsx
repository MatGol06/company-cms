import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, CheckCircle2, Shield, Zap, Globe, Command, Activity, Cpu } from 'lucide-react';

export default function Home() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
        setServices(response.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      
      {/* 1. Hero Section (Premium Modern Style) */}
      <section className="relative overflow-hidden bg-slate-50 pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-100 min-h-[90vh] flex items-center">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-medium text-sm mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            New Generation CMS 2.0 is Live
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
            Empower Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">
              Digital Presence
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            We deliver enterprise-grade solutions with seamless architecture, turning your complex business problems into elegant digital experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link to="/services" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 py-4 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-1 flex items-center justify-center gap-3">
              Explore Our Services <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/contact" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 flex items-center justify-center">
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Logo Cloud Section (Trusted By) */}
      <section className="py-12 border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             <Globe className="w-10 h-10 text-slate-900" />
             <Command className="w-10 h-10 text-slate-900" />
             <Activity className="w-10 h-10 text-slate-900" />
             <Cpu className="w-10 h-10 text-slate-900" />
          </div>
        </div>
      </section>

      {/* 3. Bento Box Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Built for Scale & Speed</h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Everything you need to manage your business operations smoothly in one unified platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Big Bento */}
            <div className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-700"></div>
               <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-600/30">
                 <Shield className="w-8 h-8" />
               </div>
               <h3 className="text-3xl font-bold text-slate-900 mb-4">Enterprise Security</h3>
               <p className="text-slate-500 text-lg leading-relaxed mb-8">
                 Military-grade encryption and advanced threat protection built directly into the core. Your data is isolated, backed up hourly, and monitored 24/7.
               </p>
               <ul className="space-y-4">
                 {['Data Encryption at Rest', 'DDoS Protection', 'Role-based Access Control'].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                     <CheckCircle2 className="w-5 h-5 text-blue-500" /> {item}
                   </li>
                 ))}
               </ul>
            </div>
            
            {/* Small Bento 1 */}
            <div className="md:col-span-2 md:row-span-1 bg-slate-900 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-500 group relative overflow-hidden text-white">
               <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                 <Zap className="w-6 h-6 text-blue-400" />
               </div>
               <h3 className="text-2xl font-bold mb-3">Lightning Fast API</h3>
               <p className="text-slate-400 leading-relaxed">
                 Our edge-network infrastructure guarantees response times under 50ms anywhere in the world.
               </p>
            </div>

            {/* Small Bento 2 */}
            <div className="md:col-span-1 md:row-span-1 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-center items-center text-center">
               <h4 className="text-5xl font-black text-slate-900 mb-2 tracking-tighter">99.9%</h4>
               <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Uptime SLA</p>
            </div>

            {/* Small Bento 3 */}
            <div className="md:col-span-1 md:row-span-1 bg-blue-600 rounded-3xl p-8 shadow-lg shadow-blue-600/20 hover:shadow-xl transition-all duration-500 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-blue-500 opacity-50"></div>
               <div className="relative z-10">
                 <h4 className="text-5xl font-black mb-2 tracking-tighter">24/7</h4>
                 <p className="text-sm font-bold text-blue-200 uppercase tracking-widest">Expert Support</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Section (Updated) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Our Core Services</h2>
              <p className="text-xl text-slate-500 max-w-2xl">Tailored solutions to accelerate your growth.</p>
            </div>
            <Link to="/services" className="text-blue-600 font-bold hover:text-blue-700 transition-colors flex items-center gap-2 group text-lg">
              View Directory <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 bg-slate-50 rounded-3xl animate-pulse border border-slate-100"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service._id} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group flex flex-col h-full overflow-hidden relative">
                  
                  {service.imageUrl ? (
                    <div className="-mx-8 -mt-8 mb-8 h-56 overflow-hidden bg-slate-100 relative">
                       <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                       <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 font-black text-2xl mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 border border-slate-100">
                      {service.order}
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed flex-grow text-lg">
                    {service.description.length > 120 ? `${service.description.substring(0, 120)}...` : service.description}
                  </p>
                  
                  <div className="mt-8 pt-6 border-t border-slate-50">
                    <span className="text-slate-900 font-bold text-sm uppercase tracking-widest flex items-center gap-2 group-hover:text-blue-600 transition-colors">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. CTA Section (Sleek Gradient) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
        {/* Abstract Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Ready to transform your ideas into reality?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join hundreds of successful businesses who have scaled their operations using our custom solutions. Let's build something great together.
          </p>
          <Link to="/contact" className="inline-flex bg-white hover:bg-slate-100 text-slate-900 font-bold px-12 py-5 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all hover:scale-105 text-lg items-center gap-3">
            Start Your Project Today <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
