const nextTranslate = require('next-translate')

module.exports = nextTranslate({
	images: {
		domains: ['media.graphcms.com'],
	},
	webpack: (config) => {
		return Object.assign({}, config, {
			externals: [...config.externals, 'fs'],
			module: Object.assign({}, config.module, {
				rules: config.module.rules.concat([
					{
						test: /\.md$/,
						loader: 'emit-file-loader',
						options: {
							name: 'dist/[path][name].[ext]',
						},
					},
					{
						test: /\.md$/,
						loader: 'raw-loader',
					},
				]),
			}),
		})
	},
})
