import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.username) return "Username is required";
    if (!formData.full_name) return "Full name is required";
    if (!formData.email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Invalid email format";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const errorMsg = validate();

  if (errorMsg) {
    toast.error(errorMsg);
  } else {
    try {
      // 👉 Send data to backend
      const response = await API.post("register/", formData);

      if (response.status === 201 || response.status === 200) {
        toast.success("Registration Successful 🎉");

        // ✅ Navigate to OTP Verify Page
        setTimeout(() => {
          navigate("/otp-verify", { state: { email: formData.email } });
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  }
};


  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      }}
    >
      <Container style={{ maxWidth: "500px" }}>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-5">
            <h2 className="text-center mb-4 fw-bold text-primary">Register</h2>
            <Form onSubmit={handleSubmit}>
              {/* Username */}
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Full Name */}
              <Form.Group className="mb-3" controlId="formFull_name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  placeholder="Enter full name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 py-2 fw-bold"
                variant="primary"
              >
                Register
              </Button>
            </Form>

            {/* 🔗 Login Link */}
            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link to="/login" className="fw-bold text-decoration-none text-primary">
                Login
              </Link>
            </p>
          </Card.Body>
        </Card>
        <ToastContainer position="top-center" autoClose={3000} />
      </Container>
    </div>
  );
};

export default Register;
