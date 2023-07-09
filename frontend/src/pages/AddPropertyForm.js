import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const AddPropertyForm = () => {
  const location = useLocation();
  const propertyData = location.state;
  const navigate = useNavigate();
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [formData, setFormData] = useState({
    house_number: "",
    street: "",
    town: "",
    postcode: "",
    property_type: "",
  });

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      try {
        const response = await fetch("/api/rentals/property_types/");
        if (response.ok) {
          const data = await response.json();
          setPropertyTypes(data.property_type);
        } else {
          console.error("Error fetching property types.");
        }
      } catch (error) {
        console.error("Error fetching property types:", error);
      }
    };

    fetchPropertyTypes().catch((error) => console.error("Error setting property types:", error));
  }, []);

  useEffect(() => {
    if (propertyData) {
      setFormData(propertyData);
    }
  }, [propertyData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "/api/rentals/properties/";
      let method = "POST";

      if (propertyData) {
        url += `${propertyData.id}/`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (method === "POST") {
          console.log("Property added successfully!");
          navigate("/properties/");
        } else {
          console.log("Property updated successfully!");
          navigate(`/properties/${propertyData.id}`);
        }
      } else {
        console.error("Error saving property. Please try again.");
      }
    } catch (error) {
      console.error("Error saving property:", error);
    }
  };

  const handleCancel = () => {
    if (propertyData) {
      navigate(`/properties/${propertyData.id}`);
    } else {
      navigate("/properties");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>House Number:</Form.Label>
        <Form.Control type="text" name="house_number" value={formData.house_number} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Street:</Form.Label>
        <Form.Control type="text" name="street" value={formData.street} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Town:</Form.Label>
        <Form.Control type="text" name="town" value={formData.town} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Postcode:</Form.Label>
        <Form.Control type="text" name="postcode" value={formData.postcode} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Property Type:</Form.Label>
        <Form.Control as="select" name="property_type" value={formData.property_type} onChange={handleChange}>
          <option value="">Select Property Type</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <div style={{ marginTop: "20px" }}>
        <Button variant="secondary" onClick={handleCancel} style={{ marginRight: "10px" }}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" style={{ marginLeft: "10px" }}>
          {propertyData ? "Update" : "Create"}
        </Button>
      </div>
    </Form>
  );
};

export default AddPropertyForm;
