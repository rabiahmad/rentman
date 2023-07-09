import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      // completeRefresh();
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
      <ul>{properties.map((property) => generateOutput(property))}</ul>

      <Link to="/properties/add">
        <img
          width="45"
          height="45"
          src="https://img.icons8.com/color/48/filled-plus-2-math.png"
          href="/properties/add"
          alt="Add new property"
        />
      </Link>
    </div>
  );
};

export default PropertyList;
