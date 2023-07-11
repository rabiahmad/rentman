import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const ContractorDetail = () => {
  const { contractorId } = useParams();
  const [contractor, setContractor] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractorResponse = await fetch(`/api/rentals/contractors/${contractorId}`);
        if (contractorResponse.ok) {
          const contractorData = await contractorResponse.json();
          setContractor(contractorData);
        } else {
          console.error("Error fetching contractor details. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching contractor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contractorId]);

  useEffect(() => {
    if (contractor) {
      const nameValue =
        contractor.contractor_type === "Person"
          ? `${contractor.first_name} ${contractor.last_name}`
          : contractor.company_name;
      setName(nameValue);
    }
  }, [contractor]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2>{name}</h2>
      {contractor && (
        <div>
          <p>Email: {contractor.email}</p>
          <p>Phone: {contractor.phone}</p>
          {contractor.contractor_type === "Business" && <p>Website: {contractor.website}</p>}
        </div>
      )}
    </div>
  );
};

export default ContractorDetail;
