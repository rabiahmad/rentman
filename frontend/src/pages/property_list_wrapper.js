import React from "react";
import { PropertyProvider } from "../components/property_context";
import AddPropertyForm from "../components/add_property_form";
import PropertyList from "./PropertyList";
import DeleteProperty from "../components/delete_property";

const PropertyListWrapper = () => {
  return (
    <PropertyProvider>
      <PropertyList />
      <AddPropertyForm />
      <DeleteProperty />
    </PropertyProvider>
  );
};

export default PropertyListWrapper;
