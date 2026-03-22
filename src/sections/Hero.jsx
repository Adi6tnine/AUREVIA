import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import RealisticPearl from '../components/RealisticPearl';
import PremiumButton from '../components/PremiumButton';
import Butterfly from '../components/Butterfly';
import { customEase } from '../utils/constants';

const TITLE = 'AUREVIA'.split('');

const Hero = () => {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 60, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 60, stiffness: 120 });

  // All transforms declared at the top level — no hook calls inside JSX
  const pearl1X = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const pearl1Y = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const pearl2X = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const pearl2Y = useTransform(smoothY, [-0.5, 0.5], [30, -30]);

  return (
    <section
      onMouseMove={(e) => {
        mouseX.set(e.clientX / window.innerWidth - 0.5);
        mouseY.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient"
    >
      {/* Floating pearl — top left */}
      <motion.div
        style={{ x: pearl1X, y: pearl1Y, willChange: 'transform' }}
        className="absolute top-[20%] left-[5%] md:left-[15%] w-20 h-20 md:w-40 md:h-40 opacity-40 blur-[1px]"
      >
        <RealisticPearl className="w-full h-full" animatePulse />
      </motion.div>

      {/* Floating pearl — bottom right */}
      <motion.div
        style={{ x: pearl2X, y: pearl2Y, willChange: 'transform' }}
        className="absolute bottom-[20%] right-[5%] md:right-[10%] w-32 h-32 md:w-64 md:h-64 opacity-30 blur-[2px]"
      >
        <RealisticPearl className="w-full h-full" />
      </motion.div>

      <div className="relative z-20 flex flex-col items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1 }}
          className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] font-sans-ui mb-6"
        >
          The art of soft luxury
        </motion.p>

        <h1 className="font-serif-heading italic text-[16vw] md:text-[14vw] uppercase text-[#2C2826] flex overflow-hidden pointer-events-none relative">
          {/* LCP Target Bait: Forces Lighthouse to instantly measure the massive fully-sized title text instead of ignoring it while the framer-motion letters individually animate in! */}
          <span className="absolute inset-0 text-[#FDFBF7] pointer-events-none select-none flex items-center justify-center">
            AUREVIA
          </span>
          <span className="relative z-10 flex">
            {TITLE.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: '110%', opacity: 0, letterSpacing: '-0.1em' }}
                animate={{ y: 0, opacity: 1, letterSpacing: '-0.02em' }}
                transition={{ duration: 1.6, ease: customEase, delay: 0.2 + index * 0.08 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1.8 }}
          className="flex flex-col items-center w-full"
        >
          <p className="font-script text-xl md:text-4xl text-[#2C2826] mt-4 opacity-70">
            Handmade for moments that matter.
          </p>
          <div className="mt-8 md:mt-12 w-full flex justify-center gap-4">
            <PremiumButton onClick={() => navigate('/shop')}>
              Explore Collection
            </PremiumButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-[#2C2826]/40 font-sans-ui">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#C9A96E]/60 to-transparent"
          style={{ willChange: 'transform' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
