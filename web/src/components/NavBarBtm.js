// NavBarBtm.js
import React from 'react';
import { Link } from 'react-router-dom';
import { envVars } from '../envConfig';

const currentYear = new Date().getFullYear();

const NavBarBtm = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.footer}>
                © {currentYear} {envVars.REACT_APP_NAME} · <Link to="/policies" style={styles.link}> Policies </Link> ·
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
    link: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '14px', // Slightly smaller font for the footer text
    },
};

export default NavBarBtm;
