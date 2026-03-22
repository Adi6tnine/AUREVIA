import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../sections/Hero';
import PearlJourney from '../sections/PearlJourney';
import FeaturedProducts from '../sections/FeaturedProducts';
import Testimonials from '../sections/Testimonials';
import TrustBar from '../components/TrustBar';
import PremiumButton from '../components/PremiumButton';
import PremiumImage from '../components/PremiumImage';
import { customEase } from '../utils/constants';

const Home = ({ onProductClick, wishlist, onWishlist }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1, ease: customEase } }}
      exit={{ opacity: 0, y: -15, transition: { duration: 0.8, ease: customEase } }}
    >
      <Hero />

      {/* Trust marquee right after hero */}
      <TrustBar />

      <PearlJourney />

      {/* Featured products */}
      <FeaturedProducts
        onProductClick={onProductClick}
        wishlist={wishlist}
        onWishlist={onWishlist}
      />

      {/* Testimonials */}
      <Testimonials />

      {/* Story / CTA section */}
      <section className="bg-[#FDFBF7] py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: customEase }}
            className="relative aspect-[4/5] rounded-[60px] overflow-hidden shadow-[0_40px_80px_rgba(44,40,38,0.08)]"
          >
            <PremiumImage
              src="https://images.unsplash.com/photo-1599643477874-c58f0e55b169?q=80&w=1200"
              alt="Aurevia craftsmanship"
              className="w-full h-full"
              eager
            />
            {/* Gold overlay accent */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A96E]/10 to-transparent pointer-events-none" />
            {/* Floating label */}
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg">
              <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans-ui">Est. 2024</p>
              <p className="font-serif-heading italic text-lg text-[#2C2826] mt-0.5">Handmade in Paris</p>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: customEase, delay: 0.15 }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] font-sans-ui mb-4">
              Our story
            </p>
            <h2 className="font-serif-heading italic text-4xl md:text-5xl text-[#2C2826] mb-6 leading-[1.1]">
              Crafted with<br />quiet intention.
            </h2>
            <p className="text-sm font-light text-[#6B6B6B] leading-relaxed mb-4">
              Aurevia was born from a belief that true luxury is felt, not flaunted. Each piece begins as a single pearl — chosen by hand, held to the light, and set only when it is perfect.
            </p>
            <p className="text-sm font-light text-[#6B6B6B] leading-relaxed mb-10">
              We work with a small atelier in Paris, producing no more than 200 pieces per season. When something sells out, it is gone. That is the point.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mb-10 pb-10 border-b border-[#F0EBE8]">
              {[
                { num: '200', label: 'Pieces per season' },
                { num: '18k', label: 'Gold vermeil' },
                { num: '100%', label: 'Handstrung' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif-heading italic text-3xl text-[#C9A96E]">{s.num}</p>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[#6B6B6B] font-sans-ui mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <PremiumButton onClick={() => navigate('/shop')}>
              Explore the Collection
            </PremiumButton>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
