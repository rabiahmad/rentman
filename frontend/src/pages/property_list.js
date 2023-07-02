import React, { useState, useEffect } from "react";
import AddPropertyForm from "../components/add_property_form";

const PropertyList = () => {
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
    <div>
      <h2>Properties</h2>
      <div className="list-container">
        <ul className="list-group list-group-flush">
          {properties.map((property, index) => (
            <li key={index} className="list-group-item">
              {property.house_number} {property.street}, {property.town}
            </li>
          ))}
        </ul>
      </div>
      <AddPropertyForm />
    </div>
  );
};

export default PropertyList;
