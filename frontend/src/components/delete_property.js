import React, { useContext } from "react";
import { PropertyContext } from "./property_context";

const DeleteProperty = ({ propertyId, onDelete }) => {
  const { triggerRefresh } = useContext(PropertyContext);
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/rentals/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Property deleted successfully!");
        triggerRefresh();
      } else {
        console.error("Error deleting property. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }

    // Call the onDelete function passed as a prop
    if (onDelete) {
      onDelete(propertyId);
    }
  };

  return (
    <img
      width="30"
      height="30"
      src="https://img.icons8.com/fluency/48/delete-forever.png"
      onClick={handleDelete}
      alt="delete-forever"
    />
  );
};

export default DeleteProperty;
