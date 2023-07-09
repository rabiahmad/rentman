import React, { useState, useEffect } from "react";
import "../assets/css/ListItem.css";
import { Link } from "react-router-dom";

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
    const name = tenant.first_name + " " + tenant.middle_name + " " + tenant.last_name;
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
      <ul>{tenants.map((tenant) => generateOutput(tenant))}</ul>
      <Link to="/tenants/add">
        <img width="45" height="45" src="https://img.icons8.com/color/48/filled-plus-2-math.png" alt="Add new tenant" />
      </Link>
    </div>
  );
};

export default TenantList;
