// PropertyContext.js
import React, { createContext, useState } from "react";

const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  console.log("property provider active");
  const [refreshList, setRefreshList] = useState(false);

  const triggerRefresh = () => {
    setRefreshList(true);
    console.log("triggerRefresh");
  };

  const completeRefresh = () => {
    setRefreshList(false);
    console.log("completeRefresh");
  };

  return (
    <PropertyContext.Provider value={{ refreshList, triggerRefresh, completeRefresh }}>
      {children}
    </PropertyContext.Provider>
  );
};

export { PropertyContext, PropertyProvider };
