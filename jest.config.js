module.exports = {
  setupFilesAfterEnv: ['<rootDir>/utils/setupTests.ts'],
	moduleNameMapper: {
		'^@components(.*)$': '<rootDir>/components$1',
		'^@utils(.*)$': '<rootDir>/utils$1',
		'\\.css$': '<rootDir>/mocks/cssMock.ts',
	}
}
