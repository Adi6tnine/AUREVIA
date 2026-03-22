import { motion } from 'framer-motion';

const PremiumButton = ({ children, onClick, fullWidth = false, variant = 'dark' }) => {
  const isDark = variant === 'dark';

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ y: 1 }}
      className={`relative px-10 py-4 rounded-full overflow-hidden group shadow-lg transition-all duration-700 ${
        fullWidth ? 'w-full' : ''
      } ${isDark ? 'bg-[#2C2826] text-[#FDFBF7]' : 'bg-[#C9A96E] text-[#2C2826]'}`}
    >
      {/* Gold shimmer sweep */}
      <motion.div
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 1.1, delay: 0.2, ease: 'easeInOut' }}
        className={`absolute top-0 left-0 w-[50%] h-full skew-x-[-20deg] pointer-events-none bg-gradient-to-r ${
          isDark
            ? 'from-transparent via-[#C9A96E]/20 to-transparent'
            : 'from-transparent via-white/30 to-transparent'
        }`}
      />
      <span className="relative z-10 text-[10px] tracking-[0.25em] font-medium uppercase font-sans-ui">
        {children}
      </span>
    </motion.button>
  );
};

export default PremiumButton;
