module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        indent: ['error', 2, { SwitchCase: 1 }],
        'react-native/no-unused-styles': 2,
        'react-native/no-inline-styles': 2,
        'react-native/no-color-literals': 2,
        'import/no-relative-parent-imports': 'error',
        'import/no-internal-modules': [
          'error',
          {
            forbid: [
              '**/common/components/*/**',
              '**/constants/**',
              '**/keychain/**',
              '**/localization/**',
              '**/navigation/**',
              '**/networking/**',
              '**/style/**',
            ],
          },
        ],
      },
    },
  ],
};
