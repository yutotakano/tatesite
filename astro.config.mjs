// @ts-check
import { defineConfig } from 'astro/config';
import { verticalMarkdownPlugin } from "./src/plugins/rehypeVerticalMarkdown";

// https://astro.build/config
export default defineConfig({
  integrations: [{
    name: 'vertical-text-plugin-reload',
    hooks: {
      'astro:config:setup': ({ addWatchFile, config }) => {
        addWatchFile(new URL("./src/plugins/rehypeVerticalMarkdown.ts", config.root));
      }
    }
  }],
  markdown: {
    rehypePlugins: [verticalMarkdownPlugin]
  },
});
