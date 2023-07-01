import React, { useState, useEffect } from "react";

const PropertyListPage = () => {
  let [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties();
  }, []);

  let getProperties = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/rentals/properties/");
    let data = await response.json();
    setProperties(data);
  };

  return (
    <div className="property-container">
      <h2>Properties</h2>
      <div className="property-list">
        <ul className="list-group list-group-flush">
          {properties.map((property, index) => (
            <li key={index} className="list-group-item">
              {property.house_number} {property.street}, {property.town}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyListPage;
