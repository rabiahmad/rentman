import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    const name = landlord.first_name + " " + landlord.middle_name + " " + landlord.last_name;
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
      <ul>{landlords.map((landlord) => generateOutput(landlord))}</ul>
      <Link to="/landlords/add">
        <img
          width="45"
          height="45"
          src="https://img.icons8.com/color/48/filled-plus-2-math.png"
          alt="Add new landlord"
        />
      </Link>
    </div>
  );
};
export default LandlordList;
