import React from "react";
import { Link } from "react-router-dom";
import "./merchantNavbar.css";

const MerchantNavbar = () => {
  return (
    <div className="merchantNavbar">
      <div className="logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>
            Shop<span>It</span>
            <p className="logo-sub">Merchant Panel</p>
          </h1>
        </Link>
      </div>
      <div className="options">
        <Link to="/merchantlogin">Log in</Link>
      </div>
    </div>
  );
};

export default MerchantNavbar;
