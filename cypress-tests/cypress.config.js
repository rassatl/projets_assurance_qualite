// cypress.config.js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    setupNodeEvents(on, config) {
      // Implémenter les événements Node si nécessaire
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
})