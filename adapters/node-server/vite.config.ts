import { nodeServerAdapter } from '@builder.io/qwik-city/adapters/node-server/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';

export default extendConfig(baseConfig as any, {
	build: {
		ssr: true,
		rollupOptions: {
			input: ['source/entry.node-server.tsx', '@qwik-city-plan']
		}
	},
	plugins: [nodeServerAdapter({
		name: 'node-server'
	})]
});
