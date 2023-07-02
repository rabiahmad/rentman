import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PropertyContext } from "./property_context";

const DeletePropertyAction = ({ propertyId, onDelete }) => {
  const [modalShow, setModalShow] = useState(false);
  const { triggerRefresh } = useContext(PropertyContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/rentals/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Property deleted successfully!");
        triggerRefresh();
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

  return (
    <>
      <Button variant="danger" onClick={() => setModalShow(true)}>
        Delete
      </Button>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Confirm delete!</h4>
          <p>Are you sure you want to delete this property?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeletePropertyAction;
