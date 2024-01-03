import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

import jopSoftwarecookieconsent from "@jop-software/astro-cookieconsent";

// https://astro.build/config
export default defineConfig({
  site: "https://www.tomloake.com",
  integrations: [mdx(), sitemap(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), jopSoftwarecookieconsent()]
});