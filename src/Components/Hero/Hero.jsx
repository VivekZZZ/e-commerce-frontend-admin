import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import heroImg from "../Assets/hero-3.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Sell Online With ShopIt</h2>
        <div className="hero-left-content">
          <p>Sell Your<br /> Products <br />Across India</p>
        </div>
        <Link to="/merchantsignup"><button>Become A Merchant</button></Link>
      </div>
      <div className="hero-right">
        <img src={heroImg} alt="" />
      </div>
    </div>
  );
};

export default Hero;
