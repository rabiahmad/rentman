import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import LoadingSpinner from "../components/LoadingSpinner";

const TenantCard = ({ tenantId }) => {
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const fetchTenantDetails = async () => {
      try {
        const response = await fetch(`/api/rentals/tenants/${tenantId}`);
        if (response.ok) {
          const tenantData = await response.json();
          setTenant(tenantData);
        } else {
          console.error(`Error fetching tenant with ID ${tenantId}`);
        }
      } catch (error) {
        console.error(`Error fetching tenant with ID ${tenantId}:`, error);
      }
    };

    fetchTenantDetails();
  }, [tenantId]);

  if (!tenant) {
    return <LoadingSpinner />;
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>
          {tenant.first_name} {tenant.last_name}
        </Card.Title>
        <Card.Text>
          <div>
            <p>Tenant ID: {tenant.id}</p>
            <p>Phone: {tenant.phone}</p>
            <p>Email: {tenant.email}</p>
          </div>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="primary" href={`/tenant/${tenantId}`}>
            View
          </Button>
          <Button variant="secondary">Edit</Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default TenantCard;
