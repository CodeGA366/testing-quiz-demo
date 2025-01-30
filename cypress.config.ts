import { defineConfig } from 'cypress';
import customViteConfig from './vite.config';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {
        ...customViteConfig,
        server: {
          port:3002,
        },
      },
    },
    specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
    supportFile: 'cypress/support/e2e.ts', // Specify the path to your support file
    
  },

  e2e: {
    baseUrl: 'http://127.0.0.1:3001/',
    supportFile: 'cypress/support/e2e.ts', // Specify the path to your support file
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});