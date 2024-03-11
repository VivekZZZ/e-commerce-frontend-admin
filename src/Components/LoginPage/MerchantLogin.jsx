import React from "react";
import { useState } from "react";
import "./merchantLogin.css";
import { Link, useNavigate } from "react-router-dom";
import MerchantNavbar from "../MerchantNavbar/MerchantNavbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MerchantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(null);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(inputValue);
    setIsValid(isValidEmail);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:8080/merchants/verify-by-email?email=${email}&password=${password}`
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Logged In Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/merchanthomepage");
          localStorage.setItem(
            "currentMerchant",
            JSON.stringify(response.data.data)
          );
        }, 2000); 
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <>
      <MerchantNavbar />
      <ToastContainer />
      <div id="merchantLogin">
        <form className="formLogin" onSubmit={handleLoginSubmit}>
          <div className="formContent">
            <h1>Welcome back!</h1>
            <div className="inputField">
              <label htmlFor="email">
                Merchant Email <span>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Email Id"
              />
              {email && !isValid && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  Invalid email address
                </p>
              )}
            </div>
            <div className="inputField">
              <label htmlFor="password">
                Password <span>*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <button>Log in</button>
          </div>
          <div className="signup">
            <p>
              Don't have an account? <Link to="/merchantsignup">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default MerchantLogin;
