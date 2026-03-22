import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import PremiumButton from './PremiumButton';
import ShippingBanner from './ShippingBanner';
import PromoCode from './PromoCode';
import GiftWrap from './GiftWrap';
import { FREE_SHIPPING_THRESHOLD } from '../utils/constants';

const CartDrawer = ({ isOpen, onClose, cartItems, onRemove, onUpdateQty }) => {
  const [promoCode, setPromoCode] = useState(null);
  const [giftWrap, setGiftWrap] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = promoCode ? Math.round(subtotal * promoCode.discount) : 0;
  const giftWrapFee = giftWrap ? 8 : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : subtotal > 0 ? 12 : 0;
  const total = subtotal - discount + giftWrapFee + shipping;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[2000]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white z-[2001] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 md:p-8 border-b flex justify-between items-center bg-[#FDFBF7]">
              <div>
                <h3 className="font-serif-heading text-3xl text-[#2C2826]">Your Bag</h3>
                {cartItems.length > 0 && (
                  <p className="text-[10px] tracking-widest uppercase text-[#6B6B6B] font-sans-ui mt-0.5">
                    {cartItems.reduce((a, b) => a + b.qty, 0)} item
                    {cartItems.reduce((a, b) => a + b.qty, 0) !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:rotate-90 transition-transform duration-300"
              >
                <X size={24} />
              </button>
            </div>

            {/* Free shipping progress */}
            {cartItems.length > 0 && <ShippingBanner cartTotal={subtotal} />}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <ShoppingBag size={48} strokeWidth={1} className="mb-4" />
                  <p className="font-sans-ui text-sm tracking-widest uppercase">
                    Bag is empty
                  </p>
                </div>
              ) : (
                <>
                  {cartItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4 md:gap-6"
                    >
                      <div className="w-20 h-28 md:w-24 md:h-32 rounded-lg overflow-hidden bg-[#FDFBF7] flex-shrink-0">
                        <img
                          src={item.images ? item.images[0] : item.image}
                          className="w-full h-full object-cover"
                          alt={item.name}
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-serif-heading text-lg md:text-xl text-[#2C2826]">
                            {item.name}
                          </h4>
                          {item.selectedVariant && (
                            <p className="text-[10px] tracking-widest uppercase text-[#6B6B6B] font-sans-ui mt-0.5">
                              {item.selectedVariant}
                            </p>
                          )}
                          <p className="text-sm text-[#6B6B6B] font-light font-sans-ui mt-0.5">
                            ${item.price}
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border rounded-full px-2 py-1 gap-3 md:gap-4 bg-[#FDFBF7]">
                            <button onClick={() => onUpdateQty(item.id, -1)} className="p-1">
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-medium w-4 text-center">
                              {item.qty}
                            </span>
                            <button onClick={() => onUpdateQty(item.id, 1)} className="p-1">
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="text-[#2C2826]/30 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Gift wrap */}
                  <GiftWrap enabled={giftWrap} onToggle={() => setGiftWrap((v) => !v)} />
                </>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-4 md:p-8 bg-[#FDFBF7] border-t space-y-3">
                {/* Promo code */}
                <PromoCode onApply={setPromoCode} appliedCode={promoCode} />

                {/* Order summary */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-[10px] tracking-widest uppercase text-[#6B6B6B] font-sans-ui">
                    <span>Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[10px] tracking-widest uppercase font-sans-ui text-[#9B8FD4]">
                      <span>Discount ({Math.round(promoCode.discount * 100)}%)</span>
                      <span>-${discount}</span>
                    </div>
                  )}
                  {giftWrap && (
                    <div className="flex justify-between text-[10px] tracking-widest uppercase text-[#6B6B6B] font-sans-ui">
                      <span>Gift Wrapping</span>
                      <span>+$8</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[10px] tracking-widest uppercase text-[#6B6B6B] font-sans-ui">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#F0EBE8]">
                    <span className="text-xs tracking-[0.3em] uppercase text-[#6B6B6B] font-sans-ui">
                      Total
                    </span>
                    <span className="font-serif-heading text-3xl text-[#2C2826]">
                      ${total}
                    </span>
                  </div>
                </div>

                <PremiumButton fullWidth onClick={() => {}}>
                  Checkout
                </PremiumButton>

                <p className="text-center text-[9px] tracking-widest uppercase text-[#6B6B6B]/60 font-sans-ui">
                  Free returns · Secure checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
