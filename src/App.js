import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import OtpVerify from "./pages/OtpVerify";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/protectedRoute";

import EditPortfolio from "./pages/EditPortfolio";  
import PublicPortfolio from "./pages/PublicPortfolio";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verify" element={<OtpVerify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
         {/* Public Portfolio - Dynamic username route */}
        <Route path="/public/:username" element={<PublicPortfolioWrapper />} />

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
        <Route
          path="/create-portfolio"
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
//  * Wrapper component for PublicPortfolio
//  * Extracts `username` param from URL and passes it as prop
//  */
import { useParams } from 'react-router-dom';
function PublicPortfolioWrapper() {
  const { username } = useParams();
  return <PublicPortfolio username={username} />;
}
export default App;
