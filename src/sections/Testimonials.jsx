import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS, customEase } from '../utils/constants';

const Stars = ({ count = 5 }) => (
  <div className="flex gap-0.5 mb-4">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-[#C9A96E] text-sm">★</span>
    ))}
  </div>
);

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const total = TESTIMONIALS.length;

  const prev = () => setActive((i) => (i - 1 + total) % total);
  const next = () => setActive((i) => (i + 1) % total);

  return (
    <section className="py-24 md:py-36 bg-[#2C2826] overflow-hidden relative">
      {/* Decorative gold line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-[#C9A96E]/40" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: customEase }}
          className="mb-14"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] font-sans-ui mb-3">
            What they say
          </p>
          <h2 className="font-serif-heading italic text-4xl md:text-5xl text-[#FDFBF7]">
            Worn with love
          </h2>
        </motion.div>

        {/* Card */}
        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: customEase }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-16"
            >
              <Stars count={TESTIMONIALS[active].rating} />
              <p className="font-serif-heading italic text-xl md:text-2xl text-[#FDFBF7]/90 leading-relaxed mb-6 max-w-2xl">
                &ldquo;{TESTIMONIALS[active].text}&rdquo;
              </p>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[11px] tracking-[0.3em] uppercase text-[#C9A96E] font-sans-ui">
                  {TESTIMONIALS[active].name}
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#FDFBF7]/30 font-sans-ui">
                  {TESTIMONIALS[active].location} · {TESTIMONIALS[active].product}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-[#FDFBF7]/10 flex items-center justify-center text-[#FDFBF7]/40 hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-300"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-400 ${
                  i === active ? 'w-6 h-1.5 bg-[#C9A96E]' : 'w-1.5 h-1.5 bg-[#FDFBF7]/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-[#FDFBF7]/10 flex items-center justify-center text-[#FDFBF7]/40 hover:border-[#C9A96E]/50 hover:text-[#C9A96E] transition-all duration-300"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Decorative gold line bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent to-[#C9A96E]/40" />
    </section>
  );
};

export default Testimonials;
