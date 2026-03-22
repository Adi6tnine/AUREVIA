import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Butterfly from './Butterfly';
import { customEase } from '../utils/constants';

const FooterCol = ({ title, links }) => (
  <div>
    <p className="text-[9px] tracking-[0.35em] uppercase text-[#C9A96E] font-sans-ui mb-5">
      {title}
    </p>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            to={link.to}
            className="text-[11px] tracking-[0.15em] uppercase text-[#FDFBF7]/50 hover:text-[#FDFBF7] transition-colors duration-300 font-sans-ui"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#2C2826] text-[#FDFBF7]">
      {/* Top gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 md:gap-8 mb-16">

          {/* Brand column */}
          <div>
            <h2
              className="font-serif-heading italic text-3xl tracking-widest mb-3 cursor-pointer hover:text-[#C9A96E] transition-colors duration-500"
              onClick={() => navigate('/')}
            >
              AUREVIA
            </h2>
            <p className="font-script text-xl text-[#FDFBF7]/50 mb-6">
              Handmade for moments that matter.
            </p>
            <p className="text-[11px] text-[#FDFBF7]/40 font-sans-ui leading-relaxed max-w-xs">
              Each piece is crafted by hand in small batches using ethically sourced freshwater pearls and 18k gold vermeil.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans-ui mb-3">
                Join the inner circle
              </p>
              {subscribed ? (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] text-[#FDFBF7]/60 font-sans-ui tracking-wide"
                >
                  Thank you — you're on the list ✦
                </motion.p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs font-sans-ui text-[#FDFBF7] placeholder:text-[#FDFBF7]/25 outline-none focus:border-[#C9A96E]/50 transition-colors min-w-0"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-full bg-[#C9A96E] flex items-center justify-center flex-shrink-0 hover:bg-[#B8935A] transition-colors"
                  >
                    <ArrowRight size={14} className="text-[#2C2826]" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <FooterCol
            title="Shop"
            links={[
              { label: 'All Pieces', to: '/shop' },
              { label: 'Necklaces', to: '/shop' },
              { label: 'Earrings', to: '/shop' },
              { label: 'Rings', to: '/shop' },
              { label: 'New Arrivals', to: '/shop' },
              { label: 'Bestsellers', to: '/shop' },
            ]}
          />

          <FooterCol
            title="About"
            links={[
              { label: 'Our Story', to: '/our-story' },
              { label: 'Craftsmanship', to: '/craftsmanship' },
              { label: 'Sustainability', to: '/sustainability' },
              { label: 'Press', to: '/press' },
              { label: 'Stockists', to: '/stockists' },
            ]}
          />

          <FooterCol
            title="Help"
            links={[
              { label: 'Shipping & Returns', to: '/shipping' },
              { label: 'Size Guide', to: '/size-guide' },
              { label: 'Care Instructions', to: '/care' },
              { label: 'Contact Us', to: '/contact' },
              { label: 'FAQ', to: '/faq' },
            ]}
          />
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[9px] tracking-[0.2em] uppercase text-[#FDFBF7]/20 font-sans-ui">
            © 2026 Aurevia. All rights reserved.
          </p>
          <div className="flex gap-6 text-[9px] tracking-[0.2em] uppercase text-[#FDFBF7]/20 font-sans-ui">
            <Link to="/privacy" className="hover:text-[#FDFBF7]/50 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-[#FDFBF7]/50 transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-[#FDFBF7]/50 transition-colors">Cookies</Link>
          </div>
          <div className="flex gap-5 text-[9px] tracking-[0.3em] uppercase text-[#FDFBF7]/30 font-sans-ui">
            <a href="#" className="hover:text-[#C9A96E] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#C9A96E] transition-colors">Pinterest</a>
            <a href="#" className="hover:text-[#C9A96E] transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
