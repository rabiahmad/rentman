import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { PropertyContext } from "./property_context";

const DeleteProperty = ({ propertyId, onDelete }) => {
  const [modalShow, setModalShow] = React.useState(false);
  // const { triggerRefresh } = useContext(PropertyContext);

  function ConfirmDeleteModal(props) {
    return (
      <Modal {...props} centered>
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
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/rentals/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Property deleted successfully!");
        // triggerRefresh();
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
      <img
        width="30"
        height="30"
        src="https://img.icons8.com/fluency/48/delete-forever.png"
        onClick={() => setModalShow(true)}
        alt="delete"
      />

      <ConfirmDeleteModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default DeleteProperty;
