import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const TenantCard = ({ tenant }) => {
  return (
    <div className="tenant-card">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>Tenant</Card.Title>
          <Card.Text>
            <div>
              <p>Tenant ID: {tenant.id}</p>
              <p>
                Name: {tenant.first_name} {tenant.last_name}
              </p>
              <p>Phone: {tenant.phone}</p>
              <p>Email: {tenant.email}</p>
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="primary">View</Button>
            <Button variant="secondary">Edit</Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

const TenantGrid = ({ tenants }) => {
  return (
    <div className="tenant-grid">
      {tenants.map((tenant) => (
        <TenantCard key={tenant.id} tenant={tenant} />
      ))}
    </div>
  );
};

export default TenantGrid;
