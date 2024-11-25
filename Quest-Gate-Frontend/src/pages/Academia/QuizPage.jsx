import { useEffect, useState } from 'react'; // Import hooks
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom'; // Import useLocation
import styles from './QuizPage.module.css'; // Assuming you have the styling for this page
import backButton from '../../assets/Quest/backbutton.png';

function LessonContent() {
  const location = useLocation(); // Get location from the router
  const { lessonId } = location.state || {}; // Destructure lesson_id from location state

  const [quizzes, setQuizzes] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected answers
  const [score, setScore] = useState(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  console.log(lessonId);

  // Fetch quizzes data from the backend
  useEffect(() => {
    if (lessonId) {  // Ensure lesson_id exists before making the request
      axios.get(`http://localhost:3000/api/quizzes/${lessonId}`)
        .then(response => {
          setQuizzes(response.data.data); // Store quizzes data in state
        })
        .catch(error => {
          console.error('Error fetching quizzes:', error);
        });
    }
  }, [lessonId]);

  // Handle answer selection
  const handleAnswerChange = (quiz_id, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [quiz_id]: answer
    }));
  };

  // Handle submit
  const handleSubmit = () => {
    let correctAnswersCount = 0;

    quizzes.forEach(quiz => {
      if (selectedAnswers[quiz.quiz_id] === quiz.correct_answer) {
        correctAnswersCount++;
      }
    });

    setScore(correctAnswersCount); // Set the score
    setShowModal(true); // Show the modal
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <Link to="/town">
        <img src={backButton} alt="Back to Town" className={styles.backbutton} />
      </Link>
      <div className={styles.quizcon}>
        <h1>Quiz for Lesson {lessonId}</h1>
        <div className={styles.quizContainer}>
          {quizzes.length === 0 ? (
            <p>Loading quizzes...</p>
          ) : (
            quizzes.map(quiz => (
              <div key={quiz.quiz_id} className={styles.quizCard}>
                <p className={styles.question}>{quiz.question}</p>
                <div className={styles.choices}>
                  {quiz.choices.map((choice, index) => (
                    <div
                      key={index}
                      className={`${styles.choiceBox} ${
                        selectedAnswers[quiz.quiz_id] === choice ? styles.selected : ""
                      }`}
                      onClick={() => handleAnswerChange(quiz.quiz_id, choice)} // Select answer on click
                    >
                      <input
                        type="radio"
                        name={`quiz-${quiz.quiz_id}`}
                        value={choice}
                        checked={selectedAnswers[quiz.quiz_id] === choice}
                        onChange={() => handleAnswerChange(quiz.quiz_id, choice)}
                      />
                      <label className={styles.choiceLabel}>{choice}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        <button className={styles.submitquiz} onClick={handleSubmit}>
          Submit Quiz
        </button>

        {/* Modal for displaying score */}
        {showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Your Score: {score} / {quizzes.length}</h2>
              <button className={styles.closeButton} onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LessonContent;
