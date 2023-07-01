import "./App.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import PropertyList from "./pages/property_list";
import TenantList from "./pages/tenant_list_page";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property-list" element={<PropertyList />} />
        <Route path="/tenant-list" element={<TenantList />} />
      </Routes>
    </div>
  );
};

export default App;
