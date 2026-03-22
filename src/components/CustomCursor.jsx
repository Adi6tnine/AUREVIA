import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import RealisticPearl from './RealisticPearl';

const CustomCursor = ({ isMobile }) => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Very stiff spring = near-instant tracking, just a tiny smoothing to avoid jitter
  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 700, mass: 0.1 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 700, mass: 0.1 });

  const [isHovered, setIsHovered] = useState(false);
  const hoveredRef = useRef(false);

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Use mouseover but debounce the state update — only set when value actually changes
    const handleOver = (e) => {
      const next = !!e.target.closest('button, a, .interactive-card');
      if (next !== hoveredRef.current) {
        hoveredRef.current = next;
        setIsHovered(next);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY, willChange: 'transform' }}
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
    >
      <motion.div
        animate={{ scale: isHovered ? 1.4 : 1, opacity: isHovered ? 0.9 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="w-5 h-5 -ml-2.5 -mt-2.5"
      >
        <RealisticPearl className="w-full h-full shadow-md" />
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
