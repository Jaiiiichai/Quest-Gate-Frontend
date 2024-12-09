import { useLocation } from 'react-router-dom'; // Import useLocation for accessing the location
import styles from './LessonContent.module.css';
import backButton from '../../assets/Quest/backbutton.png';
import { Link } from 'react-router-dom';

function LessonContent() {
    const location = useLocation(); // Get data from the previous page
    const { lessonName, lessonContent, lessonId } = location.state || {}; // Destructure lesson data
    console.log(lessonId)
    console.log(lessonName)

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

                {/* Pass lesson_id as part of the URL for the quiz page */}
                <Link to="/quiz" state = {{lessonId: lessonId}}>
                    <button className={styles.takeQuizBut}>Take Quiz</button>
                </Link>
            </div>
        </div>
    );
}

export default LessonContent;
