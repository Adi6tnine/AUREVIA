import { motion } from 'framer-motion';

const RealisticPearl = ({ className = '', style = {}, animatePulse = false }) => (
  <motion.div
    style={style}
    animate={animatePulse ? { scale: [1, 1.03, 1] } : {}}
    transition={animatePulse ? { duration: 5, repeat: Infinity, ease: 'easeInOut' } : {}}
    className={`relative rounded-full flex items-center justify-center overflow-hidden shadow-2xl ${className}`}
  >
    <div className="absolute inset-0 rounded-full bg-[#fdfaf6] shadow-[inset_-15px_-25px_40px_rgba(180,170,190,0.3),inset_10px_10px_25px_rgba(255,255,255,1),0_20px_60px_rgba(0,0,0,0.1)]" />
    <div
      className="absolute inset-0 rounded-full opacity-40 mix-blend-color-burn"
      style={{
        background:
          'conic-gradient(from 180deg at 50% 50%, #fce9f1 0%, #ddf0ff 25%, #e6ddf8 50%, #fce9f1 75%, #ddf0ff 100%)',
      }}
    />
    <div className="absolute inset-0 rounded-full pearl-sheen opacity-60 mix-blend-overlay" />
    <div className="absolute top-[12%] left-[18%] w-[25%] h-[20%] rounded-[50%] bg-white blur-[1.5px] opacity-90 rotate-[-25deg]" />
    <div className="absolute bottom-[8%] right-[15%] w-[40%] h-[40%] rounded-full bg-[#DDF0FF] blur-[15px] opacity-40" />
  </motion.div>
);

export default RealisticPearl;
