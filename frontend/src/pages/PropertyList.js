import React, { useState, useEffect, useContext } from "react";
import { PropertyContext } from "../components/property_context";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../assets/css/PropertyList.css";

const PropertyList = () => {
  const { refreshList, completeRefresh, triggerRefresh } = useContext(PropertyContext);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties();
  }, [refreshList]);

  const getProperties = async () => {
    try {
      const response = await fetch("/api/rentals/properties/");
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      } else {
        console.error("Error fetching properties. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      completeRefresh();
    }
  };

  const generateOutput = (property) => {
    const title = property.house_number + " " + property.street + ", " + property.town;
    const detailLink = `/property/${property.id}`;

    return (
      <Col key={property.id} md={4}>
        <div className="property-list-item">
          <Card>
            <Card.Body>
              <Link to={detailLink} className="card-link">
                <Card.Title>{title}</Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Col>
    );
  };

  return (
    <div>
      <Row>{properties.map((property) => generateOutput(property))}</Row>
    </div>
  );
};

export default PropertyList;
