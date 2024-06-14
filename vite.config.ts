/// <reference types="vite/client" />
import path, { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [react(), dts({ exclude: ['**/*.stories.tsx'] })],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/main.ts'),
			formats: ['es'],
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'react/jsx-runtime'],
			input: Object.fromEntries(
				globSync(['src/components/**/index.tsx', 'src/main.ts']).map((file) => {
					const entryName = path.relative(
						'src',
						file.slice(0, file.length - path.extname(file).length)
					);
					const entryUrl = fileURLToPath(new URL(file, import.meta.url));
					return [entryName, entryUrl];
				})
			),
			output: {
				entryFileNames: '[name].js',
				assetFileNames: 'assets/[name][extname]',
				globals: {
					react: 'React',
					'react-dom': 'React-dom',
					'react/jsx-runtime': 'react/jsx-runtime',
				},
			},
		},
	},
});
