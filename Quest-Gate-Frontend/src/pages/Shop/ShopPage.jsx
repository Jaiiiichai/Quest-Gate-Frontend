import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAvatar } from '../../hooks/AvatarContext';
import styles from './ShopPage.module.css';

function ShopPage() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false); // Modal visibility state
  const { avatarId } = useAvatar();

  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/getAllItems');
        setItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const addItemtoBag = async (item) => {
    try {
      await axios.post('http://localhost:3000/api/addItem', {
        avatarId: avatarId,
        itemId: item.item_id,
      });

      setModalVisible(true);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null); // Deselect the item after closing the modal
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
            <div
              key={item.item_id}
              className={styles.potion}
              onClick={() => handleItemClick(item)}
            >
              <img src={`/${item.image}`} alt={item.item_name} className={styles.item} />
              <div className={styles.price}>{item.price} coins</div>
            </div>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className={styles.itemsec}>
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
            <img
              src="/assets/Shop/CANCEL ICON.png"
              alt="Cancel"
              className={styles.optionbutton}
              onClick={() => setSelectedItem(null)}
            />

            <img
              src="/assets/Shop/BUY ICON.png"
              alt="Buy"
              className={styles.optionbutton}
              onClick={() => addItemtoBag(selectedItem)} // Pass selected item
            />
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalVisible && (
        <div className={`${styles.modal} w3-animate-zoom`}>
          <div className={styles.modalContent}>
            <h2>Item Purchased!</h2>
            <p>You have successfully bought the {selectedItem?.item_name}!</p>
            <p>Price: {selectedItem?.price} coins</p>
            <button onClick={closeModal} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopPage;
