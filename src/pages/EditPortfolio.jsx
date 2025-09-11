import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { getUserPortfolio, savePortfolio } from "../services/portfolioServices";
import AppNavbar from "../components/AppNavbar"


const EditPortfolio = () => {
  const [portfolio, setPortfolio] = useState({
    full_name: "",
    title: "",
    profile_image: "",
    short_bio: "",
    email: "",
    phone: "",
    about_me: "",
    social_links: {
      linkedin: "",
      github: "",
    },
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    show_email: true,
    show_contact_form: true,
    contact_message: "",
    layout: {
      theme: "Minimal White",
    },
  });

  const [saving, setSaving] = useState(false); // <-- new state
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await getUserPortfolio();
        setPortfolio(data);
      } catch (err) {
        console.log("No existing portfolio, creating new");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortfolio({ ...portfolio, [name]: value });
  };

  const handleNestedChange = (section, index, field, value) => {
    const updatedSection = [...portfolio[section]];
    updatedSection[index][field] = value;
    setPortfolio({ ...portfolio, [section]: updatedSection });
  };

  const handleAddItem = (section, emptyItem) => {
    setPortfolio({
      ...portfolio,
      [section]: [...portfolio[section], emptyItem],
    });
  };

  const handleRemoveItem = (section, index) => {
    const updatedSection = [...portfolio[section]];
    updatedSection.splice(index, 1);
    setPortfolio({ ...portfolio, [section]: updatedSection });
  };

  // ✅ handle only LinkedIn / GitHub changes
  const handleSocialChange = (platform, value) => {
    setPortfolio({
      ...portfolio,
      social_links: { ...portfolio.social_links, [platform]: value },
    });
  };

  const handleLayoutChange = (field, value) => {
    setPortfolio({
      ...portfolio,
      layout: { ...portfolio.layout, [field]: value },
    });
  };

  const handleSave = async () => {
    setSaving(true); // disable button
    console.log(savePortfolio);
    try {
      await savePortfolio(portfolio);
      toast.success("Portfolio saved successfully!");
      navigate("/dashboard"); // redirect after success
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to save portfolio. Try again!");
    } finally {
      setSaving(false); // re-enable button
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
  <><AppNavbar/>
    <div className="container my-4">
      
      <h2 className="mb-4 text-center">Edit Portfolio</h2>

      {/* Personal Info */}
      <div className="card mb-4">
        <div className="card-header">Personal Information</div>
        <div className="card-body row g-3">
          <div className="col-md-6">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={portfolio.full_name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              value={portfolio.title}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {/* <div className="col-md-6">
            <label className="form-label">Profile Image URL</label>
            <input
              type="text"
              name="profile_image"
              value={portfolio.profile_image}
              onChange={handleChange}
              className="form-control"
            />
          </div> */}
          <div className="col-md-6">
            <label className="form-label">Short Bio</label>
            <input
              type="text"
              name="short_bio"
              value={portfolio.short_bio}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={portfolio.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              value={portfolio.phone}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-12">
            <label className="form-label">About Me</label>
            <textarea
              name="about_me"
              value={portfolio.about_me}
              onChange={handleChange}
              className="form-control"
              rows="3"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="card mb-3">
        <div className="card-header">Social Links</div>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">LinkedIn</label>
            <input
              type="text"
              className="form-control"
              value={portfolio.social_links.linkedin || ""}
              onChange={(e) => handleSocialChange("linkedin", e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">GitHub</label>
            <input
              type="text"
              className="form-control"
              value={portfolio.social_links.github || ""}
              onChange={(e) => handleSocialChange("github", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <span>Education</span>
          <button
            className="btn btn-sm btn-success"
            onClick={() =>
              handleAddItem("education", {
                degree: "",
                institution: "",
                start_year: "",
                end_year: "",
                description: "",
              })
            }
          >
            + Add
          </button>
        </div>
        <div className="card-body">
          {portfolio.education.map((edu, idx) => (
            <div key={idx} className="border p-3 mb-3 rounded">
              <div className="row g-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      handleNestedChange(
                        "education",
                        idx,
                        "degree",
                        e.target.value
                      )
                    }
                    placeholder="Degree"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      handleNestedChange(
                        "education",
                        idx,
                        "institution",
                        e.target.value
                      )
                    }
                    placeholder="Institution"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    value={edu.start_year}
                    onChange={(e) =>
                      handleNestedChange(
                        "education",
                        idx,
                        "start_year",
                        e.target.value
                      )
                    }
                    placeholder="Start Year"
                    className="form-control"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    value={edu.end_year}
                    onChange={(e) =>
                      handleNestedChange(
                        "education",
                        idx,
                        "end_year",
                        e.target.value
                      )
                    }
                    placeholder="End Year"
                    className="form-control"
                  />
                </div>
                <div className="col-12">
                  <textarea
                    value={edu.description}
                    onChange={(e) =>
                      handleNestedChange(
                        "education",
                        idx,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Description"
                    className="form-control"
                  />
                </div>
                <div className="col-12 text-end mt-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveItem("education", idx)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <span>Skills</span>
          <button
            className="btn btn-sm btn-success"
            onClick={() => handleAddItem("skills", { skill: "", level: "" })}
          >
            + Add
          </button>
        </div>
        <div className="card-body">
          {portfolio.skills.map((s, idx) => (
            <div key={idx} className="row g-2 mb-2 align-items-center">
              <div className="col-md-5">
                <input
                  type="text"
                  value={s.skill}
                  onChange={(e) =>
                    handleNestedChange("skills", idx, "skill", e.target.value)
                  }
                  placeholder="Skill"
                  className="form-control"
                />
              </div>
              <div className="col-md-5">
                <input
                  type="text"
                  value={s.level}
                  onChange={(e) =>
                    handleNestedChange("skills", idx, "level", e.target.value)
                  }
                  placeholder="Level (Beginner, Intermediate, Advanced)"
                  className="form-control"
                />
              </div>
              <div className="col-md-2 text-end">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveItem("skills", idx)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <span>Projects</span>
          <button
            className="btn btn-sm btn-success"
            onClick={() =>
              handleAddItem("projects", {
                title: "",
                description: "",
                tech_stack: "",
                live_link: "",
                repo_link: "",
              })
            }
          >
            + Add
          </button>
        </div>
        <div className="card-body">
          {portfolio.projects.map((p, idx) => (
            <div key={idx} className="border p-3 mb-3 rounded">
              <input
                type="text"
                value={p.title}
                onChange={(e) =>
                  handleNestedChange("projects", idx, "title", e.target.value)
                }
                placeholder="Project Title"
                className="form-control mb-2"
              />
              <textarea
                value={p.description}
                onChange={(e) =>
                  handleNestedChange(
                    "projects",
                    idx,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Project Description"
                className="form-control mb-2"
              />
              <input
                type="text"
                value={p.tech_stack}
                onChange={(e) =>
                  handleNestedChange(
                    "projects",
                    idx,
                    "tech_stack",
                    e.target.value
                  )
                }
                placeholder="Tech Stack"
                className="form-control mb-2"
              />
              <input
                type="text"
                value={p.live_link}
                onChange={(e) =>
                  handleNestedChange(
                    "projects",
                    idx,
                    "live_link",
                    e.target.value
                  )
                }
                placeholder="Live Link"
                className="form-control mb-2"
              />
              <input
                type="text"
                value={p.repo_link}
                onChange={(e) =>
                  handleNestedChange(
                    "projects",
                    idx,
                    "repo_link",
                    e.target.value
                  )
                }
                placeholder="Repo Link"
                className="form-control mb-2"
              />
              <div className="text-end">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveItem("projects", idx)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between">
          <span>Certifications</span>
          <button
            className="btn btn-sm btn-success"
            onClick={() =>
              handleAddItem("certifications", {
                title: "",
                issuer: "",
                date: "",
                description: "",
              })
            }
          >
            + Add
          </button>
        </div>
        <div className="card-body">
          {portfolio.certifications.map((c, idx) => (
            <div key={idx} className="border p-3 mb-3 rounded">
              <input
                type="text"
                value={c.title}
                onChange={(e) =>
                  handleNestedChange(
                    "certifications",
                    idx,
                    "title",
                    e.target.value
                  )
                }
                placeholder="Title"
                className="form-control mb-2"
              />
              <input
                type="text"
                value={c.issuer}
                onChange={(e) =>
                  handleNestedChange(
                    "certifications",
                    idx,
                    "issuer",
                    e.target.value
                  )
                }
                placeholder="Issuer"
                className="form-control mb-2"
              />
              <input
                type="month"
                value={c.date}
                onChange={(e) =>
                  handleNestedChange(
                    "certifications",
                    idx,
                    "date",
                    e.target.value
                  )
                }
                className="form-control mb-2"
              />
              <textarea
                value={c.description}
                onChange={(e) =>
                  handleNestedChange(
                    "certifications",
                    idx,
                    "description",
                    e.target.value
                  )
                }
                placeholder="Description"
                className="form-control mb-2"
              />
              <div className="text-end">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleRemoveItem("certifications", idx)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout Options */}
      <div className="card mb-4">
  <div className="card-header">Layout & Preferences</div>
  <div className="card-body row g-3">
    
    {/* Theme */}
    <div className="col-md-4">
      <label className="form-label">Theme</label>
      <select
        className="form-select"
        value={portfolio.layout.theme}
        onChange={(e) => handleLayoutChange("theme", e.target.value)}
      >
        <option value="minimal-white">Minimal White</option>
        <option value="premium-dark">Premium Dark</option>
        <option value="vibrant-gradient">Vibrant Gradient</option>
        <option value="sleek-black-gold">Sleek Black & Gold</option>
        <option value="ocean-breeze">Ocean Breeze</option>
        <option value="cyberpunk">Cyberpunk</option>
        <option value="earthy-nature">Earthy Nature</option>
        <option value="bold-red-black">Bold Red & Black</option>
        <option value="pastel-soft">Pastel Soft</option>
        <option value="monochrome-classic">Monochrome Classic</option>
      </select>
    </div>

  </div>
</div>


      {/* Save Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={`btn ${saving ? "btn-secondary" : "btn-primary"} px-4 py-2`}
        >
          {saving ? "Saving..." : "Save My Portfolio"}
        </button>
      </div>
    </div>
    </>
  );
};

export default EditPortfolio;
