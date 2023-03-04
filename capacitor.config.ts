/// <reference types="@capacitor/splash-screen" />
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'shopping-app',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "large"
    },
  },
};

export default config;
