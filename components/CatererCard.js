// components/CatererCard.js

import styles from "../styles/caterers.module.css";

export default function CatererCard({ caterer }) {
  const { name, description, location, price, image, cuisines = [], rating = 0 } = caterer;

  function renderStars(rating) {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.round(rating) ? styles.starFilled : styles.starEmpty}>
        ★
      </span>
    ));
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.cardName}>{name}</h2>

      <p className={styles.cardLocation}>📍 {location}</p>

      <p className={styles.cardPrice}>
        <span className={styles.priceLabel}>Price per plate:</span>{" "}
        <strong>₹{price}</strong> {/* ✅ Fixed */}
      </p>

      <div className={styles.cuisines}>
        {cuisines.map((cuisine) => (
          <span key={cuisine} className={styles.tag}>
            {cuisine}
          </span>
        ))}
      </div>

      <div className={styles.rating}>
        {renderStars(rating)}
        <span className={styles.ratingNumber}>{rating}/5</span> {/* ✅ Fixed */}
      </div>
    </div>
  );
}