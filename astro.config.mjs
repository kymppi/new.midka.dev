import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";
import compress from "astro-compress";

// https://astro.build/config
import svelte from "@astrojs/svelte";

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
  }
});