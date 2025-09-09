module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './src/components',
          '@assets': './assets',
          '@utils': './src/utils',
          '@screens': './src/screens',
          '@store': './src/store',
          '@hooks': './src/hooks',
          '@navigation': './src/navigation',
          '@theme': './src/theme',
        },
      },
    ],
  ],
};
