// PropertyContext.js
import React, { createContext, useState } from "react";

const PropertyContext = createContext();

const PropertyProvider = ({ children }) => {
  const [refreshList, setRefreshList] = useState(false);

  const triggerRefresh = () => {
    setRefreshList(true);
  };

  const completeRefresh = () => {
    setRefreshList(false);
  };

  return (
    <PropertyContext.Provider value={{ refreshList, triggerRefresh, completeRefresh }}>
      {children}
    </PropertyContext.Provider>
  );
};

export { PropertyContext, PropertyProvider };
