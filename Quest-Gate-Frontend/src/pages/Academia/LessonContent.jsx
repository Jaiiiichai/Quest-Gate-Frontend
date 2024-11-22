import { useLocation } from 'react-router-dom'; // Import useLocation
import styles from './LessonContent.module.css';
import backButton from '../../assets/Quest/backbutton.png';
import { Link } from 'react-router-dom';

function LessonContent() {
    const location = useLocation(); // Get data from the previous page
    const { lessonName, lessonContent } = location.state || {}; // Destructure the lesson data

    // Function to convert newlines (\n) to <br /> tags
    const formatContent = (content) => {
        if (content) {
            return content.split('\n').map((line, index) => (
                <span key={index}>{line}<br /></span>
            ));
        }
        return 'No content available.';
    };

    return (
        <div className={styles.container}>
            <Link to="/town">
                <img src={backButton} alt="Back to Town" className={styles.backbutton} />
            </Link>
            <div className={styles.lessonCon}>
                <div className={styles.lessonTitle}>{lessonName || 'Lesson Title'}</div>
                <div className={styles.lessonContentContainer}>
                    {formatContent(lessonContent)}
                </div>
                <button className={styles.takeQuizBut}>Take Quiz</button>
            </div>
        </div>
    );
}

export default LessonContent;
