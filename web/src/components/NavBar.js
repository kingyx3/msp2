// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <ul style={styles.ul}>
                <li style={styles.li}>
                    <Link to="/" style={styles.link}>Home</Link>
                </li>
                <li style={styles.li}>
                    <Link to="/policies" style={styles.link}>Policies</Link>
                </li>
                <li style={styles.li}>
                    <Link to="/contact-us" style={styles.link}>Contact Us</Link>
                </li>
            </ul>
        </nav>
    );
};

const styles = {
    nav: {
        background: 'purple',
        position: 'fixed',
        top: '0',
        width: '100%', // Extend across the top of the screen
        zIndex: '999', // Ensure it's above other content
    },
    ul: {
        listStyleType: 'none',
        margin: '0',
        padding: '10px 20px', // Add padding for spacing
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align list items to the right
    },
    li: {
        marginLeft: '20px', // Add margin between list items
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '16px',
    },
};

export default Navbar;
