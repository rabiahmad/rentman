import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ContractorList = () => {
  let [landlords, setLandlords] = useState([]);

  useEffect(() => {
    getContractors();
  }, []);

  let getContractors = async () => {
    let response = await fetch("/api/rentals/contractors/");
    let data = await response.json();
    setLandlords(data);
  };

  const generateOutput = (contractor) => {
    const name =
      contractor.contractor_type === "Person"
        ? contractor.first_name + " " + contractor.last_name
        : contractor.company_name;

    const contractorDetailLink = `/contractors/${contractor.id}`;

    return (
      <Link to={contractorDetailLink} className="item-link">
        <div className="list-item" key={contractor.id}>
          {name}
        </div>
      </Link>
    );
  };

  return (
    <div>
      <h2>Contractors</h2>
      <div className="list-container">{landlords.map((contractor) => generateOutput(contractor))}</div>
      <Link to="/contractors/add">
        <Button variant="primary">Add Contractor</Button>
      </Link>
    </div>
  );
};
export default ContractorList;
