import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000, // Increase the limit to 1000 kB
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: Split large dependencies into separate chunks
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Ensure this alias is correctly set
    },
  },
  server: {
    historyApiFallback: true, // Ensure React Router works correctly

  },
});
