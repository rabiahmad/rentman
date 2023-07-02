import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ConfirmDeleteModal = () => {
  return (
    <div className="modal show" style={{ display: "block", position: "initial" }}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this property?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="warning">Delete</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default ConfirmDeleteModal;
