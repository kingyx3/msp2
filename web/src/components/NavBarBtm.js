// NavBarBtm.js
import React from 'react';
import { Link } from 'react-router-dom';
import { envVars } from '../envConfig';

const currentYear = new Date().getFullYear();

const NavBarBtm = () => {
    return (
        <footer style={styles.footer}>
            <p>   &copy; {currentYear} {envVars.REACT_APP_NAME} · <Link to="/policies" style={styles.link}> Policies</Link></p>
        </footer>
    );
};

const styles = {
    footer: {
        textAlign: 'left',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'purple',
        zIndex: '999',
        fontSize: '14px',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '14px', // Slightly smaller font for the footer text
    },
};

export default NavBarBtm;
