import "./App.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import PropertyList from "./pages/PropertyList.js";
import TenantList from "./pages/TenantList";
import LandlordList from "./pages/LandlordList.js";
import PropertyListWrapper from "./pages/property_list_wrapper";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./components/searchbar";
import PropertyDetail from "./pages/PropertyDetail";
import TenantDetail from "./pages/TenantDetail";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property-list" element={<PropertyListWrapper />} />
          <Route path="/property/:propertyId" element={<PropertyDetail />} />
          <Route path="/tenant-list" element={<TenantList />} />
          <Route path="/landlord-list" element={<LandlordList />} />
          <Route path="/tenant/:tenantId" element={<TenantDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
