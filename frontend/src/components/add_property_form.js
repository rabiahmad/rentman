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

  const resetForm = () => {
    console.log("Form has been reset");
    setPropertyData({
      house_number: "",
      street: "",
      town: "",
      postcode: "",
      property_type: "",
    });
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
    resetForm();
  };

  return (
    <div>
      <img
        width="45"
        height="45"
        src="https://img.icons8.com/color/48/filled-plus-2-math.png"
        onClick={handleOpenModal}
        alt="Add new property"
      />

      {showModal && (
        <div className="modal" tabindex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Property Details</h5>
              </div>

              <div class="modal-body">
                <div className="col-xs-12 col-sm-12">
                  <form role="form" className="form-horizontal" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="col-xs-3 text-right">
                        <label htmlFor="house_number" className="col-xs-3 text-right">
                          House Number
                        </label>
                      </div>

                      <div className="col-xs-9">
                        <input
                          className="form-control"
                          type="text"
                          id="house_number"
                          name="house_number"
                          value={propertyData.house_number}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-3 text-right">
                        <label htmlFor="street" className="col-xs-3 text-right">
                          Street
                        </label>
                      </div>

                      <div className="col-xs-9">
                        <input
                          className="form-control"
                          type="text"
                          id="street"
                          name="street"
                          value={propertyData.street}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="col-xs-3 text-right">
                        <label htmlFor="town" className="col-xs-3 text-right">
                          Town
                        </label>
                      </div>

                      <div className="col-xs-9">
                        <input
                          className="form-control"
                          type="text"
                          id="town"
                          name="town"
                          value={propertyData.town}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-3 text-right">
                        <label htmlFor="postcode" className="col-xs-3 text-right">
                          Postcode
                        </label>
                      </div>

                      <div className="col-xs-9">
                        <input
                          className="form-control"
                          type="text"
                          id="postcode"
                          name="postcode"
                          value={propertyData.postcode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-xs-3 text-right">
                        <label htmlFor="property_type" className="col-xs-3 text-right">
                          Property Type
                        </label>
                      </div>

                      <div className="col-xs-9">
                        <input
                          className="form-control"
                          type="text"
                          id="property_type"
                          name="property_type"
                          value={propertyData.property_type}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button submit" className="btn btn-primary" onClick={handleSubmit}>
                  Submit
                </button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPropertyForm;
