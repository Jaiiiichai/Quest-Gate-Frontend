import styles from './LoginPage.module.css';

function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles.loginform}>
                <h1>Welcome Back!</h1>
                <p>Enter your credentials to access your account</p>
                <form>
                    <div className={styles.formgroup}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
