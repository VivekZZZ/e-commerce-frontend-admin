import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductNavbar from "../ProductNavbar/ProductNavbar";
import AddProduct from "../AddProduct/AddProduct";
import MerchantEdit from "../MerchantEdit/MerchantEdit";
import "./MerchantHomePage.css";
import Sidebar from "../ProductNavbar/Sidebar";
import ListAllProduct from "../ListAllProducts/ListAllProduct";
import ProductEdit from "../ProductEdit/ProductEdit";

const MerchantHomePage = () => {
  return (
    <div className="merchantHomepage">
      <ProductNavbar />
      <div className="merchant-items">
        <Sidebar />
        <Routes>
          <Route path="/list-product" element={<ListAllProduct />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/merchantEdit" element={<MerchantEdit />} />
          <Route path="/product-edit/:productId" element={<ProductEdit />} />
        </Routes>
      </div>
    </div>
  );
};

export default MerchantHomePage;
