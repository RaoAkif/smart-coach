import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import reactJsx from 'vite-react-jsx';
import path from 'path';

export default defineConfig({
  plugins: [reactRefresh(), reactJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://smart-coach-api.vercel.app/api', // Replace with your backend API URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
