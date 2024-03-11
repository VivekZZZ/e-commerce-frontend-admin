import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPageMerchant from "./Components/LandingPage/LandingPageMerchant";
import MerchantLogin from "./Components/LoginPage/MerchantLogin";
import MerchantSignUp from "./Components/SignupPage/MerchantSignUp";
import MerchantHomePage from "./Components/HomePage/MerchantHomePage";
import ProductDashboard from "./Components/ProductDashboard/ProductDashboard";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPageMerchant />}></Route>
          <Route path="/merchantlogin" element={<MerchantLogin />}></Route>
          <Route path="/merchantsignup" element={<MerchantSignUp />}></Route>
          <Route path="/merchanthomepage/*" element={<MerchantHomePage />} />
          <Route path="/producthomepage" element={<ProductDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
