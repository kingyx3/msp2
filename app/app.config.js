module.exports = {
  "name": process.env.EXPO_PUBLIC_APP_SHORT_NAME,
  "scheme": "msp",
  "slug": "MSP",
  "platforms": [
    "ios",
    "android"
  ],
  "plugins": [
    "@config-plugins/detox",
    "expo-secure-store"
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
      "ITSAppUsesNonExemptEncryption": false,
      "UIUserInterfaceStyle": "Light",
      "FirebaseDynamicLinksCustomDomains": [
        "link.makeshiftplans.com"
      ]
    },
    "supportsTablet": false,
    "bundleIdentifier": process.env.EXPO_PUBLIC_IOS_ID,
    "buildNumber": process.env.nativeBuildVersionIOS,
    "associatedDomains": [
      "applinks:makeshiftplans.com",
      "applinks:" + process.env.EXPO_PUBLIC_FB_authDomain,
    ],
    "config": {
      "googleMapsApiKey": process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY
    }
  },
  "userInterfaceStyle": "automatic",
  "android": {
    "package": process.env.EXPO_PUBLIC_ANDROID_ID,
    "versionCode": process.env.nativeBuildVersionAndroid,
    "targetSdkVersion" : 34,
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
            "host": "makeshiftplans.com",
            "pathPrefix": "/"
          },
          {
            "scheme": "https",
            "host": process.env.EXPO_PUBLIC_FB_authDomain,
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
