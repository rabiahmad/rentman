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
import ContractorList from "./pages/ContractorList";
import AddContractorForm from "./pages/AddContractorForm";
import ContractorDetail from "./pages/ContractorDetail";
import AddLandlordForm from "./pages/AddLandlordForm";

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
          <Route path="/tenants/:tenantId/edit" element={<AddTenantForm />} />
          <Route path="/landlords" element={<LandlordList />} />
          <Route path="/landlords/add" element={<AddLandlordForm />} />
          <Route path="/landlords/:landlordId" element={<LandlordDetail />} />
          <Route path="/landlords/:landlordId/edit" element={<AddLandlordForm />} />
          <Route path="/contractors" element={<ContractorList />} />
          <Route path="/contractors/add" element={<AddContractorForm />} />
          <Route path="/contractors/:contractorId" element={<ContractorDetail />} />
          <Route path="/contractors/:contractorId/edit" element={<AddContractorForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
