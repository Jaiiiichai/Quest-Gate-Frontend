import styles from './QuestPage.module.css';
import quest from '../../assets/Quest/Border_Quests.png';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import backButton from '../../assets/Quest/backbutton.png';
import { Link } from 'react-router-dom';
import kanaji from '../../assets/Maps/kanaji.png'
import vocablis from '../../assets/Battle/bg3.png'
import assasin from '../../assets/Enemies/assasin.gif'
import phantom from '../../assets/Enemies/phantom.gif'
import axios from 'axios';


const QuestPage = () => {
  const [selectedQuest, setSelectedQuest] = useState(null); // State to hold the clicked quest item
  const [data, setData] = useState([]);
  const [maps, setMaps] = useState();
  const [enemy, setEnemy] = useState();
  const [category, setCategory] = useState();
  const [gruntId, setGruntId] = useState();

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getQuests');
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuests();
  }, []); // Add an empty dependency array to run this effect only once

  const handleQuestClick = (quest) => {
    setSelectedQuest(quest); // Set the clicked quest as the selected one
    setCategory(quest.category)
    setGruntId(quest.grunt_id)
    if(quest.quest_id == 1){
      setMaps(kanaji);
      setEnemy(phantom)
    }else if(quest.quest_id ==2){
      setMaps(vocablis)
      setEnemy(assasin)
    }
  };

  const handleBackButtonClick = () => {
    setSelectedQuest(null); // Clear the selected quest to go back to the list
  };

  return (
    <div className={styles.container}>
      <img src={quest} alt="Quest Header" className={styles.questhead} />
      <Link to="/town"><img src={backButton} alt="Back" className={styles.backbutton} /></Link>
      <div className={styles.questcontainer}>
        {selectedQuest ? (
          <QuestDetailComponent quest={selectedQuest} onBack={handleBackButtonClick} maps={maps} // Pass maps as a prop
        enemy={enemy} grunt_id={gruntId} category={category} />
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
            <h3>{item.quest_name}</h3> {/* Updated to match the API response */}
            <p>{item.description}</p> {/* Updated to match the API response */}
          </div>
        </div>
      ))}
    </div>
  );
};

QuestListComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      quest_id: PropTypes.number.isRequired,
      quest_name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      grunt_id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onQuestClick: PropTypes.func.isRequired,
};

// Component to display details of the selected quest with a back button
const QuestDetailComponent = ({ quest, onBack, maps, enemy, grunt_id, category }) => {
  // Debugging: Log the values to ensure they are defined
  console.log("Maps:", maps);
  console.log("Grunt ID:", grunt_id);
  console.log("Enemy:", enemy);
  console.log("Category:", category);
  
  // Check if all required data is available
  const isDataReady = maps && grunt_id !== undefined && enemy && category;

  return (
    <div className={`${styles.questDetail} w3-animate-zoom`}>
      <div>
        <h3>{quest.quest_name}</h3>
      </div>
      <p>{quest.description}</p>
      {isDataReady ? (
        <Link to="/loading" state={{ targetRoute: '/battle', map: maps, grunt_id: grunt_id, enemy: enemy, category: category }}>
          <button className={styles.backButton}>Accept Quest</button>
        </Link>
      ) : (
        <button className={styles.backButton} disabled>Loading...</button>
      )}
      {/* Back Button */}
      <button className={styles.backButton} onClick={onBack}>Back to Quest List</button>
    </div>
  );
};
QuestDetailComponent.propTypes = {
  quest: PropTypes.shape({
    quest_id: PropTypes.number.isRequired,
    quest_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    grunt_id : PropTypes.number.isRequired,
    category : PropTypes.string.isRequired
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  maps: PropTypes.string, // Add prop type for maps
  enemy: PropTypes.string,
  grunt_id : PropTypes.number,
  category : PropTypes.string
};

export default QuestPage;