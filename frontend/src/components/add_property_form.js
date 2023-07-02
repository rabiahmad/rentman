import React, { useState } from "react";

const AddPropertyForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Perform API request to submit the property data
    console.log("propertyData", propertyData);
    console.log("setPropertyData", setPropertyData);
    // Reset the form after submission
    setPropertyData({
      house_number: "",
      street: "",
      town: "",
      postcode: "",
      property_type: "",
    });
    // Close the modal after submission
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Add new property</button>

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
              <button type="submit">Add Property</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPropertyForm;
