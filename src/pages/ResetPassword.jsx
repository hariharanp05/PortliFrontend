// src/pages/ResetPassword.js
import React, { useState } from "react";
import { Form, Button, Card, Container, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios"; // 👈 import axios instance
import AppNavbar from "../components/AppNavbar";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    otp: "",
    new_password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ Added loading state
  const navigate = useNavigate();
  const location = useLocation();

  // 📩 Get email from ForgotPassword page
  const email = location.state?.email || "";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.otp) {
      toast.error("OTP is required");
      return;
    }
    if (!/^\d{6}$/.test(formData.otp)) {
      toast.error("OTP must be 6 digits");
      return;
    }
    if (!formData.new_password) {
      toast.error("New password is required");
      return;
    }
    // if (formData.new_password.length < 6) {
    //   toast.error("Password must be at least 6 characters");
    //   return;
    // }
    if (formData.new_password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true); // 🔹 Disable button when submitting
      // ✅ Call backend reset password API
      const response = await API.post("/reset-password/", {
        email,
        otp: formData.otp,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      });

      if (response.status === 200) {
        toast.success("Password Reset Successful 🎉");
        console.log("Reset Password Response:", response.data);

        // ✅ Navigate to login page after success
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.error || err.response?.data?.message || "Failed to reset password. Try again."
      );
    }finally {
      setLoading(false); // 🔹 Re-enable button after process
    }
  };

  return (
    <><AppNavbar/>
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
      }}
    >
      
      <Container style={{ maxWidth: "500px" }}>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-5">
            <h2 className="text-center mb-4 fw-bold text-danger">
              Reset Password
            </h2>

            {/* Show email if available */}
            {email && (
              <p className="text-center text-muted">
                OTP sent to <strong>{email}</strong>
              </p>
            )}

            <Form onSubmit={handleSubmit}>
              {/* OTP */}
              <Form.Group className="mb-3" controlId="formOtp">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  maxLength={6}
                />
              </Form.Group>

              {/* New Password */}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>New Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="new_password"
                    placeholder="Enter new password"
                    value={formData.new_password}
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeSlashFill /> : <EyeFill />}
                  </Button>
                </InputGroup>
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-4" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm_password"
                    placeholder="Confirm new password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button
                type="submit"
                className="w-100 py-2 fw-bold"
                variant="danger"
                disabled={loading} // ✅ Simple one-line disable

              >
                {loading ? "Processing..." : "Reset Password"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <ToastContainer position="top-center" autoClose={3000} />
      </Container>
    </div>
    </>
  );
};

export default ResetPassword;
