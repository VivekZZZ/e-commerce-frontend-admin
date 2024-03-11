import React, { useState } from "react";
import "./addProduct.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  let [name, setName] = useState("");
  let [brand, setBrand] = useState("");
  let [category, setCategory] = useState("");
  let [color, SetColor] = useState("");
  let [description, setDescription] = useState("");
  let [image_url, setImage_url] = useState("");
  let [cost, setCost] = useState("");
  let [discount_cost, setDiscount_cost] = useState("");
  let [quantity, setQuantity] = useState("");

  let categoryOptions = [
    { value: "mobile", label: "Mobiles & Tablets" },
    { value: "speaker", label: "Speakers" },
    { value: "earphone", label: "Earphones" },
    { value: "camera", label: "Camera" },
    { value: "accessories", label: "Accessories" },
    { value: "tv", label: "TVs" },
    { value: "storage", label: "Storage Devices" },
  ];

  let data = {
    name,
    brand,
    category,
    color,
    description,
    image_url,
    cost,
    discount_cost,
    quantity,
  };

  let merchant = JSON.parse(localStorage.getItem("currentMerchant"));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      brand.trim() === "" ||
      category.trim() === "" ||
      description.trim() === "" ||
      image_url.trim() === "" ||
      cost.trim() === "" ||
      discount_cost.trim() === "" ||
      color.trim() === ""
    ) {
      toast.error("All Fields are Mandatory", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      axios
        .post(`http://localhost:8080/products/${merchant.id}`, data)
        .then(() => {
          toast.success("Product Added Successfully", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  };

  return (
    <div id="add-product">
      <ToastContainer />
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="add-product-item">
          <h1>Add Product</h1>
          <div className="inputField">
            <label htmlFor="name">
              Product Name <span>*</span>
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
            <label htmlFor="category">
              Category <span>*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categoryOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{ color: "black" }}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="inputField">
            <label htmlFor="brand">
              Brand <span>*</span>
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              placeholder="Enter Brand"
            />
          </div>
          <div className="inputField">
            <label htmlFor="color">
              Color <span>*</span>
            </label>
            <input
              type="text"
              value={color}
              onChange={(e) => {
                SetColor(e.target.value);
              }}
              placeholder="Enter Color"
            />
          </div>

          <div className="inputField">
            <label htmlFor="description">
              Description <span>*</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
            />
          </div>
          <div className="inputField">
            <label htmlFor="imageUrl">
              Image Url <span>*</span>
            </label>
            <input
              type="text"
              value={image_url}
              onChange={(e) => setImage_url(e.target.value)}
              placeholder="Enter Image Url"
            />
          </div>
          <div className="inputField">
            <label htmlFor="cost">
              Cost <span>*</span>
            </label>
            <input
              type="text"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="Enter Cost"
            />
          </div>
          <div className="inputField">
            <label htmlFor="discount-cost">
              Discount Cost <span>*</span>
            </label>
            <input
              type="text"
              value={discount_cost}
              onChange={(e) => setDiscount_cost(e.target.value)}
              placeholder="Enter Discount Cost"
            />
          </div>
          <div className="inputField">
            <label htmlFor="quantity">
              Quantity <span>*</span>
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter Quantity"
            />
          </div>
          <button>Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
