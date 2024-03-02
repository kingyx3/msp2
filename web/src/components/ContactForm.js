import React, { useState } from 'react';
import { functions } from './Firebase/FirebaseConfig';
import { httpsCallable } from 'firebase/functions';

const ContactForm = () => {
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('general');
    const [comments, setComments] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comments) {
            try {
                const createFeedbackLog = httpsCallable(functions, 'createFeedbackLog');
                const response = await createFeedbackLog({ email, category, comments });
                console.log('Response:', response.data);
                // alert('Email sent successfully!');
            } catch (error) {
                console.error('Error sending email:', error);
                // alert('Failed to send email. Please try again later.');
            }
            setComments('')
        } else {
            // alert('Please add a comment!');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <label style={styles.label}>
                    Email<span style={{ color: 'red' }}>*</span>:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                </label>
                <label style={styles.label}>
                    Category:
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
                        <option value="general">General Enquiry</option>
                        <option value="partnership">Partnership (Hosts)</option>
                        <option value="delete-account">Request to Delete Account</option>
                    </select>
                </label>
                <label style={styles.label}>
                    Comments:
                    <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        rows={4}
                        cols={50}
                        placeholder="Enter your comments here"
                        style={styles.input}
                    />
                </label>
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'left', // Align contents to the left
    },
    label: {
        display: 'block',
        marginBottom: '10px',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginTop: '5px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box', // Include padding and border in the total width
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default ContactForm;