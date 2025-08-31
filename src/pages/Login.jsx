// src/pages/Login.js
import React, { useState } from "react";
import { Form, Button, Card, Container, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios"; // 👈 import axios instance

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("All fields are required");
      return;
    }
    // if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   toast.error("Invalid email address");
    //   return;
    // }
    // if (formData.password.length < 6) {
    //   toast.error("Password must be at least 6 characters");
    //   return;
    // }

    try {
      // 👉 Call backend login API
      const response = await API.post("/login/", formData);
      console.log("Payload sending:", formData);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");


      if (response.status === 200) {
        toast.success("Login Successful 🎉");
        console.log("Login Response:", response.data);

        // ✅ Save token if needed
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // ✅ Navigate to dashboard after success
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Login failed. Check credentials."
      );
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Container style={{ maxWidth: "450px" }}>
        <Card className="shadow-lg border-0 rounded-4">
          <Card.Body className="p-5">
            <h2 className="text-center mb-4 fw-bold text-primary">Login</h2>
            <Form onSubmit={handleSubmit}>
              {/* Email */}
              <Form.Group className="mb-3" controlId="formUsername">
  <Form.Label>Username or Email</Form.Label>
  <Form.Control
    type="text"                               // ✅ allow both
    name="username"                         // ✅ matches state key
    placeholder="Enter username or email"
    value={formData.username || ""}         // ✅ safe access
    onChange={handleChange}
  />
</Form.Group>


              {/* Password with toggle */}
              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
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

              <Button
                type="submit"
                className="w-100 py-2 fw-bold"
                variant="primary"
              >
                Login
              </Button>
            </Form>

            {/* Extra Links */}
            <div className="text-center mt-3">
              <Link to="/forgot-password" className="text-decoration-none me-3">
                Forgot Password?
              </Link>
              <br />
              <span className="text-muted">
                Don’t have an account?{" "}
                <Link to="/register" className="fw-bold text-decoration-none">
                  Register
                </Link>
              </span>
            </div>
          </Card.Body>
        </Card>
        <ToastContainer position="top-center" autoClose={3000} />
      </Container>
    </div>
  );
};

export default Login;
