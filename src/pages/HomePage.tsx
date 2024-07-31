import { FunctionComponent, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomerReviewCard from "../components/CustomerReviewCard";
import LoginPopup from "../components/LoginPopup";
import PropertyCard from "../components/PropertyCard";
import Articles from "../components/Articles"; 

const HomePage: FunctionComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoginPopupVisible, setIsVisible] = useState(false); // State for login popup
  const [properties, setProperties] = useState([]);
  
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Replace with your backend API URL
    const apiUrl = "http://localhost:5000/api/appointments";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
        }),
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
        // Clear the form fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
      } else {
        throw new Error("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/property", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }

        const result = await response.json();
        setProperties(result);
      } catch (error) {
        console.log("Error fetching property cards:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className={isLoginPopupVisible ? `${styles.homePage} ${styles.blur}` : styles.homePage}>
      <Navbar onLoginClick={() => setIsLoginPopupVisible(true)} />

      <div className={styles.hero}>
        <div className={styles.introtext}>Your dream home awaits...</div>
        <form className={styles.aptform} onSubmit={handleSubmit}>
          <div className={styles.book}>BOOK APPOINTMENT</div>
          <div className={styles.fullname}>
            <input
              className={styles.fname}
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className={styles.lname}
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <input
            className={styles.email}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.phno}
            placeholder="Phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button className={styles.bookappointment} type="submit">
            Get Your Appointment
          </button>
        </form>
      </div>

      <div className={styles.popularfeatures}>
        <div className={styles.heading}>PROPERTY DETAILS</div>
        <div className={styles.subheading}>ALL AWESOME POPULAR LOCATIONS</div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <img src="cut-paper@2x.png" alt="3200+ Sqft." />
            <p>3200+ Sqft.</p>
          </div>
          <div className={styles.feature}>
            <img src="bedroom@2x.png" alt="3BHK" />
            <p>3BHK</p>
          </div>
          <div className={styles.feature}>
            <img src="car@2x.png" alt="Garage" />
            <p>Garage</p>
          </div>
          <div className={styles.feature}>
            <img src="swimming-pool@2x.png" alt="Swimming Pool" />
            <p>Swimming Pool</p>
          </div>
          <div className={styles.feature}>
            <img src="full-family@2x.png" alt="Ideal for Family" />
            <p>Ideal for Family</p>
          </div>
        </div>

        <section className={styles.popularProperties}>
          <div className={styles.heading}>POPULAR PROPERTIES</div>
          <div className={styles.listings}>
          {properties.slice(0, 4).map((property) => (
            <Link
              key={property._id}
              to={`/property-details-page/${property._id}`}
              className={styles.linkWrapper}
            >
              <PropertyCard
                title={property.title}
                city={property.city}
                price={property.price.toString()}
                area={property.area.toString()}
              />
            </Link>
          ))}
          </div>
        </section>
      </div>

      <Articles /> 

      <div className={styles.happycustomers}>
        <div className={styles.heading}>HAPPY CUSTOMERS</div>
        <div className={styles.subheading}>HAPPY TRADE</div>
        <div className={styles.reviews}>
          <CustomerReviewCard imageUrl="./istockphoto1476170969170667a-1@2x.png" name="Sudhanshu Bakshi" review="Personal appointments arranged through their platform were instrumental in finding my dream home effortlessly. I highly recommend their services for reliable real estate insights and expert assistance." />
          <CustomerReviewCard imageUrl="./istockphoto1476170969170667a-1@2x.png" name="Sudhanshu Bakshi" review="Personal appointments arranged through their platform were instrumental in finding my dream home effortlessly. I highly recommend their services for reliable real estate insights and expert assistance." />
          <CustomerReviewCard imageUrl="./istockphoto1476170969170667a-1@2x.png" name="Sudhanshu Bakshi" review="Personal appointments arranged through their platform were instrumental in finding my dream home effortlessly. I highly recommend their services for reliable real estate insights and expert assistance." />
        </div>
      </div>

      <Footer />

      {isLoginPopupVisible && (
        <LoginPopup onClose={() => setIsLoginPopupVisible(false)} />
      )}
    </div>
  );
};

export default HomePage;
