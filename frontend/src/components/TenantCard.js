import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import LoadingSpinner from "../components/LoadingSpinner";

const TenantCard = ({ tenantId, propertyId }) => {
  // const { tenantId } = useParams();
  const [tenant, setTenant] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  console.log(`[TenantCard] propertyId is ${propertyId}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/rentals/tenants/${tenantId}`);
        if (response.ok) {
          const tenantData = await response.json();
          setTenant(tenantData);
        } else {
          console.error(`0 Error fetching tenant with ID ${tenantId}`);
        }
      } catch (error) {
        console.error(`1 Error fetching tenant with ID ${tenantId}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tenantId]);

  const handleEdit = () => {
    navigate(`/tenants/${tenant?.id}/edit`, { state: { ...tenant, propertyId } });
  };

  if (!tenant || loading) {
    return <LoadingSpinner />;
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>
          {tenant.first_name} {tenant.middle_name} {tenant.last_name}
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
          <Button variant="primary" href={`/tenants/${tenantId}`}>
            View
          </Button>
          <Button variant="secondary" onClick={handleEdit}>
            Edit
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default TenantCard;
