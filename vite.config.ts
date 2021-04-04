import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { Buffer } from 'buffer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  define: {
    process: { env: { DEBUG: undefined } },
  },
})
