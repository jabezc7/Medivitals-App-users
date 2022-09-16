import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

export default defineConfig(() => {
    return {
        plugins: [
            vue()
        ],
        server: {
            port: 1026,
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "/src"),
                "~@": path.resolve(__dirname, "/src"),
            },
        }
    }
})
