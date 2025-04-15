import { defineConfig } from '@tanstack/react-start/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
    // @ts-ignore - Server config is valid for Vite but not exposed in types
    server: {
      allowedHosts: true,
      hmr: {
        host: "e24d-2a01-cb14-c10-be00-2d92-726c-82c-5e87.ngrok-free.app",
        protocol: "wss",
      },
    },
  },
})