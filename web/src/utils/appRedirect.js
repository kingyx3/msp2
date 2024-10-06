// Function to check if the user is on a mobile device
export const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
};

// Function to handle deep linking and store redirection
export const redirectToApp = () => {
    const appStoreLink = process.env.REACT_APP_APPSTORE_LINK; // Replace with your App Store link
    const playStoreLink = process.env.REACT_APP_PLAYSTORE_LINK; // Replace with your Play Store link

    // Check if it's a mobile device
    if (isMobileDevice()) {
        // AASA & ASSETLINKS are setup to redirect to apps if they are installed.

        // Fallback to App Store or Play Store after 1 second if the app isn't installed
        setTimeout(() => {
            const isAndroid = /Android/i.test(navigator.userAgent);
            const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

            if (isIOS) {
                window.location.href = appStoreLink;
            } else if (isAndroid) {
                window.location.href = playStoreLink;
            }
        }, 1000); // Adjust the timeout if necessary
    }
};
