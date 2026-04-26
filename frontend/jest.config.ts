import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    // stub css and static imports
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/fileMock.js',
    // stub html2pdf.js (browser-only, not needed in unit tests)
    'html2pdf\\.js': '<rootDir>/__mocks__/html2pdfMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default config;
