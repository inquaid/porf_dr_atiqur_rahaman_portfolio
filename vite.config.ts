import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['babel-plugin-styled-components', {
            displayName: true,
            fileName: false,
          }],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@styles': resolve(__dirname, './src/styles'),
      '@contexts': resolve(__dirname, './src/contexts'),
      '@data': resolve(__dirname, './src/data'),
      '@pages': resolve(__dirname, './src/pages'),
    },
  },
  build: {
    outDir: 'build',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-ui': ['styled-components', 'react-icons'],
          'vendor-animation': ['framer-motion'],
        },
      },
    },
    // Increase limit for heavy isolated studio chunk
    chunkSizeWarningLimit: 2000,
  },
  server: {
    port: 3000,
    open: true,
    // Enable HMR
    hmr: {
      overlay: true,
    },
  },
  preview: {
    port: 3000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'styled-components',
      'framer-motion',
    ],
  },
  // CSS configuration
  css: {
    devSourcemap: true,
  },
});
