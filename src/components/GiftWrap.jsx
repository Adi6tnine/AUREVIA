import { motion } from 'framer-motion';

const GiftWrap = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className="w-full flex items-center justify-between py-3 px-4 rounded-xl border transition-all duration-300 group"
    style={{
      borderColor: enabled ? '#E6DDF8' : '#F0EBE8',
      background: enabled ? 'rgba(230,221,248,0.15)' : 'transparent',
    }}
  >
    <div className="flex items-center gap-3">
      <span className="text-lg">🎀</span>
      <div className="text-left">
        <p className="text-xs tracking-[0.15em] uppercase text-[#2C2826] font-sans-ui">
          Gift Wrapping
        </p>
        <p className="text-[10px] text-[#6B6B6B] font-sans-ui mt-0.5">
          Velvet box + handwritten note · +$8
        </p>
      </div>
    </div>
    <motion.div
      animate={{ scale: enabled ? 1 : 0.9 }}
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
        enabled ? 'border-[#2C2826] bg-[#2C2826]' : 'border-[#D4C5B0]'
      }`}
    >
      {enabled && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-2 h-2 rounded-full bg-white"
        />
      )}
    </motion.div>
  </button>
);

export default GiftWrap;
