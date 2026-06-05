/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FintechDesignSystem',
      fileName: format => `perryui.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@mui/material'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mui/material': 'MUI'
        }
      }
    }
  },
  test: {
    projects: [
      {
        // Unit tests — jsdom environment
        test: {
          name: 'unit',
          include: ['packages/components/src/**/*.test.tsx', 'packages/components/src/**/*.test.ts'],
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./vitest.setup.ts'],
          alias: {
            '@': resolve(__dirname, 'packages/components/src'),
          },
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          storybookTest({
            configDir: path.join(dirname, 'packages/components/.storybook')
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }]
          }
        }
      }
    ]
  }
});