import React from 'react';
import ContactForm from '../components/ContactForm';

const ContactFormScreen = () => {
    return (
        <div style={styles.container}>
            <img src="/icon.png" alt="Makeshiftplans" style={styles.logo} />
            <ContactForm />
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
    }
}

export default ContactFormScreen