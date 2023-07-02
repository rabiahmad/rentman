import React from "react";
import { PropertyProvider } from "../components/property_context";
import PropertyList from "./property_list";
import AddPropertyForm from "../components/add_property_form";

const PropertyListWrapper = () => {
  return (
    <PropertyProvider>
      <PropertyList />
      <AddPropertyForm />
    </PropertyProvider>
  );
};

export default PropertyListWrapper;
