import { useState } from 'react';
import axios from 'axios';
import styles from './LoginPage.module.css';
import { useAvatar } from '../../hooks/AvatarContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    // Step 1: Define state to store form data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const {login} = useAvatar();

    const navigate = useNavigate(); 
    // Step 2: Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        setLoading(true); // Show loading spinner or message
        setError(null); // Reset error state
        setSuccessMessage(''); // Reset success message
    
        try {
            // Step 3: POST request to send form data to server
            const response = await axios.post('http://localhost:3000/api/login', {
                email: email,
                password: password,
            });
    
            // Check if the login was successful and avatar_id exists
            if (response.data.avatar_id != null) {
                setSuccessMessage('Login successful!');
                const avatarId = response.data.avatar_id; // Get avatar_id from the response
                console.log('Avatar ID:', avatarId); 
                login(avatarId)// You can use this value for further actions, e.g., update state or redirect
                navigate('/town'); 
            } else {
                setError('Login failed. Please check your credentials and try again.');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
            console.log(err);
        } finally {
            setLoading(false); // Stop loading spinner after request is complete
        }
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.loginform}>
                <h1>Welcome Back!</h1>
                <p>Enter your credentials to access your account</p>
                
                {/* Step 4: Display success/error messages */}
                {error && <div className={styles.error}>{error}</div>}
                {successMessage && <div className={styles.success}>{successMessage}</div>}

                {/* Step 5: Form to capture email and password */}
                <form onSubmit={handleSubmit}>
                    <div className={styles.formgroup}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  // Capture input value
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
                            onChange={(e) => setPassword(e.target.value)}  // Capture input value
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
