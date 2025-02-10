import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Instagram, Linkedin, AlertCircle, CheckCircle2 } from 'lucide-react';
import getBaseUrl from '../utils/getBaseUrl';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${getBaseUrl()}/api/subscribe`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you for subscribing to our newsletter!' });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to subscribe. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'An error occurred. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  // Automatically clear status message after 4 seconds
  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => setStatus({ type: '', message: '' }), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <a href="/" className="inline-block text-5xl font-semibold text-blue-400 font-serif" style={{ fontFamily: 'Dancing Script' }}>
              Amebo<sup className="text-blue-400 text-sm">®</sup>
            </a>
            <p className="text-gray-300 max-w-sm">
              Delivering thought-provoking stories and insights to curious minds around the globe.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Blog</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Contact</a></li>
              <li><a href="/privacy-policy" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-gray-300">Get the latest articles and insights delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col space-y-3">
                {status.message && (
                  <div className={`flex items-center p-4 rounded-lg ${status.type === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                    {status.type === 'error' ? <AlertCircle className="h-5 w-5 mr-2" /> : <CheckCircle2 className="h-5 w-5 mr-2" />}
                    <p className="text-sm">{status.message}</p>
                  </div>
                )}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                  required
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Amebo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
