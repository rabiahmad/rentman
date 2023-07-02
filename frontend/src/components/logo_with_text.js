import React from "react";
import LogoImage from "./logo_image";

const LogoWithText = () => {
  return (
    <div className="logo-with-text-container">
      <div className="side">
        <LogoImage />
      </div>
      <div className="side side-content-center logo-text">
        <p>rentman.</p>
      </div>
    </div>
  );
};

export default LogoWithText;
