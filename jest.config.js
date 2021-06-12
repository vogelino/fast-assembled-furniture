module.exports = {
	setupFilesAfterEnv: ['<rootDir>/utils/setupTests.ts'],
	moduleNameMapper: {
		'^@components(.*)$': '<rootDir>/components$1',
		'^@utils(.*)$': '<rootDir>/utils$1',
		'^@pages(.*)$': '<rootDir>/pages$1',
		'^@styles(.*)$': '<rootDir>/styles$1',
		'^@mocks(.*)$': '<rootDir>/mocks$1',
		'\\.css$': '<rootDir>/mocks/cssMock.ts',
	}
}
