import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import styles from "./PropertyDetailsPage.module.css";
import PropertyDetails from "../components/PropertyDetails";
import SimilarProperties from "../components/SimilarProperties";

interface Property {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  price: number;
  Bhk: number;
  area: number;
  type: string;
  status: string;
  purpose: string;
  amenities: string[];
  created_at: string;
  __v: number;
}

const PropertyDetailsPage: FunctionComponent = () => {
  const { property_id } = useParams<{ property_id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/property/${property_id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }

        const result = await response.json();
        setProperty(result.property);
        console.log(property);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setError("Failed to fetch property details");
      }
    };

    fetchProperty();
  }, [property_id]);

  if (error) {
    return <div className={styles.propertyDetailsPage}>Error: {error}</div>;
  }

  return (
    <div className={styles.propertyDetailsPage}>
      {property ? (
        <div>      
          <Navbar/>
          <PropertyDetails property={property}/>
          <SimilarProperties/>
        </div>
      ) : (
        <p className={styles.loading}>Loading...</p>
      )}
    </div>
  );
};

export default PropertyDetailsPage;
