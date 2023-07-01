import React, { useState, useEffect } from "react";

const TenantList = () => {
  let [properties, setTenants] = useState([]);

  useEffect(() => {
    getTenants();
  }, []);

  let getTenants = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/rentals/tenants/");
    let data = await response.json();
    setTenants(data);
  };

  return (
    <div className="tenant-container">
      <h2>Tenants</h2>
      <div className="tenant-list">
        <ul className="list-group list-group-flush">
          {properties.map((tenant, index) => (
            <li key={index} className="list-group-item">
              {tenant.first_name} {tenant.middle_name} {tenant.last_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TenantList;
