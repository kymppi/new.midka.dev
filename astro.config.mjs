import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://new.midka.dev",
  integrations: [tailwind(), robotsTxt(), compress()],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
  experimental: {
    integrations: true,
  },
});
