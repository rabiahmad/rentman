import React, { useState, useEffect } from "react";
import "../assets/css/TenantList.css";
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
    const tenantDetailLink = `/tenant/${tenant.id}`;

    return (
      <Link to={tenantDetailLink} style={{ display: "block" }}>
        <div className="tenant-list-item" key={tenant.id}>
          {name}
        </div>
      </Link>
    );
  };

  return (
    <div>
      <h2>Tenants</h2>
      <ul>{tenants.map((tenant) => generateOutput(tenant))}</ul>
    </div>
  );
};

export default TenantList;
