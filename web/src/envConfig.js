export const envVars = process.env.REACT_APP_NODE_ENV === "PROD"
    ? {
        REACT_APP_NAME: "MakeShiftPlans",
        REACT_APP_TYPE: "PROD",
        REACT_APP_DLINK: "mspprod.page.link",
        REACT_APP_FB_apiKey: "AIzaSyDYMlWK4U1D-JoLHHu1yWM84p_GF3aQEhA",
        REACT_APP_FB_authDomain: "makeshiftplans-prod.firebaseapp.com",
        REACT_APP_FB_databaseURL: "https://makeshiftplans-prod-default-rtdb.asia-southeast1.firebasedatabase.app",
        REACT_APP_FB_projectId: "makeshiftplans-prod",
        REACT_APP_FB_storageBucket: "makeshiftplans-prod.appspot.com",
        REACT_APP_FB_messagingSenderId: 216928290796,
        REACT_APP_FB_appId: "1:216928290796:web:814c2544637cde605422c9",
    } : {
        REACT_APP_NAME: "MakeShiftPlans (DEV)",
        REACT_APP_TYPE: "DEV",
        REACT_APP_DLINK: "mspdev.page.link",
        REACT_APP_FB_apiKey: "AIzaSyCmMVqDNKg07ftVZwBGAAe8_6nuj0wo5Ho",
        REACT_APP_FB_authDomain: "makeshiftplans-dev.firebaseapp.com",
        REACT_APP_FB_databaseURL: "https://makeshiftplans-dev-default-rtdb.asia-southeast1.firebasedatabase.app",
        REACT_APP_FB_projectId: "makeshiftplans-dev",
        REACT_APP_FB_storageBucket: "makeshiftplans-dev.appspot.com",
        REACT_APP_FB_messagingSenderId: 505686398711,
        REACT_APP_FB_appId: "1:505686398711:web:2bdf7092493c5f0a5ae5f2",
    }