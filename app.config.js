import "dotenv/config";

export default {
  name: "playdate",
  slug: "playdate",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.playdate",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  ios: {
    infoPlist: {
      UIUserInterfaceStyle: "Light",
    },
  },
  extra: {
    mode: "development",
    env: process.env.ENV,
    apiUrl:
      process.env.ENV === "development"
        ? process.env.API_URL_DEV
        : process.env.API_URL_PROD,
  },
  expo: {
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
    ],
    extra: {
      mode: "development",
      env: process.env.ENV,
      apiUrl:
        process.env.ENV === "development"
          ? process.env.API_URL_DEV
          : process.env.API_URL_PROD,
    },
    userInterfaceStyle: "light",
    android: {
      package: "com.playdate",
    },
  },
};
