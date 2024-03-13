import React from 'react';
import { envVars } from '../envConfig';

const Home = () => {
    return (
        <div style={styles.container}>
            <img src="/icon.png" alt="MakeShiftPlans" style={styles.logo} />
            <h1>Welcome to MakeShiftPlans</h1>
            <p>Find the perfect space for your needs</p>
            <div style={styles.downloadLinks}>
                <a href="https://play.google.com/store/apps/details?id=com.makeshiftplans.android">
                    <img src="google-play-icon.png" alt="Download on Google Play" style={styles.appStoreBadge} />
                </a>
                {/* <a href="https://apps.apple.com/app/yourapp">
          <img src="apple-store-icon.png" alt="Download on the App Store" style={styles.appStoreBadge} />
        </a> */}
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '100px',
    },
    logo: {
        width: '200px', // Adjust the width as needed
        marginBottom: '20px', // Add some space below the logo
    },
    downloadLinks: {
        marginTop: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appStoreBadge: {
        width: '150px',
        marginRight: '20px',
    },
};

export default Home;


// After editing the react files in /src
// Run "npm ci" to install dependencies
// Run "npm run build" to build into html/css in the build folder
// Run "firebase deploy" to deploy to website