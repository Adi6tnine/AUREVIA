import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification with esbuild (default, but explicit)
    minify: 'esbuild',
    // Reduce chunk warning threshold — helps you spot bloated chunks
    chunkSizeWarningLimit: 500,
    // CSS code split for better caching
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Framer Motion is large — keep it separate so it caches independently
          'vendor-motion': ['framer-motion'],
          // Lucide icons tree-shaken separately
          'vendor-icons': ['lucide-react'],
        },
        // Content-hash filenames for long-lived caching
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
});
