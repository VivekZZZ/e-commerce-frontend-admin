import React from "react";
import { Link } from "react-router-dom";
import "./productNavbar.css";

const ProductNavbar = () => {
  return (
    <div className="productNavbar">
      <div className="logo">
        <Link to="/merchanthomepage" style={{ textDecoration: "none" }}>
          <h1>
            Shop<span>It</span><p className="logo-sub">Merchant Panel</p>
          </h1>
        </Link>
      </div>
      <div className="options">
        <Link to="/">Logout</Link>
        <Link to="/merchanthomepage/merchantEdit">Update Profile</Link>
      </div>
    </div>
  );
};

export default ProductNavbar;
