import { useEffect, useState } from 'react'; // Import hooks
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom'; // Import useLocation
import styles from './QuizPage.module.css'; // Assuming you have the styling for this page
import backButton from '../../assets/Quest/backbutton.png';
import { useAvatar } from '../../hooks/AvatarContext';

function QuizPage() {
  const location = useLocation(); // Get location from the router
  const { lessonId } = location.state || {}; // Destructure lesson_id from location state
  const { avatarId } = useAvatar();
  const [reward, setReward] = useState(null); // Store the reward data
  const [quizzes, setQuizzes] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null); // Data for modal, including score and reward details

  console.log(lessonId);

  // Fetch reward data from the backend based on lesson_id
  useEffect(() => {
    if (lessonId) {
      // Prepare the request data to send to the backend
      const requestData = {
        lesson_id: lessonId,   // Send the lesson_id in the body of the POST request
        quest_id: null,         // Assuming quest_id and battle_id are null
        battle_id: null
      };

      axios.post('http://localhost:3000/api/getReward', requestData)
        .then(response => {
          setReward(response.data); // Store the reward data in state
        })
        .catch(error => {
          console.error('Error fetching reward:', error);
        });
    }
  }, [lessonId]);

  // Fetch quizzes data from the backend
  useEffect(() => {
    if (lessonId) {
      axios.get(`http://localhost:3000/api/quizzes/${lessonId}`)
        .then(response => {
          setQuizzes(response.data.data); // Store quizzes data in state
        })
        .catch(error => {
          console.error('Error fetching quizzes:', error);
        });
    }
  }, [lessonId]);

  

  const handleAnswerChange = (quiz_id, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [quiz_id]: answer
    }));
  };


  const handleSubmit = async() => {
    let correctAnswersCount = 0;
  
    // Calculate score
    quizzes.forEach(quiz => {
      if (selectedAnswers[quiz.quiz_id] === quiz.correct_answer) {
        correctAnswersCount++;
      }
    });
  
    setScore(correctAnswersCount);


        const response = await axios.post('http://localhost:3000/api/checkProgress', {
          avatarId: avatarId,
          lesson_id: lessonId,
        })
        
        const progressClaimed = response.data.claimed;
        
        
        console.log(progressClaimed)
    let finalReward = reward;
  
    if(progressClaimed == true){
      finalReward = {
        coins: 0,
        exp: 5,  
        claimed: true, 
      };
    }else if (correctAnswersCount !== quizzes.length) {
      finalReward = {
        coins: 0,
        exp: 5,  
        claimed: false, 
      };
    }
  
 
  const modalContent = {
    lessonId: lessonId,
    score: correctAnswersCount,
    totalQuestions: quizzes.length,
    reward: finalReward,
  };

  // Set modal data and show the modal
  setModalData(modalContent);
  setShowModal(true);
};

  // Close modal
  const closeModal = async(coins,exp,reward_id,claimed) => {
    setShowModal(false);
    try{
      await axios.put('http://localhost:3000/api/updateAvatarRewards', {
      avatarId: avatarId,  // Avatar ID
      coins: coins,
      exp: exp   // New coins value
    });
  }catch(err){
    console.log(err)
  }

    const progressData = {
      avatarId: avatarId,
      level_id: null,
      lesson_id: lessonId,
      reward_id: reward_id,
      completed: false,
      claimed : claimed
    }
    await axios.post('http://localhost:3000/api/update-progress',progressData)

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

        {/* Modal for displaying score and reward */}
        {showModal && modalData && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Your Score: {score} / {modalData.totalQuestions}</h2>

              {/* Display reward details in the modal */}
              <div className={styles.rewardDetails}>
                <p><strong>Coins:</strong> {modalData.reward.coins}</p>
                <p><strong>Experience Points:</strong> {modalData.reward.exp}</p>
              </div>
              <Link to="/academia">
                 <button className={styles.closeButton} onClick={() => closeModal(modalData.reward.coins, modalData.reward.exp,modalData.reward.reward_id,modalData.reward.claimed)}>

                    Close
                  </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
