import React, { useContext, useState } from "react";
import { PropertyContext } from "./property_context";

const AddPropertyForm = () => {
  const { triggerRefresh } = useContext(PropertyContext);

  const [propertyData, setPropertyData] = useState({
    house_number: "",
    street: "",
    town: "",
    postcode: "",
    property_type: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/rentals/properties/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });
      if (response.ok) {
        // Property data successfully submitted
        console.log("Property added successfully!");
        // Reset the form after submission
        setPropertyData({
          house_number: "",
          street: "",
          town: "",
          postcode: "",
          property_type: "",
        });
        // Close the modal after submission
        handleCloseModal();
      } else {
        // Handle the case when the request is not successful
        console.error("Error adding property. Please try again.");
      }
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    triggerRefresh(); // Call triggerRefresh to refresh the PropertyList component
  };

  return (
    <div>
      <img
        width="48"
        height="48"
        src="https://img.icons8.com/color/48/filled-plus-2-math.png"
        onClick={handleOpenModal}
        alt="Add new property"
      />

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="house_number">House Number:</label>
                <input
                  type="text"
                  id="house_number"
                  name="house_number"
                  value={propertyData.house_number}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="street">Street:</label>
                <input type="text" id="street" name="street" value={propertyData.street} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="town">Town:</label>
                <input type="text" id="town" name="town" value={propertyData.town} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="postcode">Postcode:</label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={propertyData.postcode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="property_type">Property Type:</label>
                <input
                  type="text"
                  id="property_type"
                  name="property_type"
                  value={propertyData.property_type}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Submit</button>

              {/* <img
                width="48"
                height="48"
                src="https://img.icons8.com/color/48/filled-plus-2-math.png"
                alt="filled-plus-2-math"
              /> */}

              {/* <input type="image" src="https://img.icons8.com/color/48/filled-plus-2-math.png" alt="Submit"></input> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPropertyForm;
