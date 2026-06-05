import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '../src/theme';
import React from 'react';

const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href =
  'https://fonts.googleapis.com/css2?family=Noto+Sans+HK:wght@300;400;500;600;700&display=swap';
document.head.appendChild(fontLink);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
