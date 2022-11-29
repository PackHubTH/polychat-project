module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
        'react-native/react-native': true,
    },
    'extends': ['eslint:recommended', 'plugin:react/recommended'],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parser': '@babel/eslint-parser',
    'parserOptions': {
        //'ecmaFeatures': { 'jsx': true },
        //'ecmaVersion': 2018,
        //'sourceType': 'module'
    },
    'plugins': ['react', 'react-native'],
    'rules': {
        // eslint:recommended rules
        'indent': ['warn', 4],
        'linebreak-style': ['warn', 'unix'],
        'quotes': ['warn', 'single'],
        'semi': ['error', 'always'],
        'eqeqeq': 'off',
        'spaced-comment': 'off',
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off',
        'no-plusplus': 'off',
        'padded-blocks': [ 'warn', {
            classes: "always"
        }],


    }
}