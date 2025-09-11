// src/pages/OtpVerify.js
import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import API from "../api/axios";  // 👈 import axios instance
import AppNavbar from "../components/AppNavbar";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  // 📩 Get email passed from Register page
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      toast.error("Invalid OTP. Enter 6 digits.");
      return;
    }

    try {
      setLoading(true); // 🔹 Disable button when submitting
      // 👉 Call backend API to verify OTP
      const response = await API.post("/verify-otp/", {
        email,
        otp,
      });

      if (response.status === 200) {
        toast.success("OTP Verified ✅");
        console.log("OTP Verified for Email:", email);

        // ✅ Navigate to login after success
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || err.response?.data?.message || "OTP verification failed");
    }finally {
      setLoading(false); // 🔹 Re-enable button after process
    }
  };

  return (
    <><AppNavbar/>
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      }}
    >
      <Container style={{ maxWidth: "400px" }}>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-5">
            <h2 className="text-center mb-4 fw-bold text-primary">
              OTP Verification
            </h2>

            {/* Show email if available */}
            {email && (
              <p className="text-center text-muted">
                OTP sent to <strong>{email}</strong>
              </p>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formOtp">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 py-2 fw-bold"
                variant="success"
                disabled={loading} // ✅ Simple one-line disable
              >
                {loading ? "Processing..." : "Verify OTP"}
              </Button>
            </Form>

            {/* 🔗 Back to Register link */}
            <p className="text-center mt-3">
              Didn’t get OTP?{" "}
              <Link
                to="/register"
                className="fw-bold text-decoration-none text-danger"
              >
                Register Again
              </Link>
            </p>
          </Card.Body>
        </Card>
        <ToastContainer position="top-center" autoClose={3000} />
      </Container>
    </div>
    </>
  );
};

export default OtpVerify;
