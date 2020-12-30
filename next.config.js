const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  images: {
    domains: ['media.graphcms.com']
  },
  functions: {
    'api/image.js': {
      includeFiles: '**/*.js'
    }
  }
})
