import "./App.css";
import Header from "./components/header";
import Navbar from "./components/navbar";
import PropertyListPage from "./pages/property_list_page";
import TenantListPage from "./pages/tenant_list_page";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
      <Routes>
        <Route path="/property-list" component={PropertyListPage}></Route>
        <Route path="/tenant-list" component={TenantListPage}></Route>
      </Routes>
      </BrowserRouter> */}
      <Navbar />
      <PropertyListPage />
    </div>
  );
}

export default App;
