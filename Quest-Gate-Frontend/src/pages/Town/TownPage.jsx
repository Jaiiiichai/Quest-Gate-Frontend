import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import { useAvatar } from '../../hooks/AvatarContext';
import axios from 'axios';
import InventoryModal from './InventoryModal';
import styles from './TownPage.module.css';

import avatar from '../../assets/Town/Profile view main Character.png';
import attack from '../../assets/Town/Attack bar.png';
import defense from '../../assets/Town/Defense Bar.png';
import health from '../../assets/Town/Health bar.png';
import character from '../../assets/Town/Anime Character.png';
import academia from '../../assets/Town/academia-removebg-preview.png';
import story from '../../assets/Town/Story_Button-removebg-preview.png';
import quests from '../../assets/Town/Quests_Button-removebg-preview.png';
import shop from '../../assets/Town/Shop_Button-removebg-preview.png';
import coin from '../../assets/Town/coins.png';
import backpack from '../../assets/Town/backpack.png';

function TownPage() {
    const { avatarId, logout } = useAvatar();
    const [avatarData, setAvatarData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        console.log("Avatar ID:", avatarId);

        const getAvatarData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/getAvatarData', {
                    avatarId: avatarId
                });
                console.log(response.data);
                setAvatarData(response.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        if (avatarId) {
            getAvatarData();
        }
    }, [avatarId, location.key]);

    const openInventoryModal = () => {
        setIsModalVisible(true);
    };

    const closeInventoryModal = () => {
        setIsModalVisible(false);
    };

    // Logout modal handlers
    const handleLogout = () => {
        logout(); // Call your logout function here
        setIsLogoutModalVisible(false); // Close the modal
        navigate('/login'); // Navigate to login page after logout
    };

    const handleCancelLogout = () => {
        setIsLogoutModalVisible(false); // Just close the modal without logging out
    };

    // Logout confirmation modal component
    // eslint-disable-next-line react/prop-types
    const LogoutModal = ({ onConfirm, onCancel }) => (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <p>Are you sure you want to logout?</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.avatarcon}>
                    <p>{avatarData ? avatarData.avatar_name : "Loading..."}</p>
                    <img src={avatar} alt="running" className={styles.avatar} />
                </div>
                <div className={styles.texts}>
                    <p>Attack: {avatarData ? avatarData.attack : "Loading..."}</p>
                    <img src={attack} alt="attack" className={styles.stats} />
                    <p>Defense: {avatarData ? avatarData.defense : "Loading..."}</p>
                    <img src={defense} alt="defense" className={styles.stats} />
                    <p>Health: {avatarData ? avatarData.health : "Loading..."}</p>
                    <img src={health} alt="health" className={styles.stats} />
                    <p>Level: {avatarData ? avatarData.level : "Loading..."}</p>
                </div>
            </div>

            {/* Logout Button triggers the confirmation modal */}
            <button className={styles.logoutButton} onClick={() => setIsLogoutModalVisible(true)}>
                Logout
            </button>

            {/* Show the confirmation modal */}
            {isLogoutModalVisible && (
                <LogoutModal onConfirm={handleLogout} onCancel={handleCancelLogout} />
            )}

            {/* Rest of your TownPage code */}
            <img src={character} alt="health" className={styles.anime} />
            <Link to="/loading" state={{ targetRoute: '/academia' }}>
                <img src={academia} alt="academia" className={styles.academia} />
            </Link>
            <Link to="/loading" state={{ targetRoute: '/regions' }}>
                <img src={story} alt="story" className={styles.story} />
            </Link>
            <Link to="/loading" state={{ targetRoute: '/quests' }}>
                <img src={quests} alt="quests" className={styles.quests} />
            </Link>
            {avatarData && (
                <Link to="/loading" state={{ targetRoute: '/shop', coins: avatarData.coins }}>
                    <img src={shop} alt="shop" className={styles.shop} />
                </Link>
            )}

            <button className={styles.inventoryButton} onClick={openInventoryModal}>
                <img src={backpack} alt="backpack" className={styles.backpack} />
            </button>

            <div className={styles.coinslot}>
                <img src={coin} alt="coin" className={styles.coin} />
                <p>{avatarData ? avatarData.coins : "Loading..."}</p>
            </div>

            {isModalVisible && (
                <InventoryModal avatarId={avatarId} onClose={closeInventoryModal} isButtonDisabled={true} />
            )}
        </div>
    );
}

export default TownPage;
