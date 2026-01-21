import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/manager.js'],
  format: ['esm'],
  target: 'esnext',
  platform: 'browser',
  splitting: true,
  minify: !options.watch,
  treeshake: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', '@storybook/icons'],
}));
