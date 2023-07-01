import React, { useState, useEffect } from "react";

const LandlordList = () => {
  let [properties, setLandlords] = useState([]);

  useEffect(() => {
    getLandlords();
  }, []);

  let getLandlords = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/rentals/landlords/");
    let data = await response.json();
    setLandlords(data);
  };

  return (
    <div>
      <h2>Landlords</h2>
      <div className="list-container">
        <ul className="list-group list-group-flush">
          {properties.map((landlord, index) => (
            <li key={index} className="list-group-item">
              {landlord.first_name} {landlord.middle_name} {landlord.last_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LandlordList;
