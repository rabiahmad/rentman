import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const DeleteProperty = ({ propertyId, onDelete }) => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/rentals/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Property deleted successfully!");
      } else {
        console.error("Error deleting property. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }

    // Call the onDelete function passed as a prop
    if (onDelete) {
      onDelete(propertyId);
    }
  };

  const ConfirmDeleteModal = (props) => {
    return (
      <Modal centered show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Warning.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Confirm delete!</h4>
          <p>Are you sure you want to delete this property?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleDelete();
              if (onDelete) {
                onDelete();
              }
            }}
          >
            Delete Property
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return <ConfirmDeleteModal show={modalShow} onHide={() => setModalShow(false)} />;
};

export default DeleteProperty;
