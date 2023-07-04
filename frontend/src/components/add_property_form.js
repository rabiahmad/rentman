import React, { useContext, useState, useEffect } from "react";
import { PropertyContext } from "./property_context";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddPropertyForm = () => {
  const [modalShow, setModalShow] = useState(false);
  const { triggerRefresh } = useContext(PropertyContext);

  const [propertyData, setPropertyData] = useState({
    house_number: "",
    street: "",
    town: "",
    postcode: "",
    property_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
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
      const response = await fetch("/api/rentals/properties/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });
      if (response.ok) {
        console.log("Property added successfully!");
        handleCloseModal();
      } else {
        console.error("Error adding property. Please try again.");
      }
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleOpenModal = () => {
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    triggerRefresh();
    resetForm();
  };

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await fetch("/api/rentals/property_types/");
        if (response.ok) {
          const data = await response.json();
          return data.property_type;
        } else {
          console.error("Error fetching property types.");
          return [];
        }
      } catch (error) {
        console.error("Error fetching property types:", error);
        return [];
      }
    };

    fetchPropertyTypes()
      .then((types) => setPropertyTypes(types))
      .catch((error) => console.error("Error setting property types:", error));
  }, []);

  const [propertyTypes, setPropertyTypes] = useState([]);

  return (
    <>
      <img
        width="45"
        height="45"
        src="https://img.icons8.com/color/48/filled-plus-2-math.png"
        onClick={handleOpenModal}
        alt="Add new property"
      />

      <Modal show={modalShow} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>House Number:</Form.Label>
              <Form.Control type="text" name="house_number" value={propertyData.house_number} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Street:</Form.Label>
              <Form.Control type="text" name="street" value={propertyData.street} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Town:</Form.Label>
              <Form.Control type="text" name="town" value={propertyData.town} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Postcode:</Form.Label>
              <Form.Control type="text" name="postcode" value={propertyData.postcode} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Property Type:</Form.Label>
              <Form.Control as="select" name="property_type" value={propertyData.property_type} onChange={handleChange}>
                <option value="">Select Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddPropertyForm;
