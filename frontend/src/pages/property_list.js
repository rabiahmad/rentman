import React, { useState, useEffect, useContext } from "react";
import { PropertyContext } from "../components/property_context";
import BaseListCard from "../components/BaseListCard";
import DeletePropertyAction from "../components/DeletePropertyAction";
import "../assets/css/PropertyList.css";

const PropertyList = () => {
  const { refreshList, completeRefresh, triggerRefresh } = useContext(PropertyContext);
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

  const handleDeleteProperty = (propertyId) => {
    setProperties((prevProperties) => prevProperties.filter((property) => property.id !== propertyId));
  };

  const generateCard = (property) => {
    const title = property.house_number + " " + property.street + ", " + property.town;
    const text =
      property.house_number +
      " " +
      property.street +
      ", " +
      property.town +
      " " +
      property.postcode +
      ", " +
      property.property_type;

    return (
      <BaseListCard
        key={property.id}
        title={title}
        text={text}
        deleteAction={<DeletePropertyAction propertyId={property.id} onDelete={handleDeleteProperty} />}
      />
    );
  };

  return (
    <div>
      <h2>Properties</h2>
      <div className="property-grid">{properties.map((property) => generateCard(property))}</div>
    </div>
  );
};

export default PropertyList;
