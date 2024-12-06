import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './QuizModal.module.css';

const QuizModal = ({ quiz, onAnswerSelected, onClose, onFeedback, onAnswerResult }) => {
    const [feedback, setFeedback] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    const handleAnswerSelection = (selectedChoice) => {
        const isAnswerCorrect = selectedChoice === quiz.correct_answer;
    
        // Prepare feedback text
        const feedbackText = isAnswerCorrect 
            ? 'Correct!' 
            : `Incorrect! The correct answer is: ${quiz.correct_answer}`;
    
        // Update local state
        setIsCorrect(isAnswerCorrect);
        setFeedback(feedbackText);
    
        // Pass feedback and result
        onFeedback(feedbackText, isAnswerCorrect);
        onAnswerSelected(quiz.quiz_id, selectedChoice);
        
        // Call onAnswerResult with the current answer correctness
        onAnswerResult(isAnswerCorrect); // Pass true/false back to the parent

        console.log('Selected Choice:', selectedChoice);
        console.log('Correct Answer:', quiz.correct_answer);
        console.log('Is Answer Correct:', isAnswerCorrect);
    
        // Close the modal after processing the answer
        onClose();

    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <button onClick={onClose} className={styles.closeButton}>X</button>
                {quiz ? (
                    <div className={styles.quizItem}>
                        <h3>{quiz.question}</h3>
                        <div className={styles.options}>
                            {quiz.choices.map((choice, i) => (
                                <button
                                    key={i}
                                    className={styles.optionButton}
                                    onClick={() => handleAnswerSelection(choice)}
                                >
                                    {choice}
                                </button>
                            ))}
                        </div>
                        {feedback && (
                            <div className={isCorrect ? styles.correctFeedback : styles.incorrectFeedback}>
                                {feedback}
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Loading quiz...</p>
                )}
            </div>
        </div>
    );
};

// Define prop types for the component
QuizModal.propTypes = {
    quiz: PropTypes.shape({
        quiz_id: PropTypes.number.isRequired,
        lesson_id: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
        correct_answer: PropTypes.string.isRequired,
        choices: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    onAnswerSelected: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onFeedback: PropTypes.func.isRequired, // Callback for feedback
    onAnswerResult: PropTypes.func.isRequired // Callback for true/false result
};

export default QuizModal;
