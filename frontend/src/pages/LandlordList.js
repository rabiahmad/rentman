import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const LandlordList = () => {
  let [landlords, setLandlords] = useState([]);

  useEffect(() => {
    getLandlords();
  }, []);

  let getLandlords = async () => {
    let response = await fetch("/api/rentals/landlords/");
    let data = await response.json();
    setLandlords(data);
  };

  const generateOutput = (landlord) => {
    const name =
      landlord.first_name + (landlord.middle_name ? " " + landlord.middle_name : "") + " " + landlord.last_name;

    const landlordDetailLink = `/landlords/${landlord.id}`;

    return (
      <Link to={landlordDetailLink} className="item-link">
        <div className="list-item" key={landlord.id}>
          {name}
        </div>
      </Link>
    );
  };

  return (
    <div>
      <h2>Landlords</h2>
      <div className="list-container">{landlords.map((landlord) => generateOutput(landlord))}</div>
      <Link to="/landlords/add">
        <Button variant="primary">Add Landlord</Button>
      </Link>
    </div>
  );
};
export default LandlordList;
