

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/dashReact/",

  plugins: [react()],
  server: {
    port: 3000, // تغيير المنفذ الافتراضي إلى 3000
    open: true, // يفتح المتصفح تلقائيًا عند تشغيل الخادم
  },
})
