import styles from './ShopPage.module.css'
import owner from '../../assets/Shop/SHOP OWNER CHARACTER.png'
import health from '../../assets/Shop/HEALTH POTION.png'
import healthtxt from '../../assets/Shop/HEALTH POTION 100 COINS.png'
import energy from '../../assets/Shop/ENERGY POTION.png'
import energytxt from '../../assets/Shop/ENERGY POTIONS 50 COINS.png'
import defense from '../../assets/Shop/DEFENSE POTION.png'
import defensetxt from '../../assets/Shop/DEFENSE POTION 40 COINS.png'
import cancel from '../../assets/Shop/CANCEL ICON.png'
import buy from '../../assets/Shop/BUY ICON.png'

function ShopPage() {
    return (
        <div className={styles.container}>
            <img src={owner} alt="Shop Owner" className={styles.owner} />

            <div className={styles.buysec}>
                <div className={styles.itemsell}>
                    <div className={styles.potion}>
                        <img src={health} alt="Health Potion" className={styles.item} />
                        <img src={healthtxt} alt="Health Potion Price" className={styles.price} />
                    </div>
                    <div className={styles.potion}>
                        <img src={energy} alt="Energy Potion" className={styles.item} />
                        <img src={energytxt} alt="Energy Potion Price" className={styles.price} />
                    </div>
                    <div className={styles.potion}>
                        <img src={defense} alt="Defense Potion" className={styles.item} />
                        <img src={defensetxt} alt="Defense Potion Price" className={styles.price} />
                    </div>
                    <div className={styles.potion}>
                        <img src={health} alt="Health Potion" className={styles.item} />
                        <img src={healthtxt} alt="Health Potion Price" className={styles.price} />
                    </div>
                    <div className={styles.potion}>
                        <img src={energy} alt="Energy Potion" className={styles.item} />
                        <img src={energytxt} alt="Energy Potion Price" className={styles.price} />
                    </div>
                    <div className={styles.potion}>
                        <img src={defense} alt="Defense Potion" className={styles.item} />
                        <img src={defensetxt} alt="Defense Potion Price" className={styles.price} />
                    </div>
                </div>
            </div>

            <div className={styles.itemsec}>
                <div className={styles.details}>
                        <div className={styles.selectedItem}>
                           <img src={health} alt="Health Potion" className={styles.item} />
                        </div>
                        <div className={styles.itemdetails}>
                            <h2 className={styles.showDetails}>Health Potion</h2>
                            <p className={styles.showDetails}> A health potions boosts your health by 20%</p>
                            <h3 className={styles.showDetails}>100 coins</h3>
                        </div>
                </div>
                <div className={styles.options}>
                <img src={cancel} alt="Health Potion" className={styles.optionbutton} />
                <img src={buy} alt="Health Potion" className={styles.optionbutton} />
                </div>
            </div>
        </div>
    );
}

export default ShopPage;
