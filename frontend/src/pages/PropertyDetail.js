import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "react-bootstrap/Button";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TenantCard from "../components/TenantCard";

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
      <h2>
        {property.house_number} {property.street}
      </h2>
      Property ID: {property.id} <br />
      House Number: {property.house_number} <br />
      Street: {property.street} <br />
      Town: {property.town} <br />
      Postcode: {property.postcode} <br />
      Property Type: {property.property_type} <br />
      <div style={{ display: "flex", gap: "1rem", marginBottom: "20px", marginTop: "10px" }}>
        <Button variant="danger" onClick={() => setModalShow(true)}>
          <AiOutlineDelete />
        </Button>
        <Button variant="primary">
          <AiOutlineEdit />
        </Button>
      </div>
      <ConfirmDeleteModal show={modalShow} onHide={() => setModalShow(false)} onDelete={handleDelete} />
      {tenancies.length > 0 && tenancies.some((tenancy) => tenancy.property === property.id) ? (
        <>
          <h3>Linked Tenancies</h3>
          {tenancies
            .filter((tenancy) => tenancy.property === property.id)
            .map((tenancy, index) => (
              <div style={{ padding: "1rem" }} key={tenancy.id}>
                <h4>Tenancy Contract #{index + 1}</h4>
                <div>
                  Tenancy ID: {tenancy.id} <br />
                  Start Date: {tenancy.start_date} <br />
                  End Date: {tenancy.end_date} <br />
                  Rent: {tenancy.rent}
                  <Row>
                    {tenancy.tenants &&
                      tenancy.tenants.map((tenantId) => (
                        <Col key={tenantId} xs={12} sm={6} md={4} lg={3}>
                          <div key={tenantId} style={{ padding: "0rem", marginTop: "1rem" }}>
                            <TenantCard tenantId={tenantId} />
                          </div>
                        </Col>
                      ))}
                  </Row>
                </div>
              </div>
            ))}
        </>
      ) : (
        <p style={{ color: "red" }}>There are no linked tenancies for this property</p>
      )}
    </div>
  );
};

export default PropertyDetail;
