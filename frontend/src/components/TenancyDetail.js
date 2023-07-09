import React from "react";
import TenantCard from "./TenantCard";
import { Row, Col } from "react-bootstrap";

const TenancyDetail = (props) => {
  const tenancy = props.tenancy;
  return (
    <div>
      Tenancy ID: {tenancy.id} <br />
      Start Date: {tenancy.start_date} <br />
      End Date: {tenancy.end_date} <br />
      Rent: {tenancy.rent}
      <Row>
        {tenancy.tenants &&
          tenancy.tenants.map((tenantId) => (
            <Col key={tenantId} xs={12} sm={6} md={4} lg={3}>
              <div key={tenantId} style={{ padding: "0rem", marginTop: "1rem" }}>
                <TenantCard tenantId={tenantId} />
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default TenancyDetail;
