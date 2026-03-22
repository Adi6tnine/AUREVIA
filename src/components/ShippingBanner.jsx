import { motion } from 'framer-motion';
import { FREE_SHIPPING_THRESHOLD } from '../utils/constants';

const ShippingBanner = ({ cartTotal }) => {
  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const achieved = cartTotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="px-6 md:px-8 py-4 bg-gradient-to-r from-[#FCE9F1]/60 to-[#E6DDF8]/60 border-b border-white/40">
      <p className="text-[10px] tracking-[0.2em] uppercase text-[#2C2826] font-sans-ui text-center mb-2">
        {achieved
          ? '✦ You have free shipping'
          : `Add $${remaining} more for free shipping`}
      </p>
      <div className="h-[2px] bg-white/60 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#E6DDF8] to-[#FCE9F1] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

export default ShippingBanner;
