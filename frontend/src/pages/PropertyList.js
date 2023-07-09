import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../assets/css/ListItem.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties();
  }, [properties]);

  const getProperties = async () => {
    try {
      const response = await fetch("/api/rentals/properties/");
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        console.error("Error fetching properties. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
    }
  };

  const generateOutput = (property) => {
    const title = property.house_number + " " + property.street + ", " + property.town;
    const detailLink = `/properties/${property.id}`;

    return (
      <Link to={detailLink} className="item-link">
        <div className="list-item" key={property.id}>
          {title}
        </div>
      </Link>
    );
  };

  return (
    <div>
      <h2>Properties</h2>
      <div className="list-container">{properties.map((property) => generateOutput(property))}</div>

      <Link to="/properties/add">
        <Button variant="primary">Add Property</Button>
      </Link>
    </div>
  );
};

export default PropertyList;
