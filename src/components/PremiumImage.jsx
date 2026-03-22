import { useState, useEffect, useRef } from 'react';

const FALLBACK =
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800';

/**
 * PremiumImage — optimised image component.
 * - Uses loading="lazy" by default (eager for above-fold images).
 * - Sets fetchpriority="high" on eager images for LCP optimisation.
 * - decoding="async" offloads decode to a background thread.
 * - width/height prevent layout shift (CLS) — images use aspect-ratio via CSS.
 */
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
  
  // Force WebP and compression on Unsplash URLs to drastically cut LCP payload
  const optimizeUrl = (urlStr) => {
    if (!urlStr || typeof urlStr !== 'string') return urlStr;
    try {
      const url = new URL(urlStr);
      if (url.hostname === 'images.unsplash.com') {
        url.searchParams.set('fm', 'webp');
        url.searchParams.set('q', '60');
        url.searchParams.set('auto', 'format');
        return url.toString(); // Cleanly formats `?q=60&w=800&fm=webp&auto=format`
      }
    } catch {
      // Return original safely if URL fails to parse
    }
    return urlStr;
  };

  const imgSrc = status === 'error' ? optimizeUrl(FALLBACK) : optimizeUrl(src);

  return (
    <div className={`relative overflow-hidden bg-[#F5EDD8]/40 ${className}`}>
      {/* Shimmer placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FCE9F1] via-[#F5EDD8] to-[#E6DDF8] animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.6s_ease-in-out_infinite]" />
        </div>
      )}

      {/*
        Scale is applied to this inner wrapper, NOT the <img> itself.
        Scaling an <img> directly forces a repaint each frame (fluttering).
        Scaling a GPU-promoted wrapper div is handled entirely by the compositor.
      */}
      <div
        className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
      >
        <img
          ref={imgRef}
          src={imgSrc}
          alt={alt}
          width={800}
          height={1067}
          loading={eager ? 'eager' : 'lazy'}
          fetchpriority={eager ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

export default PremiumImage;
