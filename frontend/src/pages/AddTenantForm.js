import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const AddTenantForm = () => {
  const location = useLocation();
  const tenantData = location.state;
  const navigate = useNavigate();
  const [titles, setTitles] = useState([]);
  const [formData, setFormData] = useState({
    house_number: "",
    street: "",
    town: "",
    postcode: "",
    tenant_type: "",
  });

  useEffect(() => {
    const fetchTitleOptions = async () => {
      try {
        const response = await fetch("/api/rentals/titles/");
        if (response.ok) {
          const data = await response.json();
          setTitles(data.title);
        } else {
          console.error("Error fetching title options.");
        }
      } catch (error) {
        console.error("Error fetching title options:", error);
      }
    };

    fetchTitleOptions().catch((error) => console.error("Error setting titles:", error));
  }, []);

  useEffect(() => {
    if (tenantData) {
      setFormData(tenantData);
    }
  }, [tenantData]);

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
      let url = "/api/rentals/tenants/";
      let method = "POST";

      if (tenantData) {
        url += `${tenantData.id}/`;
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
          console.log("Tenant added successfully!");
          navigate("/tenants/");
        } else {
          console.log("Tenant updated successfully!");
          navigate(`/tenants/${tenantData.id}`);
        }
      } else {
        console.error("Error saving tenant. Please try again.");
      }
    } catch (error) {
      console.error("Error saving tenant:", error);
    }
  };

  const handleCancel = () => {
    if (tenantData) {
      navigate(`/tenants/${tenantData.id}`);
    } else {
      navigate("/tenants");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control as="select" name="title" value={formData.title} onChange={handleChange}>
          <option value="">Select title</option>
          {titles.map((title, index) => (
            <option key={index} value={title}>
              {title}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>First name:</Form.Label>
        <Form.Control type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Middle name:</Form.Label>
        <Form.Control type="text" name="middle_name" value={formData.middle_name} onChange={handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Last name:</Form.Label>
        <Form.Control type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Phone:</Form.Label>
        <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" name="email" value={formData.email} onChange={handleChange} />
      </Form.Group>

      <div style={{ marginTop: "20px" }}>
        <Button variant="secondary" onClick={handleCancel} style={{ marginRight: "10px" }}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" style={{ marginLeft: "10px" }}>
          {tenantData ? "Update" : "Create"}
        </Button>
      </div>
    </Form>
  );
};

export default AddTenantForm;
