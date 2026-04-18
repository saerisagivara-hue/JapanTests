import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.japanesetrainer.app',
  appName: 'Японский тренажёр',
  webDir: 'out',
  android: {
    webContentsDebuggingEnabled: true,
    allowMixedContent: true,
  },
  server: {
    androidScheme: 'https',
    hostname: 'localhost',
    allowNavigation: ['*'],
  },
};

export default config;
