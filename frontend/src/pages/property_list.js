import React, { useState, useEffect, useContext } from "react";
import { PropertyContext } from "../components/property_context";
import DeleteProperty from "../components/delete_property";

const PropertyList = () => {
  const { refreshList, completeRefresh } = useContext(PropertyContext);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties();
  }, [refreshList]);

  const getProperties = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/rentals/properties/");
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        console.error("Error fetching properties. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      completeRefresh();
    }
  };

  return (
    <div>
      <h2>Properties</h2>
      <div className="list-container">
        <ul className="list-group list-group-flush">
          {properties.map((property, index) => (
            <li key={index} className="list-group-item">
              {property.house_number} {property.street}, {property.town}
              <DeleteProperty propertyId={property.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyList;
