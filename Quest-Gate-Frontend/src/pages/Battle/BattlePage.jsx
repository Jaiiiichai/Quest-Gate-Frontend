import { useState, useRef, useEffect } from 'react';
import styles from '../Battle/BattlePage.module.css';
import avatar from '../../assets/Town/Profile view main Character.png';
import knight from '../../assets/Battle/knight_idle.gif';
import { useLocation,Link } from 'react-router-dom';
import { useAvatar } from '../../hooks/AvatarContext';
import InventoryModal from '../Town/InventoryModal'; 
import QuizModal from './QuizModal'
import axios from 'axios';

function BattlePage() {
    const location = useLocation();
    const { avatarId } = useAvatar();
    const { map, enemy, grunt_id, category } = location.state || {};
    const [avatarData, setAvatarData] = useState(null);
    const [logs, setLogs] = useState([]);
    const logsRef = useRef(null);
    const [health, setHealth] = useState(80);
    const [enemyHealth, setEnemyHealth] = useState();
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [maxEnemyHealth, setMaxEnemyHealth] = useState();
    const [enemyName, setEnemyname] = useState();
    const [enemyAttack, setEnemyAttack] = useState();
    const [enemyDefense, setEnemyDefense] = useState();
    const [showModal, setShowModal] = useState(false); // Modal state
    const isDefendingRef = useRef(false);
    const [showInventoryModal, setShowInventoryModal] = useState(false); 
    const maxHealth = 100;
    const bgImage = map || '../../assets/Battle/default_bg.png';
    const enemyimg = enemy;
    const [actionModal, setActionModal] = useState(false);
    const [quiz, setQuiz] = useState([])
    const [, setSelectedAnswers] = useState({});
    const [isQuizModalVisible, setIsQuizModalVisible] = useState(false);
    const [, setFeedbackData] = useState({ feedback: '', isCorrect: true });
    const [, setQuizResult] = useState(null); 
    const [currentAction ,setCurrentAction] = useState()


    useEffect(() => {
        const getAvatarData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/getAvatarData', {
                    avatarId: avatarId,
                });
                setAvatarData(response.data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        if (avatarId) getAvatarData();
        console.log(category)
    }, [avatarId]);

    useEffect(() => {
        const fetchGrunt = async () => {
            const response = await axios.get(`http://localhost:3000/api/getGrunt/${grunt_id}`);
            setMaxEnemyHealth(response.data.health);
            setEnemyHealth(response.data.health);
            setEnemyname(response.data.name);
            setEnemyAttack(response.data.attack);
            setEnemyDefense(response.data.defense);
        };

        fetchGrunt();
        getQuiz()
    }, [grunt_id]);

    const addLog = (message) => {
        setLogs((prevLogs) => {
            const newLogs = [...prevLogs, message];
            if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight;
            return newLogs;
        });
    };
   

    
    
    const getQuiz = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/quizzes/category/${category}`);
            console.log("Fetched Data:", response.data); // Check the structure of the fetched data
            setQuiz(response.data); // Set the quiz state
        } catch (err) {
            console.log(err);
        }
    };
    const handleFeedback = (feedback, isCorrect) => {
        setFeedbackData({ feedback, isCorrect });
    };


    const updateHealth = (amount, isPlayer = true) => {
        if (isPlayer) {
            setHealth((prevHealth) => Math.min(Math.max(prevHealth + amount, 0), maxHealth));
        } else {
            setEnemyHealth((prevHealth) =>
                Math.min(Math.max(prevHealth + amount, 0), maxEnemyHealth)
            );
        }
    };
    const handleAnswerResult = (isCorrect) => {
        setQuizResult(isCorrect); // Update the quiz result state
        // if (isCorrect) {
        //     const playerMultiplier = getRandomMultiplier(0.7, 1);
        //     const playerDamage = avatarData.attack * playerMultiplier;
        //     const playerDamageAfterDefense = playerDamage * (1 - enemyDefense / (enemyDefense + 100));
        //     const finalPlayerDamage = Math.ceil(playerDamageAfterDefense);
        //     updateHealth(-finalPlayerDamage, false);
        //     addLog('Answer is correct')
        //     addLog(`Player dealt ${finalPlayerDamage} damage to the enemy.`);

        // } else {
        //     addLog('Answer incorrect!! Player attack missed!');
        // }

        if (currentAction === 'attack') {
            const playerMultiplier = getRandomMultiplier(0.7, 1);
            const playerDamage = avatarData.attack * playerMultiplier;
            const playerDamageAfterDefense = playerDamage * (1 - enemyDefense / (enemyDefense + 100));
            const finalPlayerDamage = Math.ceil(playerDamageAfterDefense);
            updateHealth(-finalPlayerDamage, false);
            addLog('Answer is correct')
            addLog(`Player dealt ${finalPlayerDamage} damage to the enemy.`);
        } else if (currentAction === 'defend') {
            addLog(isCorrect ? 'Player successfully defended!' : 'Defense failed!');
            isDefendingRef.current = isCorrect; // Set defending status
        }
        setIsQuizModalVisible(false); // Close quiz modal
        enemyAction(); // Proceed with enemy action
    };

    const getRandomMultiplier = (min = 0.85, max = 1.15) => Math.random() * (max - min) + min;

    const handlePlayerAction = (action) => {
        if (!isPlayerTurn) return;
    
        switch (action) {
            case 'attack': {
                getQuiz(); // Fetch quiz for attack
                setIsQuizModalVisible(true); // Show quiz modal
                setCurrentAction('attack'); // Set current action context
                break;
            }
            case 'defend': {
                getQuiz(); // Fetch quiz for defense
                setIsQuizModalVisible(true); // Show quiz modal
                setCurrentAction('defend'); // Set current action context
                break;
            }
            case 'item': {
                setTimeout(() => {
                    addLog('Player used Item!');
                    setShowInventoryModal(true); // Open inventory modal
                    setActionModal(false); // Hide action modal
                    enemyAction(); // Trigger enemy's turn
                }, 1500);
                break;
            }
            case 'flee': {
                setShowModal(true); // Show flee confirmation modal
                break;
            }
            default:
                break;
        }
    
        setIsPlayerTurn(false); // End player's turn
    };
    
    const enemyAction = () => {
        setTimeout(() => {
            let finalEnemyDamage;

            if (isDefendingRef.current) {
                finalEnemyDamage = 3;
                addLog('Enemy attack was reduced to 3 due to defense!');
            } else {
                const enemyMultiplier = getRandomMultiplier(0.6, 1);
                const enemyDamage = enemyAttack * enemyMultiplier;
                const enemyDamageAfterDefense =
                    enemyDamage * (1 - avatarData.defense / (avatarData.defense + 100));
                finalEnemyDamage = Math.ceil(enemyDamageAfterDefense);
                addLog(`Enemy attack dealt ${finalEnemyDamage}`);
            }
            updateHealth(-finalEnemyDamage);
            isDefendingRef.current = false;
            setIsPlayerTurn(true);
        }, 1000);
    };
    const handleUseItem = async (itemId) => {
        console.log(`Used item ID: ${itemId}`);
      
        try {
          // Special logic for specific items
          if (itemId === 3) {
            updateHealth(50); // Assuming this is a function to update health
            addLog('Player used a healing potion!'); // Assuming this logs the action
          }
          if (itemId === 5) {
            // Add 10 defense to the avatar
            const newDefense = avatarData.defense + 10;
            setAvatarData((prevData) => ({
              ...prevData,
              defense: newDefense
            }));
            addLog('Player used a Defense potion! Defense increased by 10');
          }
      
          // Make the POST request to use the item
          const response = await axios.post('http://localhost:3000/api/useItem', {
            avatarId: avatarId,
            itemId: itemId
          });
      
          // Check if the response is successful
          if (response.status === 200) {
            console.log('Item used successfully');
            setShowInventoryModal(false); // Close the inventory modal after using the item
          } else {  
            console.log('Failed to use the item');
          }
        } catch (error) {
          console.error('Error using item:', error);

        }
    };
    const handleAnswerSelected = (quizId, selectedChoice) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [quizId]: selectedChoice
        }));
    };

    const toggleQuizModal = () => {
        setIsQuizModalVisible(!isQuizModalVisible); // Toggle visibility of the quiz modal
    };
    
    
      

    const handleFleeConfirm = () => {
        addLog('Player fled the battle!');
        setShowModal(false);
        // Redirect or handle post-flee logic here
    };

    const handleFleeCancel = () => {
        setShowModal(false);
        setIsPlayerTurn(true);
    }
    

    return (
        <div className={styles.screencontainer}>
            <div className={styles.battlecontainer}>
                <div
                    className={styles.charscreen}
                    style={{
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    <h6 className={styles.enemyname}>{enemyName}</h6>
                    <div className={styles.enemyHealthBarContainer}>
                        <div
                            className={styles.enemyHealthBar}
                            style={{ width: `${(enemyHealth / maxEnemyHealth) * 100}%` }}
                        ></div>
                        <span className={styles.enemyHealthText}>
                            {enemyHealth} / {maxEnemyHealth}
                        </span>
                    </div>

                    <img src={enemyimg} alt="enemy" className={styles.enemychar} />
                    <img src={knight} alt="player" className={styles.playchar} />
                </div>

                <div className={styles.battleoptions}>
                    <div className={styles.playermoves}>
                        <div className={styles.playerstats}>
                            <div className={styles.avatarpic}>
                                <div className={styles.imgcon}>
                                    <img src={avatar} alt="player" className={styles.avatarimg} />
                                    <p>Tidert</p>
                                </div>
                            </div>
                            <div className={styles.avatarstats}>
                                <p className={styles.stattexts}>Your Stats:</p>
                                <div className={styles.healthBarContainer}>
                                    <div
                                        className={styles.healthBar}
                                        style={{ width: `${(health / maxHealth) * 100}%` }}
                                    ></div>
                                    <span className={styles.healthText}>{health}/{maxHealth}</span>
                                </div>
                                <p className={styles.stattexts}>Attack: {avatarData ? avatarData.attack : 0}</p>
                                <p className={styles.stattexts}>Defense: {avatarData ? avatarData.defense : 0}</p>

                                <div className={styles.status}>You are poisoned!</div>
                            </div>
                        </div>
                        <div className={styles.playeroptions}>
                            <button
                                className={styles.playerButtons}
                                onClick={() => handlePlayerAction('attack')}
                                disabled={!isPlayerTurn}
                            >
                                Attack
                            </button>
                            <button
                                className={styles.playerButtons}
                                onClick={() => handlePlayerAction('defend')}
                                disabled={!isPlayerTurn}
                            >
                                Defend
                            </button>
                            <button
                                className={styles.playerButtons}
                                onClick={() => handlePlayerAction('item')}
                                disabled={!isPlayerTurn}
                            >
                                Item
                            </button>
                            <button
                                className={styles.playerButtons}
                                onClick={() => handlePlayerAction('flee')}
                                disabled={!isPlayerTurn}
                            >
                                Flee
                            </button>
                        </div>
                    </div>

                    <div className={styles.logs} ref={logsRef}>
                        {logs.map((log, index) => (
                            <p key={index}>{log}</p>
                        ))}
                    </div>
                </div>
            </div>
            {showInventoryModal && (
                <InventoryModal avatarId={avatarId} onClose={() => setShowInventoryModal(false)} onUseItem={handleUseItem} />

        )}
        {actionModal && (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <p> {quiz.question}</p>
                </div>
            </div>
        )}
        {isQuizModalVisible && (
                <QuizModal
                    quiz={quiz}
                    onAnswerSelected={handleAnswerSelected}
                    onClose={toggleQuizModal}
                    onFeedback={handleFeedback} 
                    onAnswerResult={handleAnswerResult}
                />
            )}

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <p>Are you sure you want to flee?</p>
                        <div className={styles.modalActions}>
                            <Link to="/regions"><button onClick={handleFleeConfirm}>Yes</button> </Link>
                            <button onClick={handleFleeCancel}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BattlePage;
