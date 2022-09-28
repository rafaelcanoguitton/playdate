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
    intentFilters: [
      {
        action: "VIEW",
        data: [
          {
            scheme: "https",
            host: "play-date-api.up.railway.app",
            pathPrefix: "/api",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  ios: {
    infoPlist: {
      UIUserInterfaceStyle: "Light",
    },
    bundleIdentifier: "com.playdate",
    associatedDomains: ["applinks:play-date-api.up.railway.app"],
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
