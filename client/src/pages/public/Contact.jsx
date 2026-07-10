import { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/messages`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', content: '' }); // Reset form
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 bg-white min-h-[80vh] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Contact Us</h1>
          <p className="text-slate-500 text-lg">Have a question or a project in mind? We'd love to hear from you.</p>
        </div>

        <div className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 shadow-sm">
          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl mb-8 text-center font-medium">
              Thank you! Your message has been sent successfully. We will get back to you shortly.
            </div>
          )}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl mb-8 text-center font-medium">
              An error occurred while sending your message. Please try again later.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">Message</label>
              <textarea
                required
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-40 resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 text-lg"
              >
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
