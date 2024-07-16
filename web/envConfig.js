const envVars = process.env.REACT_APP_NODE_ENV === "PROD"
    ? {
        packageName: "com.makeshiftplans.android",
        sha256CertFingerprint: "23:D7:08:93:D5:EC:9F:0D:19:6F:3C:19:4C:E2:F9:B0:C6:88:72:50:85:F2:F2:DC:81:D2:01:37:32:CB:F8:36",
    } : {
        packageName: "com.makeshiftplans.androiddev",
        sha256CertFingerprint: "D8:DE:5D:C0:59:4D:04:84:74:1D:46:BC:7F:CC:BE:FB:ED:B2:FE:7F:21:93:27:35:B2:29:58:39:71:73:70:B4",
    }
module.exports = { envVars }