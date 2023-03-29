import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import compress from "astro-compress";

import svelte from "@astrojs/svelte";

// https://astro.build/config
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://new.midka.dev",
  integrations: [robotsTxt(), compress(), svelte()],
  vite: {
    ssr: {
      external: ["svgo"]
    }
  },
  experimental: {
    integrations: true
  },
  output: "server",
  adapter: vercel()
});