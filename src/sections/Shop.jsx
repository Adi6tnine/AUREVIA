import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import PremiumImage from '../components/PremiumImage';
import StarRating from '../components/StarRating';
import { SkeletonGrid } from '../components/SkeletonCard';
import { PRODUCTS, CATEGORIES, SORT_OPTIONS, customEase } from '../utils/constants';

// ── Product Card ──────────────────────────────────────────────────────────────
const ProductCard = ({ product, index, onClick, isMobile, isWishlisted, onWishlist }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 50, stiffness: 100, mass: 0.5 });
  const smoothY = useSpring(y, { damping: 50, stiffness: 100, mass: 0.5 });
  const rotateX = useTransform(smoothY, [-100, 100], [1.5, -1.5]);
  const rotateY = useTransform(smoothX, [-100, 100], [-1.5, 1.5]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const lowStock = product.stock <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1, delay: index * 0.07, ease: customEase }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={isMobile ? {} : { rotateX, rotateY, transformPerspective: 1200 }}
      className={`group interactive-card relative ${isMobile ? '' : 'cursor-none'}`}
      onClick={() => onClick(product)}
    >
      <motion.div
        whileHover={isMobile ? {} : { y: -4 }}
        transition={{ duration: 0.8, ease: customEase }}
        className="relative aspect-[3/4] mb-3 rounded-2xl overflow-hidden bg-[#FDFBF7] shadow-sm group-hover:shadow-[0_15px_40px_rgba(230,221,248,0.2)] transition-shadow duration-1000"
      >
        {!isMobile && (
          <motion.div
            initial={{ x: '-150%' }}
            whileHover={{ x: '250%' }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 z-20 pointer-events-none"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 z-30 flex flex-col gap-1">
          {product.tag && (
            <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] tracking-[0.15em] uppercase text-[#2C2826] shadow-sm">
              {product.tag}
            </span>
          )}
          {lowStock && (
            <span className="bg-[#FCE9F1]/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] tracking-[0.15em] uppercase text-[#C97B8A] shadow-sm">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(product); }}
          className="absolute top-3 right-3 z-30 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm"
        >
          <Heart
            size={13}
            strokeWidth={1.5}
            className={isWishlisted ? 'fill-[#E6DDF8] text-[#9B8FD4]' : 'text-[#6B6B6B]'}
          />
        </button>

        <PremiumImage src={product.images[0]} alt={product.name} className="w-full h-full" eager={index < 4} />

        {!isMobile && (
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex items-center justify-center">
            <span className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase text-[#2C2826] shadow-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out">
              Quick View
            </span>
          </div>
        )}
      </motion.div>

      <div className="px-0.5 space-y-1">
        <h4 className="font-serif-heading italic text-base md:text-xl text-[#2C2826] leading-tight">
          {product.name}
        </h4>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <p className="text-xs text-[#C9A96E] tracking-wide font-sans-ui font-medium">
          ${product.price}
        </p>
      </div>
    </motion.div>
  );
};

// ── Shop Section ──────────────────────────────────────────────────────────────
const Shop = ({ onProductClick, isMobile, wishlist, onWishlist }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [search, setSearch] = useState('');
  const [showSort, setShowSort] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeCategory !== 'All') list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    switch (sortBy) {
      case 'price_asc': list.sort((a, b) => a.price - b.price); break;
      case 'price_desc': list.sort((a, b) => b.price - a.price); break;
      case 'newest': list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      default: break;
    }
    return list;
  }, [activeCategory, sortBy, search]);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label;

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#FDFBF7] to-white">

      {/* ── Page header — clearly part of content, not nav ── */}
      <div className="pt-28 md:pt-40 pb-10 md:pb-14 px-4 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: customEase }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#6B6B6B] font-sans-ui mb-3">
            Home &rsaquo; Collection
          </p>
          <h1 className="font-serif-heading italic text-4xl md:text-6xl text-[#2C2826] mb-2">
            The Collection
          </h1>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#6B6B6B] font-sans-ui opacity-60">
            Hand-strung with intention
          </p>
        </motion.div>
      </div>

      {/* ── Filter bar — visually separated from header ── */}
      <div className="px-4 md:px-12 pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto">

          {/* Search + Sort on one line */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pieces..."
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#F0EBE8] rounded-xl text-sm font-sans-ui text-[#2C2826] placeholder:text-[#6B6B6B]/40 outline-none focus:border-[#C9B8E8] transition-colors"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]">
                  <X size={13} />
                </button>
              )}
            </div>

            <div className="relative flex-shrink-0">
              <button
                onClick={() => setShowSort((v) => !v)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#F0EBE8] rounded-xl text-[10px] tracking-widest uppercase font-sans-ui text-[#6B6B6B] whitespace-nowrap"
              >
                <SlidersHorizontal size={12} />
                <span className="hidden sm:inline">{activeSortLabel}</span>
                <span className="sm:hidden">Sort</span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${showSort ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-1.5 bg-white border border-[#F0EBE8] rounded-2xl shadow-xl overflow-hidden z-50 min-w-[170px]"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                        className={`w-full text-left px-5 py-3 text-xs tracking-widest uppercase font-sans-ui transition-colors hover:bg-[#FDFBF7] ${
                          sortBy === opt.value ? 'text-[#2C2826] bg-[#FDFBF7]' : 'text-[#6B6B6B]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Category tabs — text-based, not pill-bar style */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 text-[11px] tracking-[0.2em] uppercase font-sans-ui transition-all duration-300 rounded-lg ${
                  activeCategory === cat
                    ? 'text-[#2C2826] bg-[#2C2826]/8 font-medium'
                    : 'text-[#6B6B6B] hover:text-[#2C2826]'
                }`}
                style={activeCategory === cat ? { backgroundColor: 'rgba(44,40,38,0.07)' } : {}}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto flex-shrink-0 text-[10px] tracking-widest uppercase text-[#6B6B6B]/60 font-sans-ui pl-4">
              {filtered.length} piece{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Thin divider */}
          <div className="mt-3 mb-8 h-px bg-[#F0EBE8]" />
        </div>
      </div>

      {/* ── Product grid ── */}
      <div className="px-4 md:px-12 pb-24 md:pb-40">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <SkeletonGrid count={8} />
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <p className="font-serif-heading italic text-3xl text-[#2C2826] mb-3">No pieces found</p>
              <p className="text-sm text-[#6B6B6B] font-sans-ui mb-8">Try a different search or category</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="text-xs tracking-widest uppercase text-[#2C2826] underline underline-offset-4 font-sans-ui"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    index={i}
                    onClick={onProductClick}
                    isMobile={isMobile}
                    isWishlisted={wishlist.includes(p.id)}
                    onWishlist={onWishlist}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

    </section>
  );
};

export default Shop;
