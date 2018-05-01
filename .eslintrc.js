module.exports = {
  env: {
    browser: true,
    node: true,
    jquery: true,
    mocha: true
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'no-console': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 1,
    'global-require': 0,
    'import-order-autofix/order': 1,
    'prefer-destructuring': 1,
    'import/no-extraneous-dependencies': 0,
    'import/no-dynamic-require': 0,
    'import/extensions': [2, { vue: 'never' }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.vue'
        ]
      }
    }
  },
  parser: 'vue-eslint-parser',
  plugins: ['vue', 'json', 'import', 'import-order-autofix'],
};