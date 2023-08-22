module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@components/buttons': './src/common/components/buttons',
          '@components/flat-list': './src/common/components/flat-list',
          '@components/search': './src/common/components/search',
          '@components/helper-views': './src/common/components/helper-views',
          '@components/modals': './src/common/components/modals',
          '@components/inputs': './src/common/components/inputs',
          '@style': './src/style',
          '@constants': './src/constants',
          '@localization': './src/localization',
          '@navigation': './src/navigation',
          '@networking': './src/networking',
          '@keychain': './src/keychain',
        },
      },
    ],
  ],
};
