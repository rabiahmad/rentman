import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const LandlordDetail = () => {
  const { landlordId } = useParams();
  const [landlord, setLandlord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const landlordResponse = await fetch(`/api/rentals/landlords/${landlordId}`);
        if (landlordResponse.ok) {
          const landlordData = await landlordResponse.json();
          setLandlord(landlordData);
        } else {
          console.error("Error fetching landlord details. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching landlord details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [landlordId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2>
        {landlord.first_name} {landlord.last_name}
      </h2>
      {landlord && (
        <div>
          <p>Email: {landlord.email}</p>
          <p>Phone: {landlord.phone}</p>
          <p>Notes: {landlord.notes}</p>
        </div>
      )}
    </div>
  );
};

export default LandlordDetail;
