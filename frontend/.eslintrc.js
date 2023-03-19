module.exports = {
  extends: [
    '../.eslintrc.json',
    'prettier/@typescript-eslint',
    'prettier',
    'plugin:@roq/frontendConfig',
    'plugin:@roq/commonConfig',
  ],
  ignorePatterns: ['!**/*', 'doc-gen.js', 'src/styleguide/**/*', 'cypress/**/*'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
    ],
    '@roq/no-invalid-common-component-naming': ['error', ['select']],
    '@roq/no-invalid-dirname': ['error', { casing: 'lowerCased', allowedSeparator: 'any', noNumerics: false }],
    '@roq/no-use-deprecated-modules': ['warn', ['moment', 'request']],
  },
  overrides: [
    {
      files: ['src/pages/**/*'],
      rules: {
        '@roq/no-invalid-page-resource': 'off',
      },
    },
  ],
  plugins: ['@roq'],
};
