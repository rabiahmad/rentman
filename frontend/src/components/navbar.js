import React from "react";
import { Link } from "react-router-dom";
import LogoWithText from "./logo_with_text";
import NavDropdown from "react-bootstrap/NavDropdown";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <div>
            {/* <div>rentman.</div> */}
            <LogoWithText />
          </div>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/properties">
                Properties
              </Link>
            </li>
            <NavDropdown title="People" id="basic-nav-dropdown">
              <NavDropdown.Item className="nav-item">
                <Link className="dropdown-item" to="/tenants">
                  Tenants
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link className="dropdown-item" to="/landlords">
                  Landlords
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link className="dropdown-item" to="/contractors">
                  Contractors
                </Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Reports" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link className="dropdown-item" to="#">
                  Upcoming rents
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link className="dropdown-item" to="#">
                  Overdue rents
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link className="dropdown-item" to="#">
                  Revenue report
                </Link>
              </NavDropdown.Item>

              <NavDropdown.Item>
                <Link className="dropdown-item" to="#">
                  Property map
                </Link>
              </NavDropdown.Item>
            </NavDropdown>

            <li className="nav-item">
              <Link className="nav-link disabled" to="#">
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
