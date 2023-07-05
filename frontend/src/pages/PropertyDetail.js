import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const PropertyDetail = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [tenancies, setTenancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyResponse = await fetch(`/api/rentals/properties/${propertyId}`);
        if (propertyResponse.ok) {
          const propertyData = await propertyResponse.json();
          setProperty(propertyData);
        } else {
          console.error("Error fetching property details. Please try again.");
        }

        const tenancyResponse = await fetch(`/api/rentals/tenancies/?property=${propertyId}`);
        if (tenancyResponse.ok) {
          const tenancyData = await tenancyResponse.json();
          setTenancies(tenancyData);
        } else {
          console.error("Error fetching tenancy details. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching property and tenancy details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propertyId]);

  if (!property || loading) {
    return <LoadingSpinner />;
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/rentals/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Property deleted successfully!");
        navigate("/property-list");
      } else {
        console.error("Error deleting property. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div>
      <h2>Property Details</h2>
      <p>Property ID: {property.id}</p>
      <p>House Number: {property.house_number}</p>
      <p>Street: {property.street}</p>
      <p>Town: {property.town}</p>
      <p>Postcode: {property.postcode}</p>
      <p>Property Type: {property.property_type}</p>

      <Button variant="danger" onClick={() => setModalShow(true)}>
        Delete Property
      </Button>

      <ConfirmDeleteModal show={modalShow} onHide={() => setModalShow(false)} onDelete={handleDelete} />

      {tenancies.length > 0 && tenancies.some((tenancy) => tenancy.property === property.id) ? (
        <>
          <h3>Linked Tenancies</h3>
          {tenancies
            .filter((tenancy) => tenancy.property === property.id)
            .map((tenancy) => (
              <div style={{ padding: "1rem" }} key={tenancy.id}>
                <Card style={{ width: "40rem", padding: "1rem" }}>
                  <Card.Img variant="top" />
                  <Card.Body>
                    <Card.Title>Tenancy Contract</Card.Title>
                    <Card.Text>
                      <div>
                        <p>Tenancy ID: {tenancy.id}</p>
                        <p>Start Date: {tenancy.start_date}</p>
                        <p>End Date: {tenancy.end_date}</p>
                        <p>Rent: {tenancy.rent}</p>
                        {tenancy.property && <LinkedPropertyDetail propertyId={tenancy.property} />}
                        {tenancy.tenants &&
                          tenancy.tenants.map((tenantId) => (
                            <div key={tenantId}>
                              <TenantDetail tenantId={tenantId} />
                            </div>
                          ))}
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))}
        </>
      ) : (
        <h5>No linked tenancies</h5>
      )}
    </div>
  );
};

const TenantDetail = ({ tenantId }) => {
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
    <div style={{ padding: "1rem" }}>
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

const LinkedPropertyDetail = ({ propertyId }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`/api/rentals/properties/${propertyId}`);
        if (response.ok) {
          const propertyData = await response.json();
          setProperty(propertyData);
        } else {
          console.error(`Error fetching property with ID ${propertyId}`);
        }
      } catch (error) {
        console.error(`Error fetching property with ID ${propertyId}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  if (!property || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <p>
        Property: {property.house_number} {property.street}, {property.town}, {property.postcode}
      </p>
    </div>
  );
};

export default PropertyDetail;
