import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    publicDir: 'public',
    server: {
        port: 5173,
        open: true,
        fs: {
            // Allow serving files from data directory
            allow: ['..'],
        },
    },
});
