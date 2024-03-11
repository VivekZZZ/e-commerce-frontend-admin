import React from "react";
import { useState } from "react";
import "./merchantSignup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MerchantNavbar from "../MerchantNavbar/MerchantNavbar";

const MerchantSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gst_no, setGst_No] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      phone,
      password,
      gst_no,
    };
    axios
      .post("http://localhost:8080/merchants/", payload)
      .then(() => {
        toast.success("Registered Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/merchantlogin");
        }, 3000);
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
      <div id="merchantSignup">
        <form className="formSignup" onSubmit={handleSignupSubmit}>
          <div className="formContent">
            <h1>Register Here</h1>
            <div className="inputField">
              <label htmlFor="name">
                Merchant Name <span>*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter Name"
              />
            </div>
            <div className="inputField">
              <label htmlFor="email">
                Email Id <span>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Email"
              />
              {!isValidEmail && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  Invalid Format of email address
                </p>
              )}
            </div>
            <div className="inputField">
              <label htmlFor="phone">
                Phone Number <span>*</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone"
              />
            </div>
            <div className="inputField">
              <label htmlFor="gst_no">
                Gst Number <span>*</span>
              </label>
              <input
                type="text"
                value={gst_no}
                onChange={(e) => setGst_No(e.target.value)}
                placeholder="Enter GST No"
              />
            </div>
            <div className="inputField">
              <label htmlFor="password">
                Password <span>*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </div>

            <button>Sign up</button>
          </div>
          <div className="login">
            <p>
              Already have an account? <Link to="/merchantlogin">Log in</Link>
            </p>
            <p className="policy">
              By signing up, you agree to our <span>Terms Of Use</span> and{" "}
              <span>Privacy Policy</span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default MerchantSignUp;
