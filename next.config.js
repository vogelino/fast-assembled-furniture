const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  images: {
    domains: ['media.graphcms.com']
  },
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de'
  }
})
