import { resolve } from "node:path";
import { defineConfig } from "vite";
import htmlMinifier from "vite-plugin-html-minifier";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
			input: {
				main: resolve(__dirname, "src/index.html"),
				validator: resolve(__dirname, "src/Validator/index.html"),
				templates: resolve(__dirname, "src/Templates/index.html"),
        about: resolve(__dirname, "src/About/index.html"),
			},
		},
	},
	server: {
		open: true,
		host: true,
	},
	plugins: [
		htmlMinifier(),

		viteStaticCopy({
			targets: [
				{
					src: "data.json",
					dest: ".",
					transform(content) {
						return JSON.stringify(JSON.parse(content.toString()));
					},
        },
        {
          src: 'images',
          dest: '.',
        },
        {
          src: 'Templates/*.json',
          dest: 'Templates/',
          transform(content) {
						return JSON.stringify(JSON.parse(content.toString()));
					},
        },
      ],
    }),
  ],
});