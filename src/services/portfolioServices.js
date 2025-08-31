
import API from "../api/axios";

// Get logged-in user's portfolio
export const getUserPortfolio = () => API.get("portfolio/user/");

// Save portfolio (create or update)
export const savePortfolio = (portfolio) => API.post("portfolio/save/", portfolio);

// Delete portfolio
export const deletePortfolio = (userId) => API.delete(`portfolio/${userId}/delete/`);

// Public portfolio by username
export const getPublicPortfolio = (username) =>
  API.get(`/api/portfolio/public/${username}/`);
