import { UserConfig, UserConfigExport, defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgx from '@svgx/vite-plugin-qwik';

export default defineConfig({
	plugins: [qwikCity({
		routesDir: 'source/routes',
		trailingSlash: false
	}), qwikVite({
		srcDir: 'source',
		client: {
			outDir: 'distribution'
		}
	}), tsconfigPaths(), svgx()]
});
