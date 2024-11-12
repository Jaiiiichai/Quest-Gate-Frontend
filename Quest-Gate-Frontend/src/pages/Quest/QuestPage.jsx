import styles from './QuestPage.module.css';
import quest from '../../assets/Quest/Border_Quests.png';
import { useState } from 'react';
import PropTypes from 'prop-types';

const QuestPage = () => {
  const [selectedQuest, setSelectedQuest] = useState(null); // State to hold the clicked quest item

  const data = [
    { questname: 'Fight the Goblin', detail: "Defeat the goblin to save the village", difficulty: 'easy' },
    { questname: 'Rescue the Villagers', detail: "Help the villagers escape safely", difficulty: 'medium' },
    { questname: 'Defeat the Dragon', detail: "Face the dragon in its lair", difficulty: 'hard' },
  ];

  const handleQuestClick = (quest) => {
    setSelectedQuest(quest); // Set the clicked quest as the selected one
  };

  const handleBackButtonClick = () => {
    setSelectedQuest(null); // Clear the selected quest to go back to the list
  };

  return (
    <div className={styles.container}>
      <img src={quest} alt="Quest Header" className={styles.questhead} />
      <div className={styles.questcontainer}>
      {selectedQuest ? (
        <QuestDetailComponent quest={selectedQuest} onBack={handleBackButtonClick} />
      ) : (
        <QuestListComponent data={data} onQuestClick={handleQuestClick} />
      )}
      </div>
    </div>
  );
};

// Component to display the list of quests
const QuestListComponent = ({ data, onQuestClick }) => (
  <div className={styles.questlist}>
    {data.map((item, index) => (
      <div key={index} className={styles.item} onClick={() => onQuestClick(item)}>
        <div>
          <h3>{item.questname}</h3>
          <p>{item.detail}</p>
        </div>
        <p><strong>Difficulty:</strong> {item.difficulty}</p>
      </div>
    ))}
  </div>
);
QuestListComponent.propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        questname: PropTypes.string.isRequired,
        detail: PropTypes.string.isRequired,
        difficulty: PropTypes.string.isRequired,
      })
    ).isRequired,
    onQuestClick: PropTypes.func.isRequired,
  };

// Component to display details of the selected quest with a back button
const QuestDetailComponent = ({ quest, onBack }) => (
  <div className={styles.questDetail}>
     <button onClick={onBack} className={styles.backButton}>Back to Quests</button>
  <div>
  <h3>{quest.questname}</h3>
  <p><strong>Difficulty:</strong> {quest.difficulty}</p>
  </div>
    <p>{quest.detail}</p>
    <div className={styles.rewards}>
        <p>10xp</p>
        <p>30coins</p>
        <p>1 potion</p>
    </div>
    <button onClick={onBack} className={styles.backButton}>Accept Quest</button>
  </div>
);
QuestDetailComponent.propTypes = {
    quest: PropTypes.shape({
      questname: PropTypes.string.isRequired,
      detail: PropTypes.string.isRequired,
      difficulty: PropTypes.string.isRequired,
    }).isRequired,
    onBack: PropTypes.func.isRequired,
  };

export default QuestPage;
