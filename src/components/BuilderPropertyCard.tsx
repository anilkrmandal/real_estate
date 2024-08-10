import { FunctionComponent, useState } from "react";
import styles from "./BuilderPropertyCard.module.css";

export type PropertyCardType = {
  title: string;
  city: string;
  price: string;
  area: string;
  imageUrl?: string;
  className?: string;
  onPropertyCardContainerClick?: () => void;
};

const BuilderPropertyCard: FunctionComponent<PropertyCardType> = ({
  title,
  city,
  price,
  area,
  imageUrl = "/image-4@2x.png",
  className = "",
  onPropertyCardContainerClick,
}) => {
  const [isSold, setIsSold] = useState(false);

  const handleBuyNowClick = () => {
    setIsSold(true);
  };

  return (
    <div
      className={[
        styles.propertyCard,
        className,
        isSold ? styles.sold : "",
      ].join(" ")}
    >
      <img
        className={styles.image}
        alt={title}
        src={imageUrl}
        style={{
          filter: isSold ? "blur(5px)" : "none",
        }}
      />
      <div
        className={styles.information}
        style={{
          filter: isSold ? "blur(5px)" : "none",
        }}
      >
        <div className={styles.title}>{title}</div>
        <div className={styles.frameParent}>
          <div className={styles.location}>
            <img
              className={styles.mapPinIcon}
              alt="Location"
              src="/map-pin2@2x.png"
            />
            <div className={styles.city}>{city}</div>
          </div>
          <div className={styles.details}>
            <div className={styles.area}>{area} acres</div>
            <div className={styles.price}>Rs. {price}</div>
          </div>
        </div>
      </div>
      {isSold ? (
        <div className={styles.soldWatermark}>SOLD</div>
      ) : (
        <button className={styles.check} onClick={handleBuyNowClick}>
          sold
        </button>
      )}
    </div>
  );
};

export default BuilderPropertyCard;