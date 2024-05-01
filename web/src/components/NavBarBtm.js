// NavBarBtm.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBarBtm = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.footer}>
                <Link to="/privacy" style={styles.privacyLink}>© 2024 Airbnb, Inc. · Privacy</Link>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        background: 'purple',
        position: 'fixed',
        bottom: '0', // Move to the bottom of the screen
        width: '100%',
        zIndex: '999',
    },
    // ul: {
    //     listStyleType: 'none',
    //     margin: '0',
    //     padding: '10px 20px',
    //     display: 'flex',
    //     justifyContent: 'space-between', // Adjust for spacing on both ends
    // },
    // li: {
    //     marginLeft: '20px',
    // },
    // link: {
    //     textDecoration: 'none',
    //     color: 'white',
    //     fontSize: '16px',
    // },
    footer: {
        display: 'flex',
        justifyContent: 'space-between', // Align items to the sides
        alignItems: 'center',
        padding: '5px 10px', // Consistent padding with the list
    },
    privacyLink: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '14px', // Slightly smaller font for the footer text
    },
};

export default NavBarBtm;
