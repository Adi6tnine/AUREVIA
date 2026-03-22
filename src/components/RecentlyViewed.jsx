import { motion } from 'framer-motion';
import { customEase } from '../utils/constants';

const RecentlyViewed = ({ items, onSelect }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-20 pt-16 border-t border-[#F0EBE8]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: customEase }}
        className="text-center mb-10"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B6B6B] font-sans-ui">
          Recently Viewed
        </p>
      </motion.div>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: customEase }}
            onClick={() => onSelect(item)}
            className="flex-shrink-0 group"
          >
            <div className="w-28 h-36 rounded-xl overflow-hidden bg-[#FDFBF7] mb-2">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <p className="text-xs font-serif-heading italic text-[#2C2826] text-center">
              {item.name}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
