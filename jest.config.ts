export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__ tests __/__mocks__/fileMock.js',
        '\.(css|less|scss)$': '<rootDir>/src/__ tests __/__mocks__/styleMock.js'
    },
}
