// src/pages/ForgotPassword.js
import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; // 👈 import axios instance
import AppNavbar from "../components/AppNavbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    try {
      setLoading(true); // 🔹 Disable button when submitting
      // ✅ Call backend forgot password API
      const response = await API.post("/forgot-password/", { email });

      if (response.status === 200) {
        toast.success("Password reset OTP sent ✅");
        console.log("Forgot Password Response:", response.data);

        // Navigate to Reset Password page after success
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      toast.error(
       err.response?.data?.error || err.response?.data?.message || "Email not registered. Try again."
      );
      setTimeout(() => navigate("/login"), 1500); // navigate back to login if error
    }finally {
      setLoading(false); // 🔹 Re-enable button after process
    }
  };

  return (
    <><AppNavbar/>
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
      }}
    >
      <Container style={{ maxWidth: "450px" }}>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-5">
            <h2 className="text-center mb-4 fw-bold text-warning">
              Forgot Password
            </h2>
            <Form onSubmit={handleSubmit}>
              {/* Email */}
              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 py-2 fw-bold"
                variant="warning"
                disabled={loading} // ✅ Simple one-line disable
              >
                {loading ? "Processing..." : "Sent Reset OTP"}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <a href="/login" className="text-decoration-none">
                Back to Login
              </a>
            </div>
          </Card.Body>
        </Card>
        <ToastContainer position="top-center" autoClose={3000} />
      </Container>
    </div>
    </>
  );
};

export default ForgotPassword;
