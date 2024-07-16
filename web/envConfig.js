const envVars = process.env.REACT_APP_NODE_ENV === "PROD"
    ? {
        packageName: "com.makeshiftplans.android",
        sha256CertFingerprint: "23:D7:08:93:D5:EC:9F:0D:19:6F:3C:19:4C:E2:F9:B0:C6:88:72:50:85:F2:F2:DC:81:D2:01:37:32:CB:F8:36",
    } : {
        packageName: "com.makeshiftplans.androiddev",
        sha256CertFingerprint: "1F:A3:B7:42:AA:FD:76:9B:7B:40:1B:C7:75:8D:F9:1A:8B:83:42:08:05:DB:53:EE:61:92:D8:AF:1D:58:71:7F",
    }
module.exports = { envVars }