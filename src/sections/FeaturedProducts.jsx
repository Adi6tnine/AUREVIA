import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import PremiumImage from '../components/PremiumImage';
import PremiumButton from '../components/PremiumButton';
import StarRating from '../components/StarRating';
import { PRODUCTS, customEase } from '../utils/constants';

// Show the 4 highest-rated products
const FEATURED = PRODUCTS.filter((p) => p.rating >= 4.8).slice(0, 4);

const FeaturedProducts = ({ onProductClick, wishlist, onWishlist }) => {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-36 px-4 md:px-12 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: customEase }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] font-sans-ui mb-2">
              Most loved
            </p>
            <h2 className="font-serif-heading italic text-4xl md:text-5xl text-[#2C2826]">
              The Favourites
            </h2>
          </div>
          <button
            onClick={() => navigate('/shop')}
            className="text-[10px] tracking-[0.25em] uppercase font-sans-ui text-[#6B6B6B] hover:text-[#2C2826] transition-colors underline underline-offset-4 self-start md:self-auto"
          >
            View all pieces
          </button>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {FEATURED.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: customEase }}
              className="group cursor-pointer"
              onClick={() => onProductClick(product)}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white mb-3 shadow-sm group-hover:shadow-[0_20px_50px_rgba(201,169,110,0.15)] transition-shadow duration-700">
                {/* Gold shimmer on hover */}
                <motion.div
                  initial={{ x: '-150%' }}
                  whileHover={{ x: '250%' }}
                  transition={{ duration: 1.4, ease: 'easeInOut' }}
                  className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-transparent via-[#C9A96E]/10 to-transparent skew-x-12 z-20 pointer-events-none"
                />

                {product.tag && (
                  <div className="absolute top-3 left-3 z-30">
                    <span className="bg-[#C9A96E] text-[#2C2826] px-2.5 py-1 rounded-full text-[9px] tracking-[0.15em] uppercase font-sans-ui font-medium shadow-sm">
                      {product.tag}
                    </span>
                  </div>
                )}

                {onWishlist && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onWishlist(product); }}
                    className="absolute top-3 right-3 z-30 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
                  >
                    <Heart
                      size={13}
                      strokeWidth={1.5}
                      className={wishlist?.includes(product.id) ? 'fill-[#E6DDF8] text-[#9B8FD4]' : 'text-[#6B6B6B]'}
                    />
                  </button>
                )}

                <PremiumImage src={product.images[0]} alt={product.name} className="w-full h-full" eager />
              </div>

              <div className="space-y-1 px-0.5">
                <h4 className="font-serif-heading italic text-base md:text-xl text-[#2C2826] leading-tight">
                  {product.name}
                </h4>
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                <p className="text-xs text-[#C9A96E] font-sans-ui font-medium tracking-wide">
                  ${product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
          className="flex justify-center mt-14"
        >
          <PremiumButton onClick={() => navigate('/shop')}>
            Explore the Full Collection
          </PremiumButton>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
