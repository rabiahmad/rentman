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
        const tenantResponse = await fetch(`/api/rentals/tenants/${tenantId}`);
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
      <h2>
        {tenant.first_name} {tenant.last_name}
      </h2>
      {tenant && (
        <div>
          <p>Email: {tenant.email}</p>
          <p>Phone: {tenant.phone}</p>
          <p>Notes: {tenant.notes}</p>
        </div>
      )}
    </div>
  );
};

export default TenantDetail;
