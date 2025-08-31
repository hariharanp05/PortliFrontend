import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import OtpVerify from "./pages/OtpVerify";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/protectedRoute";
import AppNavbar from "./components/AppNavbar";
import EditPortfolio from "./pages/EditPortfolio";  

function App() {
  return (
    <Router>
      <AppNavbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-portfolio"
          element={
            <ProtectedRoute>
              <EditPortfolio />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
