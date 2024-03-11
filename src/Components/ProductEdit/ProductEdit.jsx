import React, { useEffect } from "react";
import { useState } from "react";
import "./ProductEdit.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProductEdit = () => {
  let [id, setId] = useState("");
  let [name, setName] = useState("");
  let [brand, setBrand] = useState("");
  let [category, setCategory] = useState("");
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

  const { productId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/${productId}`)
      .then((response) => {
        setId(response.data.data.id);
        setName(response.data.data.name);
        setBrand(response.data.data.brand);
        setCategory(response.data.data.category);
        setCost(response.data.data.cost);
        setDescription(response.data.data.description);
        setImage_url(response.data.data.image_url);
        setDiscount_cost(response.data.data.discount_cost);
        setQuantity(response.data.data.quantity);
      })
      .catch(() => {
        console.log("Error");
      });
  }, [productId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    let data = {
      id,
      name,
      brand,
      category,
      description,
      image_url,
      cost,
      discount_cost,
      quantity,
    };
    axios
      .put("http://localhost:8080/products/", data)
      .then(() => {
        toast.success("Product Updated Successfully", {
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
          navigate("/merchanthomepage/list-product");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data, {
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
    <div id="edit-product">
      <ToastContainer />
      <form className="edit-product-form" onSubmit={handleUpdate}>
        <div className="edit-product-item">
          <h1>Edit Product</h1>
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

          <button>Update Product</button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
