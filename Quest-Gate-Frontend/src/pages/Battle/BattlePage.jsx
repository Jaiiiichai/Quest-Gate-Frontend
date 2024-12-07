import { useState, useRef, useEffect } from 'react';
import styles from '../Battle/BattlePage.module.css';
import avatar from '../../assets/Town/Profile view main Character.png';
import knight from '../../assets/Battle/knight_idle.gif';
import { useLocation, Link } from 'react-router-dom';
import { useAvatar } from '../../hooks/AvatarContext';
import InventoryModal from '../Town/InventoryModal'; 
import battleStart from '../../assets/Battle/Battle-removebg-preview.png';
import QuizModal from './QuizModal';
import axios from 'axios';

function BattlePage() {
    const location = useLocation();
    const { avatarId } = useAvatar();
    const { map, enemy, grunt_id, category } = location.state || {};
    const [avatarData, setAvatarData] = useState(null);
    const [logs, setLogs] = useState([]);
    const logsRef = useRef(null);
    const [health, setHealth] = useState();
    const [enemyHealth, setEnemyHealth] = useState();
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [maxEnemyHealth, setMaxEnemyHealth] = useState();
    const [enemyName, setEnemyname] = useState();
    const [enemyAttack, setEnemyAttack] = useState();
    const [enemyDefense, setEnemyDefense] = useState();
    const [showModal, setShowModal] = useState(false); // Modal state
    const isDefendingRef = useRef(false);
    const [showInventoryModal, setShowInventoryModal] = useState(false); 
    const [maxHealth,setMaxHealth] = useState();
    const bgImage = map || '../../assets/Battle/default_bg.png';
    const enemyimg = enemy;
    const [quiz, setQuiz] = useState([]);
    const [, setSelectedAnswers] = useState({});
    const [isQuizModalVisible, setIsQuizModalVisible] = useState(false);
    const [, setFeedbackData] = useState({ feedback: '', isCorrect: true });
    const [currentAction, setCurrentAction] = useState();
    const [itemUsed, setItemUsed] = useState();
    const [bossSkill, setBossSkill] = useState(null);
    const [isBoss, setIsBoss] = useState(false);
    const [status, setStatus] = useState('');
    const [isPoisoned, setIsPoisoned] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameResult, setGameResult] = useState('');
    const [showBattleStartModal, setShowBattleStartModal] = useState(true);
    const [rewardData, setRewardData] = useState(null);

    useEffect(() => {
        const getAvatarData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/getAvatarData', {
                    avatarId: avatarId,
                });
                setAvatarData(response.data);
                setHealth(response.data.health)
                setMaxHealth(response.data.health)
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        if (avatarId) getAvatarData();
        
    }, [avatarId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBattleStartModal(false);
        }, 3000); // Close the modal after 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);

    useEffect(() => {
        console.log(grunt_id);
        const fetchGrunt = async () => {
            try {
                if (typeof grunt_id === 'object' && grunt_id !== null) {
                    if (grunt_id.grunt_id != null) {
                        const response = await axios.get(`http://localhost:3000/api/getGrunt/${grunt_id.grunt_id}`);
                        console.log(response.data);
                        setMaxEnemyHealth(response.data.health);
                        setEnemyHealth(response.data.health);
                        setEnemyname(response.data.name);
                        setEnemyAttack(response.data.attack);
                        setEnemyDefense(response.data.defense);
                    } else {
                        const response = await axios.get(`http://localhost:3000/api/getBoss/${grunt_id.boss_id}`);
                        setMaxEnemyHealth(response.data.health);
                        setEnemyHealth(response.data.health);
                        setEnemyname(response.data.name);
                        setEnemyAttack(response.data.attack);
                        setEnemyDefense(response.data.defense);
                        setBossSkill(response.data.Skill);
                        setIsBoss(true);
                    }
                } else {
                    const response = await axios.get(`http://localhost:3000/api/getGrunt/${grunt_id}`);
                    console.log(response.data);
                    setMaxEnemyHealth(response.data.health);
                    setEnemyHealth(response.data.health);
                    setEnemyname(response.data.name);
                    setEnemyAttack(response.data.attack);
                    setEnemyDefense(response.data.defense);
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchGrunt();
        getQuiz();
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
            const newHealth = Math.min(Math.max(health + amount, 0), maxHealth);
            setHealth(newHealth);
            if (newHealth === 0) {
                setGameResult('lose');
                setIsGameOver(true);
              
            }
        } else {
            const newEnemyHealth = Math.min(Math.max(enemyHealth + amount, 0), maxEnemyHealth);
            setEnemyHealth(newEnemyHealth);
            if (newEnemyHealth === 0) {
                setGameResult('win');
                setIsGameOver(true);
             
            }
        }
    };
    useEffect(() => {
        if (isGameOver) {
            fetchRewardData();
        }
    }, [gameResult, isGameOver]);
    
    const fetchRewardData = async () => {
        const getlevelId = {
            "quest_id": null,
            "lesson_id": null,
            "level_id": grunt_id.level_id
        };
        
        
        console.log(gameResult)
        try {
            // If the game result is a loss, set fixed rewards
            if (gameResult === 'lose') {
                setRewardData({
                    coins: 5,
                    exp: 5,
                    claimed: false // You can set this based on your logic
                });
                console.log('Player lost. Fixed rewards: 5 coins, 5 exp');
            } else {
                // Fetch rewards from the API if the player wins
                const response = await axios.post(`http://localhost:3000/api/getReward`, getlevelId);
                setRewardData(response.data); // Set the reward data
                console.log(response.data);
                console.log('Player won. Fixed rewards: 5 coins, 5 exp');
            }
        } catch (error) {
            console.error('Error fetching reward data:', error);
        }
    };

    const handleAnswerResult = (isCorrect) => { 
        console.log('battle page quiz result ', isCorrect);
        if (isCorrect) {
            if (currentAction === 'attack') {
                const playerMultiplier = getRandomMultiplier(0.7, 1);
                const playerDamage = avatarData.attack * playerMultiplier;
                const playerDamageAfterDefense = playerDamage * (1 - enemyDefense / (enemyDefense + 100));
                const finalPlayerDamage = Math.ceil(playerDamageAfterDefense);
                updateHealth(-finalPlayerDamage, false);
                addLog(`Player dealt ${finalPlayerDamage} damage to the enemy.`);
                addLog('Attack successful');
            } else if (currentAction === 'defend') {
                addLog(isCorrect ? 'Player successfully defended!' : 'Defense failed!');
                isDefendingRef.current = isCorrect; // Set defending status
            }
        } else {
            addLog('Answer incorrect!!');
            addLog('Attack unsuccessful');
            setIsQuizModalVisible(false); // Close quiz modal
            enemyAction(); // Proceed with enemy action
        }
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
            case 'item': 
                setShowInventoryModal(true);
                if (itemUsed) {
                    addLog('Player used Item!');
                    setShowInventoryModal(true); // Open inventory modal
                } else {
                    setIsPlayerTurn(true);
                }
                break;
            case 'flee': {
                setShowModal(true); // Show flee confirmation modal
                break;
            }
            default:
                setIsPlayerTurn(false); // End player's turn
                break;
        }
    };

    const enemyAction = () => {
        setTimeout(() => {
            let finalEnemyDamage;
            console.log(bossSkill);
            if (isDefendingRef.current) {
                finalEnemyDamage = 3;
                addLog('Enemy attack was reduced to 3 due to defense!');
                setIsPlayerTurn(true);
            } else if (isBoss) {
                const enemyMultiplier = getRandomMultiplier(0.6, 1);
                const enemyDamage = enemyAttack * enemyMultiplier;
                const enemyDamageAfterDefense =
                    enemyDamage * (1 - avatarData.defense / (avatarData.defense + 100));
                finalEnemyDamage = Math.ceil(enemyDamageAfterDefense);
                addLog(`Enemy attack dealt ${finalEnemyDamage}`);
                if (Math.random() < 0.40) {
                    if (bossSkill === "Stun") {
                        addLog("Boss used a skill stun. Stunned for 1 turn");
                        addLog('Player turn skipped');
                        setIsPlayerTurn(false);
                        setTimeout(() => {
                            enemyAction();
                        }, 2000);
                    }
                    if (bossSkill === "Drain") {
                        addLog("Boss used a skill Drain");
                        setTimeout(() => {
                            setEnemyHealth(enemyHealth + finalEnemyDamage);
                            addLog("Damage will be converted to health");
                        }, 2000);
                    }
                    if (bossSkill === "Poison") {
                        addLog("Boss used a skill Toxic");
                        addLog("You are now poisoned");
                        setStatus("You are poisoned");
                        setIsPoisoned(true);
                    }
                }
                setIsPlayerTurn(true);
            } else {
                const enemyMultiplier = getRandomMultiplier(0.6, 1);
                const enemyDamage = enemyAttack * enemyMultiplier;
                const enemyDamageAfterDefense =
                    enemyDamage * (1 - avatarData.defense / (avatarData.defense + 100));
                finalEnemyDamage = Math.ceil(enemyDamageAfterDefense);
                addLog(`Enemy attack dealt ${finalEnemyDamage}`);
                setIsPlayerTurn(true) }
            updateHealth(-finalEnemyDamage);
            if (health <= 0) {
                setGameResult('lose');
                setIsGameOver(true);
              
            }
            isDefendingRef.current = false;
            setTimeout(() => {
                if (isPoisoned) {
                    updateHealth(-20);
                    addLog('Took damage from poison');
                }
            }, 2000);
        }, 1000);
    };

    const handleUseItem = async (itemId) => {
        console.log(`Used item ID: ${itemId}`);
        setItemUsed(true);

        try {
            // Special logic for specific items
            if (itemId === 3) {
                updateHealth(50); // Assuming this is a function to update health
                addLog('Player used a healing potion!'); // Assuming this logs the action
            }

            if (itemId === 4) {
                const newAttack = avatarData.attack + 10;
                setAvatarData((prevData) => ({
                    ...prevData,
                    attack: newAttack
                }));
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

        setIsPlayerTurn(false);
        enemyAction(); // Trigger enemy's turn
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
    };

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
                                <div className={styles.status}>{status}</div>
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
            {showBattleStartModal && (
                <div className={styles.modal}>
                    <div className={styles.startmodalContent}>
                        <img src={battleStart} alt="player" className={styles.battleStart} />
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
                            <Link to="/regions"><button onClick={handleFleeConfirm}>Yes</button></Link>
                            <button onClick={handleFleeCancel}>No</button>
                        </div>
                    </div>
                </div>
            )}
            {isGameOver && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>{gameResult === 'win' ? 'You Win!' : 'You Lose!'}</h2>
                        <p>{gameResult === 'win' ? 'Congratulations! You defeated the enemy!' : 'Better luck next time!'}</p>
                        {rewardData && (
                            <div>
                                <h3>Your Rewards:</h3>
                                <p><strong>Coins:</strong> {rewardData.coins}</p>
                                <p><strong>Experience Points:</strong> {rewardData.exp}</p>
                            </div>
                        )}
                        <button onClick={() => {
                            setIsGameOver(false);
                            // Optionally, redirect or reset the game state here
                        }}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BattlePage;