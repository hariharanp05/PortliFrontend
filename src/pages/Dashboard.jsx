import React, { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getUserPortfolio,
  deletePortfolio,
} from "../services/portfolioServices";

const Dashboard = () => {
  const [username, setUsername] = useState("User");
  const [portfolio, setPortfolio] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUsername(storedUser.username || "User");

    // fetch portfolio of logged-in user
    getUserPortfolio()
      .then((res) => setPortfolio(res.data || null))
      .catch(() => setPortfolio(null));
  }, []);

  // ✅ Fix: Use _id correctly (MongoDB returns either _id: "123" or _id: { $oid: "123" })
  const getPortfolioId = () => {
    if (!portfolio) return null;
    return portfolio._id?.$oid || portfolio._id;
  };

  const handleDelete = () => {
    const portfolioId = getPortfolioId();
    if (!portfolioId) return;

    if (window.confirm("Are you sure you want to delete your portfolio?")) {
      deletePortfolio(portfolioId)
        .then(() => setPortfolio(null))
        .catch((err) => console.error("Error deleting portfolio:", err));
    }
  };

  return (
    <>
      <Container className="dashboard-page text-center">
        <h2 className="welcome-text mt-4">Welcome, {username} 👋</h2>

        <Card className="portfolio-card shadow-lg p-4 mt-4 mx-auto">
          {!portfolio ? (
            <>
              <h4>You have not created a portfolio yet.</h4>
              <Button
                variant="success"
                size="lg"
                className="mt-3"
                onClick={() => navigate("/create-portfolio/")}
              >
                Create Your Portfolio 🚀
              </Button>
            </>
          ) : (
            <>
              <h4 className="mb-3">{portfolio.title}</h4>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                {/* ✅ Public view */}
                <Button
                  variant="primary"
                  onClick={() =>
                    window.open(`/public/${portfolio.username}`, "_blank")
                  }
                >
                  View
                </Button>

                {/* ✅ Navigate to edit page with correct portfolioId */}
                <Button
                  variant="warning"
                  onClick={() => navigate(`/edit-portfolio/`)}
                >
                  Edit
                </Button>

                {/* ✅ Delete with correct portfolioId */}
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </>
          )}
        </Card>
      </Container>
    </>
  );
};

export default Dashboard;
