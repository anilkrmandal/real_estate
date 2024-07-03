import { FunctionComponent } from "react";
import Nav from "../components/Nav";
import ListingForm from "../components/ListingForm";
import styles from "./Rent.module.css";

const Rent: FunctionComponent = () => {
  return (
    <div className={styles.rent}>
      <Nav/>
      <main className={styles.content}>
        <form className={styles.listingFormParent}>
          <ListingForm />
          <div className={styles.submission}>
            <button className={styles.submitButton}>
              <div className={styles.submitButtonChild} />
              <div className={styles.publish}>PUBLISH</div>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Rent;
