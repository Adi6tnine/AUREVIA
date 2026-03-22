import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import PremiumImage from './PremiumImage';
import PremiumButton from './PremiumButton';
import StarRating from './StarRating';
import { PRODUCTS, customEase } from '../utils/constants';

const TABS = ['Description', 'Care'];

const ProductModal = ({ product, onClose, onAddToCart, isWishlisted, onWishlist }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  ).slice(0, 3);

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIndex((i) => (i - 1 + product.images.length) % product.images.length);
  };
  const nextImg = (e) => {
    e.stopPropagation();
    setImgIndex((i) => (i + 1) % product.images.length);
  };

  return (
    <div className="fixed inset-0 z-[5000] flex items-end md:items-center justify-center md:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
      />

      {/* Sheet — slides up on mobile, scales in on desktop */}
      <motion.div
        initial={{ y: '100%', opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 32, stiffness: 260 }}
        className="relative bg-white w-full md:max-w-4xl md:rounded-[40px] rounded-t-[28px] overflow-hidden flex flex-col md:flex-row shadow-2xl max-h-[92vh] md:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ willChange: 'transform' }}
      >
        {/* Mobile drag handle */}
        <div className="md:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#D4C5B0]/60" />
        </div>

        {/* ── Image side ── */}
        <div className="w-full md:w-[45%] relative bg-[#FDFBF7] flex-shrink-0">
          {/* On mobile: fixed short aspect ratio so content is visible */}
          <div className="aspect-[4/3] md:aspect-auto md:h-full relative overflow-hidden">
            <PremiumImage
              key={imgIndex}
              src={product.images[imgIndex]}
              alt={product.name}
              className="w-full h-full"
              eager
            />

            {/* Prev / Next */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm z-10"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm z-10"
                >
                  <ChevronRight size={15} />
                </button>
              </>
            )}

            {/* Dot indicators */}
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                    className={`rounded-full transition-all duration-300 ${
                      i === imgIndex ? 'w-4 h-1.5 bg-[#2C2826]' : 'w-1.5 h-1.5 bg-[#2C2826]/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail strip — desktop only */}
          {product.images.length > 1 && (
            <div className="hidden md:flex gap-2 p-3 bg-white border-t border-[#F0EBE8]">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    i === imgIndex ? 'border-[#2C2826]' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Details side ── */}
        <div className="w-full md:w-[55%] flex flex-col overflow-y-auto overscroll-contain">
          <div className="p-5 md:p-10 flex flex-col">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#CBBDF8] mb-2 block font-sans-ui font-medium">
              {product.category} · Handmade Piece
            </span>

            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h2 className="font-serif-heading italic text-2xl md:text-4xl text-[#2C2826] leading-tight">
                {product.name}
              </h2>
              <button
                onClick={() => onWishlist(product)}
                className="flex-shrink-0 w-9 h-9 rounded-full border border-[#F0EBE8] flex items-center justify-center mt-0.5"
              >
                <Heart
                  size={14}
                  strokeWidth={1.5}
                  className={isWishlisted ? 'fill-[#E6DDF8] text-[#9B8FD4]' : 'text-[#6B6B6B]'}
                />
              </button>
            </div>

            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />

            <div className="flex items-center gap-3 mt-2 mb-1">
              <p className="text-lg md:text-xl font-medium text-[#C9A96E] font-sans-ui">
                ${product.price}
              </p>
              {product.stock <= 3 && (
                <span className="text-[9px] tracking-widest uppercase text-[#C97B8A] font-sans-ui bg-[#FCE9F1] px-2.5 py-1 rounded-full">
                  Only {product.stock} left
                </span>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-3 mb-4">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6B6B] font-sans-ui mb-2">
                  {product.category === 'Rings' ? 'Size' : 'Variant'}: {selectedVariant}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.variants.map((v) => (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase font-sans-ui border transition-all duration-300 ${
                        selectedVariant === v
                          ? 'bg-[#2C2826] text-[#FDFBF7] border-[#2C2826]'
                          : 'border-[#F0EBE8] text-[#6B6B6B]'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-5 border-b border-[#F0EBE8] mb-3">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-[10px] tracking-[0.2em] uppercase font-sans-ui transition-colors relative ${
                    activeTab === tab ? 'text-[#2C2826]' : 'text-[#6B6B6B]'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#2C2826]"
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={activeTab}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-sm font-light text-[#6B6B6B] leading-relaxed mb-5"
              >
                {activeTab === 'Description' ? product.description : product.care}
              </motion.p>
            </AnimatePresence>

            <PremiumButton fullWidth onClick={() => onAddToCart({ ...product, selectedVariant })}>
              Add to Bag
            </PremiumButton>

            {/* You may also like */}
            {related.length > 0 && (
              <div className="mt-6 pt-5 border-t border-[#F0EBE8]">
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#6B6B6B] font-sans-ui mb-3">
                  You may also like
                </p>
                <div className="flex gap-2.5">
                  {related.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setImgIndex(0);
                        setActiveTab('Description');
                        setSelectedVariant(r.variants?.[0] || null);
                        onClose();
                      }}
                      className="flex-1 group"
                    >
                      <div className="aspect-square rounded-xl overflow-hidden bg-[#FDFBF7] mb-1.5">
                        <img
                          src={r.images[0]}
                          alt={r.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <p className="text-[10px] font-serif-heading italic text-[#2C2826] text-center leading-tight">
                        {r.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#2C2826] bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm z-20"
        >
          <X size={16} />
        </button>
      </motion.div>
    </div>
  );
};

export default ProductModal;
