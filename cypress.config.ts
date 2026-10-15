import { defineConfig } from 'cypress'

export default defineConfig({
  defaultBrowser: 'chrome',
  e2e: {
    baseUrl: 'http://localhost:4200'
  }
})
