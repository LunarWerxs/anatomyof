import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  build: {
    // @vueuse/core ships /* #__PURE__ */ comments in positions rolldown can't bind to a call
    // expression (e.g. before an object literal); it flags them as INVALID_ANNOTATION even
    // though the annotation is inert there. Silence that one benign check to keep builds quiet.
    rollupOptions: { checks: { invalidAnnotation: false } },
    // The only chunks over the default 500 kB ceiling are Shiki's per-language TextMate grammars
    // (the C++ one is the largest at ~634 kB), each already lazy-loaded on demand as its own chunk.
    // They're irreducible single modules, so lift the ceiling just past the largest rather than
    // force-merging them (a manualChunks group here would fuse every grammar into one multi-MB blob).
    chunkSizeWarningLimit: 700,
  },
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
  },
})
