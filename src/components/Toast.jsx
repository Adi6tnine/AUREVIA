import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';

const Toast = ({ toasts, onDismiss }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 items-center pointer-events-none">
    <AnimatePresence>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </AnimatePresence>
  </div>
);

const ToastItem = ({ toast, onDismiss }) => {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 3000);
    return () => clearTimeout(t);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="pointer-events-auto flex items-center gap-3 bg-[#2C2826] text-[#FDFBF7] px-5 py-3 rounded-full shadow-xl font-sans-ui text-xs tracking-widest uppercase"
    >
      {toast.type === 'success' && (
        <span className="w-5 h-5 rounded-full bg-[#E6DDF8] flex items-center justify-center flex-shrink-0">
          <Check size={11} className="text-[#2C2826]" strokeWidth={2.5} />
        </span>
      )}
      {toast.type === 'wishlist' && (
        <span className="text-[#FCE9F1] text-sm">♡</span>
      )}
      <span>{toast.message}</span>
    </motion.div>
  );
};

export default Toast;
