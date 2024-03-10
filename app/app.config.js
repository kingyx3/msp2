//
module.exports = {
  "name": process.env.EXPO_PUBLIC_APP_SHORT_NAME,
  "scheme": "msp",
  "slug": "MSP",
  "platforms": [
    "ios",
    "android"
  ],
  "plugins": [
    "@config-plugins/detox"
  ],
  "version": process.env.nativeApplicationVersion,
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
      "UIUserInterfaceStyle": "Light",
      "FirebaseDynamicLinksCustomDomains": [
        "link.makeshiftplans.com"
      ]
    },
    "supportsTablet": false,
    "bundleIdentifier": process.env.IOS_ID,
    "buildNumber": "40",
    "associatedDomains": [
      "applinks:makeshiftplans.com",
      "applinks:mspdev.page.link",
      "applinks:mspprod.page.link",
      "applinks:makeshiftplans-dev.firebaseapp.com",
      "applinks:makeshiftplans-prod.firebaseapp.com"
    ],
    "config": {
      "googleMapsApiKey": process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY
    }
  },
  "userInterfaceStyle": "automatic",
  "android": {
    "package": process.env.ANDROID_ID,
    "versionCode": "40",
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
            "host": "mspdev.page.link",
            "pathPrefix": "/"
          },
          {
            "scheme": "https",
            "host": "mspprod.page.link",
            "pathPrefix": "/"
          },
          {
            "scheme": "https",
            "host": "makeshiftplans-dev.firebaseapp.com",
            "pathPrefix": "/"
          },
          {
            "scheme": "https",
            "host": "makeshiftplans-prod.firebaseapp.com",
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
