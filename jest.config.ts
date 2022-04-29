export default {
  collectCoverageFrom: ['./src/components/**/*.{js,jsx,tsx}', '!**/node_modules/**', '!**/dist/**'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/dist', 'public', 'env'],
  verbose: true,
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/test.config.ts'],
}
