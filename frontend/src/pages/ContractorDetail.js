import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "react-bootstrap/Button";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const ContractorDetail = () => {
  const { contractorId } = useParams();
  const [contractor, setContractor] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractorResponse = await fetch(`/api/rentals/contractors/${contractorId}`);
        if (contractorResponse.ok) {
          const contractorData = await contractorResponse.json();
          setContractor(contractorData);
        } else {
          console.error("Error fetching contractor details. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching contractor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contractorId]);

  useEffect(() => {
    if (contractor) {
      const nameValue =
        contractor.contractor_type === "Person"
          ? `${contractor.first_name} ${contractor.last_name}`
          : contractor.company_name;
      setName(nameValue);
    }
  }, [contractor]);

  const handleEdit = () => {
    navigate(`/contractors/${contractor?.id}/edit`, { state: contractor });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/rentals/contractors/${contractorId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Contractor deleted successfully!");
        navigate("/contractors");
      } else {
        console.error("Error deleting contractor. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting contractor:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2>{name}</h2>
      {contractor && (
        <div>
          <p>Email: {contractor.email}</p>
          <p>Phone: {contractor.phone}</p>
          {contractor.contractor_type === "Business" && <p>Website: {contractor.website}</p>}
        </div>
      )}
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
        itemName="contractor"
      />
    </div>
  );
};

export default ContractorDetail;
