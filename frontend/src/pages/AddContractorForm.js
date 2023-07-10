import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const AddContractorForm = () => {
  const location = useLocation();
  const contractorData = location.state;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contractor_type: "",
    service_type: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    website: "",
  });
  const [contractorTypes, setcontractorTypes] = useState([]);
  const [serviceTypes, setserviceTypes] = useState([]);

  useEffect(() => {
    const getContractorTypes = async () => {
      try {
        const response = await fetch("/api/rentals/contractor_types/");
        if (response.ok) {
          const data = await response.json();
          setcontractorTypes(data.contractor_type);
        } else {
          console.error("Error fetching contractor type options.");
        }
      } catch (error) {
        console.error("Error fetching contractor type options:", error);
      }
    };

    const getServiceTypes = async () => {
      try {
        const response = await fetch("/api/rentals/contractor_service_types/");
        if (response.ok) {
          const data = await response.json();
          setserviceTypes(data.service_type);
        } else {
          console.error("Error fetching service type options.");
        }
      } catch (error) {
        console.error("Error fetching service type options.");
      }
    };

    getContractorTypes().catch((error) => console.error("Error setting contractor types:", error));
    getServiceTypes().catch((error) => console.error("Error setting service types:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "/api/rentals/contractors/";
      let method = "POST";

      if (contractorData) {
        url += `${contractorData.id}/`;
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
          console.log("Contractor added successfully!");
          navigate("/contractors/");
        } else {
          console.log("Contractor updated successfully!");
          navigate(`/contractors/${contractorData.id}`);
        }
      } else {
        console.error("Error saving contractor. Please try again.");
      }
    } catch (error) {
      console.error("Error saving contractor:", error);
    }
  };

  const handleCancel = () => {
    if (contractorData) {
      navigate(`/contractors/${contractorData.id}`);
    } else {
      navigate("/contractors");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Contractor Type:</Form.Label>
        <Form.Control as="select" name="contractor_type" value={formData.contractor_type} onChange={handleChange}>
          <option value="">Select contractor type</option>
          {contractorTypes.map((contractor_type, index) => (
            <option key={index} value={contractor_type}>
              {contractor_type}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Service Type:</Form.Label>
        <Form.Control as="select" name="service_type" value={formData.service_type} onChange={handleChange}>
          <option value="">Select service type</option>
          {serviceTypes.map((service_type, index) => (
            <option key={index} value={service_type}>
              {service_type}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {formData.contractor_type === "Business" && (
        <Form.Group>
          <Form.Label>Company name:</Form.Label>
          <Form.Control type="text" name="company_name" value={formData.company_name} onChange={handleChange} />
        </Form.Group>
      )}
      {formData.contractor_type === "Person" && (
        <>
          <Form.Group>
            <Form.Label>First name:</Form.Label>
            <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last name:</Form.Label>
            <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
          </Form.Group>
        </>
      )}

      <Form.Group>
        <Form.Label>Phone:</Form.Label>
        <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" name="email" value={formData.email} onChange={handleChange} />
      </Form.Group>

      {formData.contractor_type === "Business" && (
        <Form.Group>
          <Form.Label>Website:</Form.Label>
          <Form.Control type="text" name="website" value={formData.website} onChange={handleChange} />
        </Form.Group>
      )}

      <div style={{ marginTop: "20px" }}>
        <Button variant="secondary" onClick={handleCancel} style={{ marginRight: "10px" }}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" style={{ marginLeft: "10px" }}>
          {contractorData ? "Update" : "Create"}
        </Button>
      </div>
    </Form>
  );
};

export default AddContractorForm;
