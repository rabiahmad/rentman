import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ConfirmDeleteModal = ({ show, onHide, onDelete }) => {
  const handleDelete = () => {
    onDelete(); // Call the onDelete function passed as a prop
  };

  return (
    <Modal centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Warning.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Confirm delete!</h4>
        <p>Are you sure you want to delete this property?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Property
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
