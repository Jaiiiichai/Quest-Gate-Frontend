import styles from './ShopPage.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAvatar } from '../../hooks/AvatarContext';

function ShopPage() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // To track selected item for details
  const { avatarId } = useAvatar();

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getAllItems');
        setItems(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, []); // Empty dependency array to fetch items once when the component mounts

  const handleItemClick = (item) => {
    setSelectedItem(item); // Set the selected item when clicked
  };
  
  const addItemtoBag = async () => {
    if (!selectedItem) {
      console.log("No item selected!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/addItem', {
        avatarId: avatarId,
        itemId: selectedItem.item_id
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <img src="/assets/Shop/SHOP OWNER CHARACTER.png" alt="Shop Owner" className={styles.owner} />
      <Link to="/town">
        <img src="/assets/Shop/backbutton.png" alt="Back to Town" className={styles.backbutton} />
      </Link>
    
      <div className={styles.buysec}>
        <div className={styles.itemsell}>
          {items.map((item) => (
            <div key={item.item_id} className={styles.potion} onClick={() => handleItemClick(item)}>
              <img src={`/${item.image}`} alt={item.item_name} className={styles.item} />
              <div className={styles.price}>{item.price} coins</div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
  <div
    className={`${styles.itemsec} w3-animate-right`}
    style={{ display: selectedItem ? 'block' : 'none' }}
  >
    <div className={styles.details}>
      <div className={styles.selectedItem}>
        <img
          src={`/${selectedItem.image}`}
          alt={selectedItem.item_name}
          className={styles.item}
        />
      </div>
      <div className={styles.itemdetails}>
        <h2 className={styles.showDetails}>{selectedItem.item_name}</h2>
        <p className={styles.showDetails}>{selectedItem.effect_description}</p>
        <h3 className={styles.showDetails}>{selectedItem.price} coins</h3>
      </div>
    </div>

    <div className={styles.options}>
      {/* Cancel button functionality */}
      <img
        src="/assets/Shop/CANCEL ICON.png"
        alt="Cancel"
        id="cancel"
        className={styles.optionbutton}
        onClick={() => setSelectedItem(null)}
      />

      {/* Buy button functionality */}
      <img
        src="/assets/Shop/BUY ICON.png"
        id="Buy"
        alt="Buy"
        className={styles.optionbutton}
        onClick={addItemtoBag}
        />

    </div>
  </div>
)}

     

    </div>
  );
}

export default ShopPage;
