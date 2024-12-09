import { useRef, useEffect } from "react";
import styles from "./LandingPageV2.module.css";

const LandingPageV2 = () => {
  const containerRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollLeft = containerRef.current.scrollLeft;
      const cards = containerRef.current.querySelectorAll(`.${styles.scrollcard}`);
      cards.forEach((card, index) => {
        const offset = (index + 1) * 160; // Adjust based on card width + margin
        card.style.transform = `translateX(${-scrollLeft + offset}px)`;
      });
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cards = Array.from({ length: 10 }, (_, i) => `Card ${i + 1}`);

  return (
    <div className={styles.scrollcontainer} ref={containerRef}>
      {cards.map((card, index) => (
        <div key={index} className={styles.scrollcard}>
          {card}
        </div>
      ))}
    </div>
  );
};

export default LandingPageV2;
