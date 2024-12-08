import { useState } from 'react';
import axios from 'axios';
import styles from './SignupPage.module.css';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    // Step 1: Define state to store form data
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); 

    // Step 2: Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        setLoading(true); // Show loading spinner or message
        setError(null); // Reset error state
        setSuccessMessage(''); // Reset success message

        try {
            // Step 3: POST request to send form data to server
            const response = await axios.post('http://localhost:3000/api/user', {
                username: username,
                email: email,
                password: password,
            });

            // If signup is successful, you can set success message or handle user data
            setSuccessMessage('Signup successful');
            navigate('/login'); 
            console.log(response.data);  // Handle the server's response
        } catch (err) {
            setError('Signup failed. Please try again later.');
            console.log(err)
        } finally {
            setLoading(false); // Stop loading spinner after request is complete
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginform}>
                <h2>Get Started Now!!</h2>
              
                {/* Step 5: Form to capture username, email, and password */}
                <form onSubmit={handleSubmit}>
                    <div className={styles.formgroup}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}  // Capture username input
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  // Capture email input
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}  // Capture password input
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                  
                {/* Step 4: Display success/error messages */}
                {error && <div className={styles.error}>{error}</div>}
                {successMessage && <div className={styles.success}>{successMessage}</div>}

            </div>
        </div>
    );
}

export default SignupPage;
