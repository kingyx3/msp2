import React from 'react';

const ReturnScreen = () => {
    return (
        <div style={styles.container}>
            <img src="/icon.png" alt="Makeshiftplans" style={styles.logo} />
            <p style={styles.message}>Please close this window and return to the mobile app.</p>
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
    message: {
        fontSize: '18px',
        color: '#333',
    }
};

export default ReturnScreen;
