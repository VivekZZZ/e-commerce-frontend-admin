import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListAllProduct.css";
import { Link } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const ListAllProduct = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  let merchant = JSON.parse(localStorage.getItem("currentMerchant"));

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/find-by-merchant-id/${merchant.id}`)
      .then((response) => {
        setOriginalProducts(response.data.data);
        setFilteredProducts(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [merchant.id]);
  console.log(filteredProducts);

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:8080/products/delete-by-product-id/${id}`)
      .then(() => {
        window.location.assign("/merchanthomepage/list-product");
        // navigate("/merchanthomepage/list-product");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = () => {
    const searchTerm = searchInput.toLowerCase();
    const filtered = originalProducts.filter(
      (product) =>
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="list-products">
      <div className="list-products-items">
        <div className="list-product-search">
          <h1>All Products List</h1>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Search By Category or Brand Name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={handleSearch}>
              <CiSearch />
            </button>
          </div>
        </div>
        <div className="product-header">
          <p>Image</p>
          <p>Name</p>
          <p>Brand</p>
          <p>Category</p>
          <p>Description</p>
          <p>Price</p>
          <p>Discounted Price</p>
          <p>Quantity</p>
          <p>Edit</p>
          <p>Remove</p>
        </div>
        {filteredProducts.map((product) => {
          return (
            <div key={product.id} className="product-header product-row">
              <img src={product.image_url} alt="" className="product-icon" />
              <p>{product.name}</p>
              <p>{product.brand}</p>
              <p>{product.category}</p>
              <p>{product.description}</p>
              <p>Rs. {product.cost}</p>
              <p>Rs. {product.discount_cost}</p>
              <p>{product.quantity}</p>
              <Link to={`/merchanthomepage/product-edit/${product.id}`}>
                <p>
                  <FaEdit
                    style={{
                      color: "#3498db",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  />
                </p>
              </Link>
              <p
                onClick={() => {
                  deleteProduct(product.id);
                }}
              >
                <CiCircleRemove
                  style={{ color: "red", fontSize: "24px", cursor: "pointer" }}
                />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAllProduct;
