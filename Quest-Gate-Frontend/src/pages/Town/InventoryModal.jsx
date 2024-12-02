// InventoryModal.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './InventoryModal.module.css';
import PropTypes from 'prop-types'; // Import PropTypes

const InventoryModal = ({ avatarId, onClose, isButtonDisabled , onUseItem}) => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getItems');
        setItems(response.data); // Store items in state
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [avatarId]);

  const handleUseItem = (itemId) => {
    // Logic for using the item
    console.log(`Item with ID ${itemId} used.`);
    onUseItem(itemId); 
  };

  return (
    <div className={`${styles.modalOverlay} w3-animate-zoom`}>
      <div className={styles.modalContent}>
        <h2 className={styles.bagtxt}>Inventory</h2>
        <ul className={styles.itemList}>
          {items.length > 0 ? (
            items.map((item, index) => (
              <li key={`${item.item_id}-${index}`} className={styles.item}>

                <img
                  src={`/${item.image}`}
                  alt={item.item_name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <p className={styles.itemName}>{item.item_name}</p>
                  <p>{item.effect_description}</p>
                  <p>Price: {item.price} coins</p>
                  <p>Quantity: {item.item_count}</p>
                </div>
                <button
                  className={styles.useButton}
                  onClick={() => handleUseItem(item.item_id)}
                  disabled={isButtonDisabled} // Disable button if `isButtonDisabled` is true
                >
                  Use
                </button>
              </li>
            ))
          ) : (
            <p>No items found.</p>
          )}
        </ul>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

InventoryModal.propTypes = {
  avatarId: PropTypes.number.isRequired, // Validate 'avatarId' as a required number
  onClose: PropTypes.func.isRequired,    // Validate 'onClose' as a required function
  isButtonDisabled: PropTypes.bool,      // Validate 'isButtonDisabled' as a boolean prop (optional)
  onUseItem: PropTypes.func.isRequired   // Correctly validate 'onUseItem' as a required function
};

export default InventoryModal;
