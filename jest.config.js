module.exports = {
	clearMocks: true,
	setupFilesAfterEnv: ['./jest.setup.js'],
	moduleNameMapper: {
		'^@components(.*)$': '<rootDir>/components$1',
		'^@utils(.*)$': '<rootDir>/utils$1',
		'\\.(css|less)$': '<rootDir>/test/jest/__mocks__/styleMock.js',
	},
}
