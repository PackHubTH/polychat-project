module.exports = {
   settings: {
      react: {
         version: 'detect',
      },
   },
   env: {
      browser: true,
      es6: true,
      node: true,
      'react-native/react-native': true,
   },
   extends: ['eslint:recommended', 'plugin:react/recommended'],
   globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
   },
   parser: '@babel/eslint-parser',
   parserOptions: {},
   plugins: ['react', 'react-native'],
   rules: {
      indent: ['warn', 4],
      'linebreak-style': 'off',
      quotes: ['warn', 'single'],
      semi: ['error', 'always'],
      eqeqeq: 'off',
      'spaced-comment': 'off',
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-await-in-loop': 'off',
      'no-restricted-syntax': 'off',
      'no-plusplus': 'off',
      'padded-blocks': [
         'warn',
         {
            classes: 'always',
         },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
   },
};
