import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "react-bootstrap/Button";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const TenantDetail = () => {
  const { tenantId } = useParams();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tenantResponse = await fetch(`/api/rentals/tenants/${tenantId}`);
        if (tenantResponse.ok) {
          const tenantData = await tenantResponse.json();
          setTenant(tenantData);
        } else {
          console.error("Error fetching tenant details. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching tenant details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tenantId]);

  const handleEdit = () => {
    navigate(`/tenants/${tenant?.id}/edit`, { state: tenant });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/rentals/tenants/${tenantId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Tenant deleted successfully!");
        navigate("/tenants");
      } else {
        console.error("Error deleting tenant. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2>
        {tenant.first_name} {tenant.middle_name} {tenant.last_name}
      </h2>
      {tenant && (
        <div>
          <p>Email: {tenant.email}</p>
          <p>Phone: {tenant.phone}</p>
          <p>Notes: {tenant.notes}</p>

          <div style={{ display: "flex", gap: "1rem", marginBottom: "20px", marginTop: "10px" }}>
            <Button variant="danger" onClick={() => setModalShow(true)}>
              <AiOutlineDelete />
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              <AiOutlineEdit />
            </Button>
          </div>
          <ConfirmDeleteModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            onDelete={handleDelete}
            itemName="tenant"
          />
        </div>
      )}
    </div>
  );
};

export default TenantDetail;
