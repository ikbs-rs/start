import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react()
    ],
    base: '/start/',
    esbuild: {
        loader: 'jsx',
        include: /src\/.*\.[jt]sx?$/,
        exclude: []
    },
    server: {
        host: true,
        port: 8351,
        strictPort: true
    },
    preview: {
        host: true,
        port: 8351,
        strictPort: true
    },
    define: {
        'process.env': {}
    },
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx'
            }
        }
    }
});
