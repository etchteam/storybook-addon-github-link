const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs', import.meta.resolve('./local-preset.js')],
  framework: '@storybook/react-vite',
};

export default config;
