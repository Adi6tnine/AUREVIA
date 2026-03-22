import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { customEase } from '../utils/constants';
import Butterfly from './Butterfly';

const Navbar = ({ cartCount, onCartOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nav = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: customEase }}
        className={`fixed top-0 w-full z-[1000] transition-all duration-1000 ${
          scrolled
            ? 'py-3 md:py-4 bg-white/70 backdrop-blur-md border-b border-white/30'
            : 'py-5 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-12 flex items-center">

          {/* Left — hamburger (mobile) / nav links (desktop) */}
          <div className="flex-1 flex items-center">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 -ml-1">
              <Menu size={20} className="text-[#2C2826]" />
            </button>
            <div className="hidden md:flex space-x-10 text-xs tracking-[0.15em] uppercase text-[#6B6B6B]">
              <button
                onClick={() => nav('/')}
                className={`relative transition-colors hover:text-[#2C2826] ${currentPath === '/' ? 'text-[#2C2826]' : ''}`}
              >
                Home
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-[#C9A96E] transition-all ${currentPath === '/' ? 'w-full' : 'w-0'}`} />
              </button>
              <button
                onClick={() => nav('/shop')}
                className={`relative transition-colors hover:text-[#2C2826] ${currentPath === '/shop' ? 'text-[#2C2826]' : ''}`}
              >
                Collection
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-[#C9A96E] transition-all ${currentPath === '/shop' ? 'w-full' : 'w-0'}`} />
              </button>
            </div>
          </div>

          {/* Center — logo always centered */}
          <h1
            onClick={() => nav('/')}
            className="text-xl md:text-3xl tracking-[0.3em] text-[#2C2826] font-serif cursor-pointer font-serif-heading italic select-none absolute left-1/2 -translate-x-1/2 flex items-center"
          >
            <span>AUREVI</span>
            <span className="relative inline-block">
              A
              <Butterfly size={85} className="absolute -top-6 -right-8" />
            </span>
          </h1>

          {/* Right — cart */}
          <div className="flex-1 flex justify-end items-center">
            <button onClick={onCartOpen} className="text-[#2C2826] relative group p-2">
              <ShoppingBag size={20} className="stroke-[1.5] group-hover:scale-110 transition-transform duration-700" />
              <span
                className={`absolute top-0 right-0 bg-[#C9A96E] text-[#2C2826] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold shadow-sm transition-opacity ${
                  cartCount > 0 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.6, ease: customEase }}
            className="fixed inset-0 bg-white z-[2000] flex flex-col p-12"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 left-6 p-2"
            >
              <X size={24} className="text-[#2C2826]" />
            </button>
            <div className="flex flex-col space-y-12 mt-20">
              <button
                onClick={() => nav('/')}
                className="font-serif-heading italic text-5xl text-[#2C2826] text-left"
              >
                Home
              </button>
              <button
                onClick={() => nav('/shop')}
                className="font-serif-heading italic text-5xl text-[#2C2826] text-left"
              >
                Collection
              </button>
            </div>
            <div className="mt-auto flex flex-col space-y-6">
              <div className="flex space-x-8">
                <a href="#" className="text-xs tracking-widest uppercase text-[#6B6B6B]">
                  Instagram
                </a>
                <a href="#" className="text-xs tracking-widest uppercase text-[#6B6B6B]">
                  YouTube
                </a>
              </div>
              <p className="text-[10px] tracking-widest uppercase text-[#2C2826]/30">
                © 2026 Aurevia
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
