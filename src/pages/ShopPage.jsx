import { motion } from 'framer-motion';
import Shop from '../sections/Shop';
import RecentlyViewed from '../components/RecentlyViewed';
import { customEase } from '../utils/constants';
import useIsMobile from '../hooks/useIsMobile';

const ShopPage = ({ onProductClick, wishlist, onWishlist, recentlyViewed }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      key="shop"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1, ease: customEase } }}
      exit={{ opacity: 0, y: -15, transition: { duration: 0.8, ease: customEase } }}
    >
      <Shop
        onProductClick={onProductClick}
        isMobile={isMobile}
        wishlist={wishlist}
        onWishlist={onWishlist}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <RecentlyViewed items={recentlyViewed} onSelect={onProductClick} />
      </div>
    </motion.div>
  );
};

export default ShopPage;
