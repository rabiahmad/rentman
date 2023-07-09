import React, { useState, useEffect } from "react";
import "../assets/css/ListItem.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const TenantList = () => {
  let [tenants, setTenants] = useState([]);

  useEffect(() => {
    getTenants();
  }, []);

  let getTenants = async () => {
    let response = await fetch("/api/rentals/tenants/");
    let data = await response.json();
    setTenants(data);
  };

  const generateOutput = (tenant) => {
    const name = tenant.first_name + (tenant.middle_name ? " " + tenant.middle_name : "") + " " + tenant.last_name;
    const tenantDetailLink = `/tenants/${tenant.id}`;

    return (
      <Link to={tenantDetailLink} className="item-link">
        <div className="list-item" key={tenant.id}>
          {name}
        </div>
      </Link>
    );
  };

  return (
    <div>
      <h2>Tenants</h2>
      <div className="list-container">{tenants.map((tenant) => generateOutput(tenant))}</div>
      <Link to="/tenants/add">
        <Button variant="primary">Add Tenant</Button>
      </Link>
    </div>
  );
};

export default TenantList;
