import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

import jopSoftwarecookieconsent from "@jop-software/astro-cookieconsent";

// https://astro.build/config
export default defineConfig({
  site: "https://www.tomloake.com",
  integrations: [
    mdx(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    jopSoftwarecookieconsent({
      gui_options: {
        consent_modal: {
          layout: "cloud", // box/cloud/bar
          position: "bottom center", // bottom/middle/top + left/right/center
          transition: "slide", // zoom/slide
          swap_buttons: false, // enable to invert buttons
        },
        settings_modal: {
          layout: "box", // box/bar
          // position: 'left',           // left/right
          transition: "slide", // zoom/slide
        },
      },
    }),
  ],
});
