import { useState, useEffect, useRef } from 'react';

const FALLBACK =
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000';

const PremiumImage = ({ src, alt, className, eager = false }) => {
  const [status, setStatus] = useState('loading');
  const imgRef = useRef(null);

  useEffect(() => {
    // Reset to loading whenever src changes
    setStatus('loading');

    // Give the DOM a tick to update the img src, then check if already cached
    const frame = requestAnimationFrame(() => {
      const img = imgRef.current;
      if (img && img.complete && img.naturalWidth > 0) {
        setStatus('loaded');
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [src]);

  const isLoaded = status === 'loaded';
  const imgSrc = status === 'error' ? FALLBACK : src;

  return (
    <div className={`relative overflow-hidden bg-[#F5EDD8]/40 ${className}`}>
      {/* Shimmer placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FCE9F1] via-[#F5EDD8] to-[#E6DDF8] animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.6s_ease-in-out_infinite]" />
        </div>
      )}

      <img
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        className={`w-full h-full object-cover transition-opacity duration-300 group-hover:scale-105 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default PremiumImage;
