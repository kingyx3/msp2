module.exports = () => {
  const associatedDomains = [
    `applinks:${(process.env.EXPO_PUBLIC_domain || '')}`,
    `applinks:${(process.env.EXPO_PUBLIC_altDomain || '')}`,
    `applinks:${(process.env.EXPO_PUBLIC_FB_authDomain || '')}`,
    `applinks:${(process.env.EXPO_PUBLIC_DLINK || '')}`,
    `applinks:${(process.env.EXPO_PUBLIC_APPSFLYER_ONELINK || '')}`,
  ]
  const uniqueDomains = [...new Set(associatedDomains)];

  return {
    "name": process.env.EXPO_PUBLIC_APP_SHORT_NAME,
    "scheme": "msp",
    "slug": "MSP",
    "platforms": [
      "ios",
      "android"
    ],
    "plugins": [
      "@config-plugins/detox",
      "expo-secure-store",
      ["react-native-appsflyer", { "shouldUseStrictMode": false }],
    ],
    "version": process.env.EXPO_PUBLIC_nativeApplicationVersion,
    "orientation": "portrait",
    "icon": "./app/assets/icon.png",
    "splash": {
      "image": "./app/assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0,
      "url": "https://u.expo.dev/8483e452-5b47-4c58-bc8d-ff820a0be9e1"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "This app needs access to your location to provide personalized recommendations and nearby features.",
        "NSPhotoLibraryUsageDescription": "This app needs access to your photo library to let you upload photos and personalize your profile.",
        "ITSAppUsesNonExemptEncryption": false,
        "UIUserInterfaceStyle": "Light",
        "FirebaseDynamicLinksCustomDomains": [
          "link.makeshiftplans.com"
        ],
        "LSMinimumSystemVersion": "14.0"
      },
      "supportsTablet": false,
      "bundleIdentifier": process.env.EXPO_PUBLIC_IOS_ID,
      "buildNumber": process.env.nativeBuildVersionIOS,
      "associatedDomains": uniqueDomains,
      "config": {
        "googleMapsApiKey": process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY
      }
    },
    "userInterfaceStyle": "automatic",
    "android": {
      "package": process.env.EXPO_PUBLIC_ANDROID_ID,
      "versionCode": process.env.nativeBuildVersionAndroid,
      "targetSdkVersion": 34,
      "adaptiveIcon": {
        "foregroundImage": "./app/assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "softwareKeyboardLayoutMode": "resize",
      "config": {
        "googleMaps": {
          "apiKey": process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY
        }
      },
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": process.env.EXPO_PUBLIC_domain,
              "pathPrefix": "/"
            }, {
              "scheme": "https",
              "host": process.env.EXPO_PUBLIC_altDomain,
              "pathPrefix": "/"
            }, {
              "scheme": "https",
              "host": process.env.EXPO_PUBLIC_FB_authDomain,
              "pathPrefix": "/"
            }, {
              "scheme": "https",
              "host": process.env.EXPO_PUBLIC_DLINK,
              "pathPrefix": "/"
            }, {
              "scheme": "https",
              "host": process.env.EXPO_PUBLIC_APPSFLYER_ONELINK,
              "pathPrefix": "/"
            },
          ],
          "category": [
            "BROWSABLE",
            "DEFAULT"
          ]
        }
      ]
    },
    "extra": {
      "eas": {
        "projectId": "8483e452-5b47-4c58-bc8d-ff820a0be9e1"
      }
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    },
    "owner": "kingyx3"
  }
}