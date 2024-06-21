import { IconButton } from '@storybook/components';
import { useParameter, useStorybookApi } from '@storybook/manager-api';
import React from 'react';

import { ADDON_ID } from './constants';

/**
 * Appends URL with the base URL if it is not an absolute URL
 *
 * @param {string} baseURL
 * @param {string} url
 * @returns {string} the prepended URL
 */
function prependURL(baseURL, url) {
  if (!baseURL || url.startsWith('http')) {
    return url;
  }

  // Remove trailing slash from baseURL and leading slash from url
  return `${baseURL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}

/**
 * Auto generate a github URL based on the stories name
 *
 * @param {import('@storybook/manager-api').API} storybookApi
 * @param {string} baseURL
 * @returns {string | void} the auto generated url or void if it cannot be generated
 */
function autoGenerateURL(storybookApi, baseURL) {
  const story = storybookApi.getCurrentStoryData();

  if (!story || !baseURL) {
    return;
  }

  const componentPathParts = story.title.split('/');
  const path = componentPathParts
    .map((item) => item.toLowerCase().replace(/\s/g, '-'))
    .join('/');
  const url = prependURL(baseURL, path);
  return url;
}

export default function GithubLink() {
  const api = useStorybookApi();
  const parameters = useParameter(ADDON_ID, {
    baseURL: '',
    auto: false,
    url: '',
    enabled: true,
  });

  if (parameters.enabled === false || (!parameters.auto && !parameters.url)) {
    return null;
  }

  const url = parameters.url
    ? prependURL(parameters.baseURL, parameters.url)
    : autoGenerateURL(api, parameters.baseURL);

  if (!url) {
    return null;
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <IconButton asChild>
        <svg
          focusable="false"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
          aria-label="GitHub source code"
          style={{ padding: '0 5px' }}
        >
          <path
            fill="currentColor"
            d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"
          />
        </svg>
      </IconButton>
    </a>
  );
}
