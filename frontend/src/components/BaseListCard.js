import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const BaseListCard = ({ title, text, deleteAction }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="primary">View</Button>
          <Button variant="primary">Edit</Button>
          {React.cloneElement(deleteAction, { className: "btn-danger" })}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default BaseListCard;
