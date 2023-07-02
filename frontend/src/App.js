import "./App.css";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import PropertyList from "./pages/property_list";
import TenantList from "./pages/tenant_list_page";
import LandlordList from "./pages/landlord_list";
import PropertyListWrapper from "./pages/property_list_wrapper";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property-list" element={<PropertyListWrapper />} />
          <Route path="/tenant-list" element={<TenantList />} />
          <Route path="/landlord-list" element={<LandlordList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
