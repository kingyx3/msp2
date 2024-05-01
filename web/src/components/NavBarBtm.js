// NavBarBtm.js
import React from 'react';
import { Link } from 'react-router-dom';
import { envVars } from '../envConfig';

const currentYear = new Date().getFullYear();

const NavBarBtm = () => {
    return (
        <footer style={styles.footer}>
            <p>&copy; {currentYear} {envVars.REACT_APP_NAME} · <Link to="/policies" style={styles.link}> Policies</Link></p>
        </footer>
    );
};

const styles = {
    // nav: {
    //     background: 'purple',
    //     position: 'fixed',
    //     bottom: '0', // Move to the bottom of the screen
    //     width: '100%',
    //     zIndex: '999',
    // },
    footer: {
        textAlign: 'left',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'purple',
        zIndex: '999',
        fontSize: '14px',
        padding: '5px 10px', // Add padding for spacing
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '14px', // Slightly smaller font for the footer text
    },
};

export default NavBarBtm;
