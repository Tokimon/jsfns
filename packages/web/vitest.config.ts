import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '../../vitest.config.base.ts';

export default mergeConfig(
	baseConfig,
	defineConfig({
		plugins: [tsconfigPaths()],
		test: {
			include: ['tests/*.test.ts'],
			environment: 'jsdom',
			pool: 'vmThreads',
			setupFiles: ['./vitest.setup.ts'],
			coverage: {
				include: ['src/*.ts'],
				exclude: ['src/types.d.ts'],
			},
		},
	}),
);
