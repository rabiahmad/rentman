import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          rentman.
        </a>
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
              <Link className="nav-link" to="/property-list">
                Properties
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                People
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Tenants
                </a>
                <a className="dropdown-item" href="#">
                  Landlords
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">
                  Contractors
                </a>
              </div>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/tenant-list">
                Tenants
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/landlord-list">
                Landlords
              </Link>
            </li>

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
