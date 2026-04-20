import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split stable third-party libraries into their own long-lived chunks.
        // App code changes won't invalidate these, so repeat visitors keep them cached.
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("/react-dom/") || id.match(/\/react\/[^/]*$/) || id.includes("/react/index") || id.includes("/scheduler/")) {
            return "vendor-react";
          }
          if (id.includes("react-router") || id.includes("@remix-run/router") || id.includes("/history/")) {
            return "vendor-router";
          }
          if (id.includes("@supabase/")) {
            return "vendor-supabase";
          }
          if (id.includes("@tanstack/")) {
            return "vendor-tanstack";
          }
          if (id.includes("framer-motion") || id.includes("/motion-dom/") || id.includes("/motion-utils/")) {
            return "vendor-motion";
          }
          if (id.includes("@radix-ui/")) {
            return "vendor-radix";
          }
          if (id.includes("lucide-react")) {
            return "vendor-icons";
          }
          return undefined;
        },
      },
    },
  },
}));
