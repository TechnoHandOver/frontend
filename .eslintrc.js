module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'no-plusplus': 'off',
    'no-shadow': 'off',
    'camelcase': 'off',
    'arrow-body-style': 'off',
    'no-nested-ternary': 'off',
    'func-names': 'error',
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'], // Убрал из списка запрет на for in, for of
    'import/prefer-default-export': 'off', // Отключить предпочтение для дефолтного экспорта
    'import/no-cycle': 'off',
    'react/no-danger': 'error',
    'react-hooks/rules-of-hooks': 'error', // Правила для хуков
    'react-hooks/exhaustive-deps': 'error',
    'react/prefer-stateless-function': 'error',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/explicit-member-accessibility': ['off', 'no-public'],
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/interface-name-prefix': 'off',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'ignore',
        'alphabetize': {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/extensions': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/alt-text': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/aria-activedescendant-has-tabindex': 'off',
    'jsx-a11y/aria-props': 'off',
    'jsx-a11y/aria-proptypes': 'off',
    'jsx-a11y/aria-role': 'off',
    'jsx-a11y/aria-unsupported-elements': 'off',
    'jsx-a11y/autocomplete-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/heading-has-content': 'off',
    'jsx-a11y/html-has-lang': 'off',
    'jsx-a11y/iframe-has-title': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/lang': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-access-key': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/no-distracting-elements': 'off',
    'jsx-a11y/no-interactive-element-to-noninteractive-role': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/no-onchange': 'off',
    'jsx-a11y/no-redundant-roles': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/role-has-required-aria-props': 'off',
    'jsx-a11y/role-supports-aria-props': 'off',
    'jsx-a11y/scope': 'off',
    'jsx-a11y/tabindex-no-positive': 'off',
  },
  overrides: [
    {
      files: '*.{js,jsx,stories.ts,stories.tsx}',
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: [
        'scripts/**/*',
        './rollup.config.js',
        './rollup.config.widget.js',
        './rollup.config.widgets.js',
        '.storybook/**/*',
        '*.stories.tsx',
        'postcss.config.js',
      ],
      env: {
        node: true,
      },
      rules: {
        'prefer-template': 'off',
        'prefer-destructuring': 'off',
        'import/order': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-dynamic-require': 'off',
        'consistent-return': 'off',
        'no-unreachable': 'off',
        'no-await-in-loop': 'off',
        'global-require': 'off',
        'no-continue': 'off',
      },
    },
  ],
};