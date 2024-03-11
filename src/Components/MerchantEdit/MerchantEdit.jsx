import React, { useEffect } from "react";
import { useState } from "react";
import "./MerchantEdit.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const MerchantEdit = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gst_no, setGst_No] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  let navigate = useNavigate();

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(validateEmail(newEmail));
  };

  let merchantId = JSON.parse(localStorage.getItem("currentMerchant")).id;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/merchants/${merchantId}`)
      .then((response) => {
        setId(response.data.data.id);
        setEmail(response.data.data.email);
        setName(response.data.data.name);
        setGst_No(response.data.data.gst_no);
        setPhone(response.data.data.phone);
        setPassword(response.data.data.password);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [merchantId]);

  const handleEdit = (e) => {
    e.preventDefault();
    const payload = {
      id,
      name,
      email,
      phone,
      password,
      gst_no,
    };
    axios
      .put("http://localhost:8080/merchants/", payload)
      .then(() => {
        toast.success("Updated Successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          navigate("/merchanthomepage");
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
      <ToastContainer />
      <div id="merchantEdit">
        <form className="formSignup" onSubmit={handleEdit}>
          <div className="formContent">
            <h1>Edit Details</h1>
            <div className="inputField">
              <label htmlFor="id">
                Merchant Id <span>*</span>
              </label>
              <input type="text" value={id} />
            </div>
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
              />
            </div>
            <div className="inputField">
              <label htmlFor="email">
                Email Id <span>*</span>
              </label>
              <input type="email" value={email} onChange={handleEmailChange} />
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
              />
            </div>

            <button>Update Details</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MerchantEdit;
