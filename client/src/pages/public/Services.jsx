import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Services() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-[80vh] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Our Services</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Comprehensive solutions tailored to your specific needs.</p>
        </div>

        {isLoading ? (
          <div className="text-center text-slate-500 animate-pulse text-lg">Loading services...</div>
        ) : services.length === 0 ? (
           <div className="text-center text-slate-500 text-lg">No services available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service._id} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col h-full overflow-hidden relative">
                
                {service.imageUrl ? (
                  <div className="-mx-8 -mt-8 mb-6 h-56 overflow-hidden bg-slate-100">
                     <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                ) : service.icon ? (
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary text-3xl mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    <i className={service.icon}></i>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary text-2xl font-bold mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                    {service.order}
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-secondary mb-4">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed flex-grow">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
