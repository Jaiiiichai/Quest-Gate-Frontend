import styles from './SignupPage.module.css';

function SignupPage() {
    return (
        <div className={styles.container}>
            <div className={styles.loginform}>
                <h2>Get Started Now!!</h2>
                <form>
                    <div className={styles.formgroup}>
                        <label htmlFor="email">Username:</label>
                        <input type="email" id="email" placeholder="Enter your username" />
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div className={styles.formgroup}>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" placeholder="Enter your password" />
                    </div>
                    <button type="submit">SignUp</button>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
