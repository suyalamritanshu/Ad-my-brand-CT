const { defineConfig } = require('cypress')

module.exports = defineConfig({
    
        projectId: "ne4q57",
        // ...rest of the Cypress project config
      
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})