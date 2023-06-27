import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap(), react(), mdx()],
  site: "http://localhost:3000",
});

// TODO: https://github.com/sebholstein/astro-google-fonts-optimizer
