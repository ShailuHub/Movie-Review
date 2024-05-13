import ForgotPassword from "./components/users/authentication/ForgotPassword";
import OtpVerification from "./components/users/authentication/OtpVerification";
import ResetPassword from "./components/users/authentication/ResetPassword";
import Home from "./components/users/home/Home";
import Navbar from "./components/users/navbar/Navbar";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
