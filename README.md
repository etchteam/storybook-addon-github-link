# Storybook Addon Github Link

A Storybook Addon to add a link to Github source code for each story.

## Installation

```sh
npm install @etchteam/storybook-addon-github-link --save-dev
```

## Storybook setup

Create a file called `main.js` in your `.storybook` config folder.

Add the following content to it:

```js
export default {
  addons: ['@etchteam/storybook-addon-github-link']
}
```

Then create a file called `preview.js` in the same folder to setup configuration [parameters](https://storybook.js.org/docs/react/writing-stories/parameters) for the addon.

```js
export default {
  parameters: {
    githubLink: {
      baseURL: 'https://github.com/your-org/your-repo/src/components/',
      auto: true,
    }
  }
}
```

## Global parameters

These global parameters are suggested to be added globally in the .storybook/preview file but they can also be used per story to override the global setup.

| Name | Type | Default |
| --- | --- | --- |
| `baseURL` | `string` | `undefined` |
| `auto` | `boolean` | `false` |

### Base URL

The URL that all other paths will be prepended with.

> [!NOTE]
> This parameter is required for the `auto` option to be enabled.

### Auto

Auto generate URLs based on the current story being viewed.

By default URLs will be generated from the stories title, for example this is what will happen to a story with the title `Controls/Base/Info button`:

- "Controls/" will be removed
- "Base/Info button" will be transformed to lower kebab case "base/info-button"
- The `baseURL` will be prepended to form the full URL

> [!NOTE]
> If the `auto` parameter is not provided then the Github link will only appear for individual stories that have a `url` parameter.

## Story parameters

| Name | Type | Default |
| --- | --- | --- |
| `url` | `string` | `undefined` |
| `enabled` | `boolean` | `true` |

### URL

The link can be overridden on a per story basis, if `auto` is not set to true then the Github link will only appear for stories that have this parameter set.

If a sub-path is detected like `/make-better-software` then the global `baseURL` parameter will be inherited.

```jsx
export default {
  title: 'BetterSoftwareLink',
  parameters: {
    githubLink: {
      url: '/make-better-software'
    }
  },
};

export const Default = () => (
  <a href="https://makebetter.software">Make Better Software</a>
);
```

### Enabled

Setting this parameter to `false` will stop the Github link appearing for the story.

---

Made with ☕ at [Etch](https://etch.co)
