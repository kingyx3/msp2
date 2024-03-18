// buildAssetLinks.js

const fs = require('fs');

// Load environment-specific configuration
const { envVars } = require('./envConfig');

// Template assetlinks.json file
try {
    assetLinksTemplate = require('./assetlinksTemplate.json');
    console.log('JSON file loaded successfully.');
} catch (error) {
    console.error('Error loading JSON file:', error);
}
// Replace placeholders with actual values
assetLinksTemplate[0].target.package_name = envVars.packageName;
assetLinksTemplate[0].target.sha256_cert_fingerprints = [envVars.sha256CertFingerprint];

// Write the modified assetlinks.json file to public directory
fs.writeFileSync('./public/.well-known/assetlinks.json', JSON.stringify(assetLinksTemplate, null, 2));

console.log('Asset links file generated successfully.');