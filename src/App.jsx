import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { lazy, Suspense } from 'react';

const CartDrawer = lazy(() => import('./components/CartDrawer'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const ProductModal = lazy(() => import('./components/ProductModal'));
const Toast = lazy(() => import('./components/Toast'));

import Home from './pages/Home';

// Lazy-loaded routes to drastically cut down initial JS execution time
const ShopPage = lazy(() => import('./pages/ShopPage'));

const lazyStatic = (importName) => lazy(() => 
  import('./pages/StaticPage').then(m => ({ default: m[importName] }))
);

const OurStoryPage = lazyStatic('OurStoryPage');
const CraftsmanshipPage = lazyStatic('CraftsmanshipPage');
const SustainabilityPage = lazyStatic('SustainabilityPage');
const PressPage = lazyStatic('PressPage');
const StockistsPage = lazyStatic('StockistsPage');
const ShippingPage = lazyStatic('ShippingPage');
const SizeGuidePage = lazyStatic('SizeGuidePage');
const CarePage = lazyStatic('CarePage');
const ContactPage = lazyStatic('ContactPage');
const FAQPage = lazyStatic('FAQPage');
const PrivacyPage = lazyStatic('PrivacyPage');
const TermsPage = lazyStatic('TermsPage');
const CookiesPage = lazyStatic('CookiesPage');

import useIsMobile from './hooks/useIsMobile';
import useLocalStorage from './hooks/useLocalStorage';

// Static CSS noise overlay — rasterised once, zero per-frame cost
// The SVG is a 200×200 base64-encoded noise tile composited as a fixed pseudo-element
const Atmosphere = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 w-full h-full pointer-events-none z-50"
    style={{
      opacity: 0.025,
      mixBlendMode: 'multiply',
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
      backgroundSize: '200px 200px',
      willChange: 'auto',
    }}
  />
);

let toastId = 0;

export default function App() {
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useLocalStorage('aurevia_cart', []);
  const [wishlist, setWishlist] = useLocalStorage('aurevia_wishlist', []);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const isMobile = useIsMobile();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Remove the splash screen once the app is ready + Minimum display time
  useEffect(() => {
    const loader = document.getElementById('app-loader');
    if (!loader) return;

    // We guarantee the loader is visible for at least 1500ms.
    // This serves two critical purposes:
    // 1. It lets the loading progress bar complete its full CSS animation smoothly.
    // 2. It gives the browser 1.5 seconds to download custom fonts, decode heavy LCP images,
    //    and complete GPU compositing in the blocked React DOM *behind* the loader.
    // When the loader finally fades, the site is 100% painted and perfectly stutter-free.
    const startTime = window.__APP_START_TIME__ || performance.now();
    const elapsed = performance.now() - startTime;
    const minDelay = 1500;
    const remainingTime = Math.max(0, minDelay - elapsed);

    const timeout = setTimeout(() => {
      loader.classList.add('fade-out');
      // Remove it from DOM completely after CSS transition (700ms) finishes
      setTimeout(() => loader.remove(), 700);
    }, remainingTime);

    return () => clearTimeout(timeout);
  }, []);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Track recently viewed (max 6, no duplicates)
  const handleProductClick = useCallback((product) => {
    setSelected(product);
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  }, []);

  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      return existing
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...product, qty: 1 }];
    });
    setSelected(null);
    addToast(`${product.name} added to bag`);
  }, [setCart, addToast]);

  const updateQty = useCallback((id, delta) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
    ), [setCart]);

  const removeFromCart = useCallback((id) =>
    setCart((prev) => prev.filter((i) => i.id !== id)), [setCart]);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const isIn = prev.includes(product.id);
      addToast(
        isIn ? `Removed from wishlist` : `${product.name} wishlisted`,
        'wishlist'
      );
      return isIn ? prev.filter((id) => id !== product.id) : [...prev, product.id];
    });
  }, [setWishlist, addToast]);

  const cartCount = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <div
      className={`font-sans-ui selection:bg-[#E6DDF8] selection:text-[#2C2826] bg-[#FDFBF7] ${
        isMobile ? '' : 'cursor-none'
      }`}
    >
      {!isMobile && <Atmosphere />}

      <Navbar cartCount={cartCount} onCartOpen={() => setIsCartOpen(true)} />

      <Suspense fallback={null}>
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cart}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
        />

        <Toast toasts={toasts} onDismiss={dismissToast} />
        
        {!isMobile && <CustomCursor isMobile={isMobile} />}

        {/* Product quick-view modal */}
        <AnimatePresence>
          {selected && (
            <ProductModal
              product={selected}
              onClose={() => setSelected(null)}
              onAddToCart={addToCart}
              isWishlisted={wishlist.includes(selected.id)}
              onWishlist={toggleWishlist}
            />
          )}
        </AnimatePresence>
      </Suspense>

      <main className="min-h-screen">
        <AnimatePresence>
          <Suspense fallback={null}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home onProductClick={handleProductClick} wishlist={wishlist} onWishlist={toggleWishlist} />} />
              <Route path="/shop" element={<ShopPage onProductClick={handleProductClick} wishlist={wishlist} onWishlist={toggleWishlist} recentlyViewed={recentlyViewed} />} />
              <Route path="/our-story" element={<OurStoryPage />} />
              <Route path="/craftsmanship" element={<CraftsmanshipPage />} />
              <Route path="/sustainability" element={<SustainabilityPage />} />
              <Route path="/press" element={<PressPage />} />
              <Route path="/stockists" element={<StockistsPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/size-guide" element={<SizeGuidePage />} />
              <Route path="/care" element={<CarePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Product quick-view modal */}
      <AnimatePresence>
        {selected && (
          <ProductModal
            product={selected}
            onClose={() => setSelected(null)}
            onAddToCart={addToCart}
            isWishlisted={wishlist.includes(selected.id)}
            onWishlist={toggleWishlist}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
