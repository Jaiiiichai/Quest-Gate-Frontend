import styles from './QuestPage.module.css';
import quest from '../../assets/Quest/Border_Quests.png';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import backButton from '../../assets/Quest/backbutton.png'
import {Link} from 'react-router-dom'

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
      <Link to="/town"><img src={backButton} alt="Quest Header" className={styles.backbutton} /></Link>
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

// Component to display the list of quests with a 1-second reveal interval
const QuestListComponent = ({ data, onQuestClick }) => {
  const [visibleItems, setVisibleItems] = useState(0);

  useEffect(() => {
    if (visibleItems < data.length) {
      const interval = setInterval(() => {
        setVisibleItems((prev) => prev + 1);
      }, 200);

      return () => clearInterval(interval);
    }
  }, [visibleItems, data.length]);

  return (
    <div className={styles.questlist}>
      {data.slice(0, visibleItems).map((item, index) => (
        <div key={index} className={`${styles.item} w3-animate-left`} onClick={() => onQuestClick(item)}>
          <div>
            <h3>{item.questname}</h3>
            <p>{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

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
  <div className={`${styles.questDetail} w3-animate-zoom`}>
    <div>
      <h3>{quest.questname}</h3>
    </div>
    <p>{quest.detail}</p>
    <div className={styles.rewards}>
      <p>10xp</p>
      <p>30 coins</p>
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
