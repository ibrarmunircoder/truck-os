const { i18n } = require('./next-i18next.config');
class CustomLexer {
  constructor(options) {
    this.fileNames = options.fileNames;
  }
  extract(content, fileName) {
    this.fileExists = this.fileNames.find((f) => fileName.endsWith(f));
    const returnKeys = [];
    if (this.fileExists) {
      let matchedStrings = content.match(/((?:'|").*(?:'|"))/g);
      if (matchedStrings && matchedStrings.length > 0) {
        matchedStrings.forEach((k) => returnKeys.push({ key: k.replace(/'|"/g, '') }));
      }
    }
    return returnKeys;
  }
  on() {}
}

const supportedLocales = i18n.locales;
module.exports = {
  createOldCatalogs: false,
  defaultNamespace: 'common',
  keepRemoved: false,
  locales: supportedLocales,
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  failOnWarnings: false,
  verbose: false,
  useKeysAsDefaultValue: true,
  lexers: {
    ts: [
      {
        lexer: 'JavascriptLexer',
        functions: ['t'],
      },
      {
        lexer: CustomLexer,
        fileNames: ['translation-mapping.ts'],
      },
    ],
  },
};
