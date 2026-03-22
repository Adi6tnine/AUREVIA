import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Strips white/near-white pixels from a jpg using canvas, returns a transparent PNG data URL
const useTransparentImage = (src, threshold = 240) => {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        // If pixel is near-white, make it transparent
        if (r > threshold && g > threshold && b > threshold) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imageData, 0, 0);
      setDataUrl(canvas.toDataURL('image/png'));
    };
    img.src = src;
  }, [src, threshold]);

  return dataUrl;
};

const Butterfly = ({ size = 85, className = '' }) => {
  const transparentSrc = useTransparentImage('/br4.jpg', 230);

  if (!transparentSrc) return null;

  return (
    <motion.span
      className={`inline-block pointer-events-none select-none ${className}`}
      style={{ rotate: '20deg', display: 'inline-flex' }}
      animate={{ y: [0, -3, 0, -2, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Glow layer behind */}
      <motion.img
        src={transparentSrc}
        alt=""
        width={size}
        height={size}
        style={{
          objectFit: 'contain',
          display: 'block',
          position: 'absolute',
          filter: 'blur(12px) brightness(2) saturate(3)',
          opacity: 0.8,
        }}
        animate={{ scaleX: [1, 0.12, 1, 0.15, 1] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: [0.4, 0, 0.6, 1], repeatDelay: 2.6 }}
      />
      
      {/* Main butterfly with metallic gold effect + outline */}
      <motion.img
        src={transparentSrc}
        alt=""
        width={size}
        height={size}
        style={{
          objectFit: 'contain',
          display: 'block',
          position: 'relative',
          filter: 'sepia(1) saturate(5) hue-rotate(15deg) brightness(1.2) contrast(1.2) drop-shadow(0 0 1px rgba(139, 90, 0, 0.9)) drop-shadow(0 0 2px rgba(201, 169, 110, 0.8)) drop-shadow(0 2px 6px rgba(201, 169, 110, 0.5)) drop-shadow(0 0 12px rgba(201, 169, 110, 0.4))',
        }}
        animate={{ scaleX: [1, 0.12, 1, 0.15, 1] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: [0.4, 0, 0.6, 1], repeatDelay: 2.6 }}
      />
    </motion.span>
  );
};

export default Butterfly;
