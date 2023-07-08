import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const TenantDetail = () => {
  const { tenantId } = useParams();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tenantResponse = await fetch(`/api/rentals/tenant/${tenantId}`);
        if (tenantResponse.ok) {
          const tenantData = await tenantResponse.json();
          setTenant(tenantData);
        } else {
          console.error("Error fetching tenant details. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching tenant details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tenantId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h2>Tenant - {tenantId}</h2>
    </div>
  );
};

export default TenantDetail;
