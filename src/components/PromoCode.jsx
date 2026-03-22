import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, Check } from 'lucide-react';

// Demo codes
const VALID_CODES = {
  AUREVIA10: 0.10,
  PEARL20: 0.20,
  LUXURY15: 0.15,
};

const PromoCode = ({ onApply, appliedCode }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    const code = input.trim().toUpperCase();
    if (VALID_CODES[code]) {
      onApply({ code, discount: VALID_CODES[code] });
      setError('');
      setInput('');
    } else {
      setError('Invalid code');
      setTimeout(() => setError(''), 2000);
    }
  };

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between py-2 px-3 bg-[#E6DDF8]/30 rounded-xl">
        <div className="flex items-center gap-2">
          <Check size={13} className="text-[#2C2826]" />
          <span className="text-xs font-sans-ui tracking-widest uppercase text-[#2C2826]">
            {appliedCode.code}
          </span>
        </div>
        <span className="text-xs text-[#6B6B6B] font-sans-ui">
          -{Math.round(appliedCode.discount * 100)}% off
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            placeholder="Promo code"
            className="w-full pl-8 pr-3 py-2.5 text-xs tracking-widest uppercase bg-white border border-[#E6DDF8] rounded-xl outline-none focus:border-[#2C2826] transition-colors font-sans-ui placeholder:normal-case placeholder:tracking-normal"
          />
        </div>
        <button
          onClick={handleApply}
          className="px-4 py-2.5 bg-[#2C2826] text-[#FDFBF7] rounded-xl text-[10px] tracking-widest uppercase font-sans-ui hover:opacity-80 transition-opacity"
        >
          Apply
        </button>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[10px] text-red-400 font-sans-ui pl-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PromoCode;
