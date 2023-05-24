import cloudflare from "solid-start-cloudflare-pages";
import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [solid({ adapter: cloudflare({}) })],
  server: {
    port: 2100,
    hmr: {
      port: 2100,
    },
  },
});
