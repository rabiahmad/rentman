import "./App.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import PropertyList from "./pages/PropertyList.js";
import TenantList from "./pages/TenantList";
import LandlordList from "./pages/LandlordList.js";
import { Routes, Route } from "react-router-dom";
import PropertyDetail from "./pages/PropertyDetail";
import TenantDetail from "./pages/TenantDetail";
import LandlordDetail from "./pages/LandlordDetail";
import AddPropertyForm from "./pages/AddPropertyForm";
import AddTenantForm from "./pages/AddTenantForm";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/properties/add" element={<AddPropertyForm />} />
          <Route path="/properties/:propertyId" element={<PropertyDetail />} />
          <Route path="/properties/:propertyId/edit" element={<AddPropertyForm />} />
          <Route path="/tenants" element={<TenantList />} />
          <Route path="/tenants/add" element={<AddTenantForm />} />
          <Route path="/tenants/:tenantId" element={<TenantDetail />} />
          <Route path="/landlords" element={<LandlordList />} />
          <Route path="/landlords/add" element={<Home />} />
          <Route path="/landlords/:landlordId" element={<LandlordDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
