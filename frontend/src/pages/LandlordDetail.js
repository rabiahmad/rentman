import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "react-bootstrap/Button";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const LandlordDetail = () => {
  const { landlordId } = useParams();
  const [landlord, setLandlord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landlordResponse = await fetch(`/api/rentals/landlords/${landlordId}`);
        if (landlordResponse.ok) {
          const landlordData = await landlordResponse.json();
          setLandlord(landlordData);
        } else {
          console.error("Error fetching landlord details. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching landlord details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [landlordId]);

  const handleEdit = () => {
    navigate(`/landlords/${landlord?.id}/edit`, { state: landlord });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/rentals/landlords/${landlordId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Landlord deleted successfully!");
        navigate("/landlords");
      } else {
        console.error("Error deleting landlord. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting landlord:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2>
        {landlord.first_name} {landlord.last_name}
      </h2>
      {landlord && (
        <div>
          <p>Email: {landlord.email}</p>
          <p>Phone: {landlord.phone}</p>
          <p>Notes: {landlord.notes}</p>

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
            itemName="landlord"
          />
        </div>
      )}
    </div>
  );
};

export default LandlordDetail;
