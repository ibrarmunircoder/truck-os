if (process.env.hasOwnProperty('NEW_RELIC_APP_NAME') && process.env.hasOwnProperty('NEW_RELIC_LICENSE_KEY')) {
  console.log('New Relic enabled');
  require('newrelic');
} else {
  console.log('New Relic disabled');
}
const withPlugins = require('next-compose-plugins');
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const { i18n } = require('./next-i18next.config');
const routes = require('./routes/localized');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE_WEBPACK_BUNDLE === 'true',
})

const pathnameToPattern = (pathname) =>
  pathname
    .replace(/\[(\w+)\]/, ':$1')
    .replace(/\[\[...(\w+)\]\]/, ':$1*')
    .replace(/\[...(\w+)\]/, ':$1*')
    .replace(/\[(\w+)\]/, ':$1*');

const rewrites = Object.keys(routes)
  .map((l) => {
    if (l === i18n.defaultLocale) return []; //exclude default locale
    return Object.entries(routes[l]).map(([name, { pathname }]) => ({
      source: `/${l}${pathnameToPattern(pathname)}`,
      destination: pathnameToPattern(routes[i18n.defaultLocale][name]?.pathname || pathname),
      locale: false,
    }));
  })
  .flat();

module.exports = withPlugins([withBundleAnalyzer], {
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  i18n,
  rewrites: () => rewrites,
  webpack(config, { dev, webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack'],
    });
    config.resolve.alias['lodash-es'] = path.resolve(
      __dirname,
      'node_modules',
      'lodash'
    );
    config.plugins.push(new webpack.ContextReplacementPlugin(
      /^date-fns[/\\]locale$/,
      new RegExp(`\\.[/\\\\](${i18n.dateFnsLocales.join('|')})[/\\\\]index\\.js$`)
    )
    )
    return config;
  },
  [PHASE_DEVELOPMENT_SERVER]: {
    env: {
      NEXTAUTH_URL: 'http://localhost:3000',
    },
  }
});
