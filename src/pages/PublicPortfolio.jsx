import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Card,
  Button,
} from "react-bootstrap";
import { getPublicPortfolio } from "../services/portfolioServices";

// Icons
import { FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";
import { Github, Linkedin, Envelope } from "react-bootstrap-icons";

export default function PublicPortfolio({ username }) {
  const [portfolio, setPortfolio] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("minimal-white"); // default theme

  useEffect(() => {
    if (username) {
      getPublicPortfolio(username)
        .then((res) => {
          setPortfolio(res.data);
          if (res.data?.layout?.theme) {
            setSelectedTheme(res.data.layout.theme); // set theme from API
          }
        })
        .catch((err) => console.error(err));
    }
  }, [username]);

  // Dynamically import the theme CSS
  useEffect(() => {
    if (selectedTheme) {
      import(`../styles/themes/${selectedTheme}.css`)
        .then(() => {
          // Theme loaded successfully
        })
        .catch((err) => {
          console.error(`Error loading theme: ${selectedTheme}`, err);
        });
    }
  }, [selectedTheme]);

  if (!portfolio) return <div className="loading">Loading...</div>;

  const { layout } = portfolio;

  // Helper: check if array has valid data
  const hasData = (data) => Array.isArray(data) && data.length > 0;

  return (
    <div className={`portfolio-wrapper template-${selectedTheme}`}>
      {/* Navbar */}
      <Navbar expand="lg" fixed="top" className="portfolio-navbar glass-nav animate-fade-down">
        <Container>
          <Navbar.Brand href="#home" className="portfolio-navbar__brand">
            {portfolio.full_name}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="portfolio-navbar__toggle" />
          <Navbar.Collapse id="basic-navbar-nav" className="portfolio-navbar__collapse">
            <Nav className="ms-auto portfolio-navbar__links">
              <Nav.Link href="#home" className="portfolio-navbar__link">Home</Nav.Link>
              {portfolio.about_me && <Nav.Link href="#about" className="portfolio-navbar__link">About</Nav.Link>}
              {hasData(portfolio.projects) && (
                <Nav.Link href="#projects" className="portfolio-navbar__link">Projects</Nav.Link>
              )}
              {hasData(portfolio.experience) && (
                <Nav.Link href="#experience" className="portfolio-navbar__link">Experience</Nav.Link>
              )}
              {(portfolio.show_email || portfolio.phone || portfolio.show_contact_form) && (
                <Nav.Link href="#contact" className="portfolio-navbar__link">Contact</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* === Home Section === */}
      <section id="home" className="section home-section animate-fade-up">
        <div className="section-content">
          <h1 className="home__heading">{portfolio.full_name}</h1>
          {portfolio.title && <h4 className="home__title">{portfolio.title}</h4>}
          {portfolio.short_bio && <p className="home__bio">{portfolio.short_bio}</p>}

          {/* Social Media Links */}
          <div className="home__socials">
            {portfolio.social_links?.github && (
              <a
                href={portfolio.social_links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="home__socials-icon"
              >
                <FaGithub />
              </a>
            )}
            {portfolio.email && (
              <a href={`mailto:${portfolio.email}`} className="home__socials-icon">
                <FaEnvelope />
              </a>
            )}
            {portfolio.social_links?.linkedin && (
              <a
                href={portfolio.social_links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="home__socials-icon"
              >
                <FaLinkedin />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* === About Section (About + Education + Skills + Certifications) === */}
      {(portfolio.about_me || hasData(portfolio.education) || hasData(portfolio.skills) || hasData(portfolio.certifications)) && (
        <section id="about" className="section about-section animate-slide-up">
          <div className="section-content">
            <h2 className="about__heading">About Me</h2>

            {/* About Paragraph */}
            {portfolio.about_me && <p className="about__para">{portfolio.about_me}</p>}

            <Row>
              {/* Education */}
              {hasData(portfolio.education) && (
                <Col md={6} xs={12} className="about__education mb-4">
                  <h3 className="about__subheading">Education</h3>
                  {portfolio.education.map((edu, index) => (
                    <div key={index} className="about__education-item">
                      <h5 className="about__education-degree">{edu.degree}</h5>
                      <p className="about__education-college">{edu.institution}</p>
                      <p className="about__education-timeline">
                        {edu.start_year} - {edu.end_year}
                      </p>
                      {edu.description && <p className="about__education-desc">{edu.description}</p>}
                    </div>
                  ))}
                </Col>
              )}

              {/* Skills */}
              {hasData(portfolio.skills) && (
                <Col md={6} xs={12} className="about__skills mb-4">
                  <h3 className="about__subheading">Skills</h3>
                  <div className="about__skills-list">
                    {portfolio.skills.map((skill, index) => (
                      <div key={index} className="about__skill-item">
                        <h6 className="about__skill-name">{skill.skill}</h6>
                        {skill.level && <p className="about__skill-level">{skill.level}</p>}
                      </div>
                    ))}
                  </div>
                </Col>
              )}
            </Row>

            {/* Certifications */}
            {hasData(portfolio.certifications) && (
              <div className="about__certifications">
                <h3 className="about__subheading">Certifications</h3>
                <Row>
                  {portfolio.certifications.map((cert, index) => (
                    <Col md={6} xs={12} key={index} className="about__certification-item mb-3">
                      <h5 className="about__certification-title">{cert.title}</h5>
                      <p className="about__certification-issuer">
                        {cert.issuer} - {cert.date}
                      </p>
                      {cert.description && (
                        <p className="about__certification-desc">{cert.description}</p>
                      )}
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </div>
        </section>
      )}

      {/* === Projects Section === */}
      {hasData(portfolio.projects) && (
        <section id="projects" className="section project-section animate-fade-up">
          <div className="section-content">
            <h2 className="project__heading">Projects</h2>
            <Row>
              {portfolio.projects.map((project, index) => (
                <Col md={6} xs={12} key={index} className="project__item mb-3">
                  <h5 className="project__title">{project.title}</h5>
                  {project.description && <p className="project__desc">{project.description}</p>}
                  {project.tech_stack && <p className="project__stack">Tech Stack: {project.tech_stack}</p>}
                  <div className="d-flex gap-2 project__buttons">
                    {project.live_link && (
                      <Button
                        variant="outline-primary"
                        href={project.live_link}
                        target="_blank"
                        className="project__btn"
                      >
                        Live
                      </Button>
                    )}
                    {project.repo_link && (
                      <Button
                        variant="outline-secondary"
                        href={project.repo_link}
                        target="_blank"
                        className="project__btn"
                      >
                        Code
                      </Button>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </section>
      )}

      {/* === Experiences Section === */}
      {hasData(portfolio.experience) && (
        <section id="experience" className="section exp-section animate-fade-up">
          <div className="section-content">
            <h2 className="experience__heading">Experience</h2>
            <Row>
              {portfolio.experience.map((exp, index) => (
                <Col md={6} xs={12} key={index} className="experience__item mb-3">
                  <h5 className="experience__title">{exp.title}</h5>
                  <p className="experience__company">{exp.company}</p>
                  <p className="experience__desc">{exp.description}</p>
                  <p className="experience__timeline">
                    {exp.start_date} - {exp.end_date}
                  </p>
                </Col>
              ))}
            </Row>
          </div>
        </section>
      )}

      {/* === Contact Section === */}
      {(portfolio.show_email || portfolio.phone || portfolio.show_contact_form) && (
        <section id="contact" className="section contact-section animate-fade-up">
          <div className="section-content">
            <h2 className="contact__heading">Contact</h2>
            {portfolio.show_email && <p className="contact__email">Email: {portfolio.email}</p>}
            {portfolio.phone && <p className="contact__phone">Phone: {portfolio.phone}</p>}
            {portfolio.show_contact_form && portfolio.contact_message && (
              <p className="contact__message">{portfolio.contact_message}</p>
            )}
          </div>
        </section>
      )}

      {/* === Footer === */}
      <footer className="portfolio-footer">
        <Container className="portfolio-footer__container">
          <p className="portfolio-footer__text">
            &copy; {new Date().getFullYear()} {portfolio.full_name} | Built with Portli
          </p>
          <div className="portfolio-footer__socials">
            {portfolio.social_links?.linkedin && (
              <a
                href={portfolio.social_links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="portfolio-footer__link"
              >
                <Linkedin />
              </a>
            )}
            {portfolio.social_links?.github && (
              <a
                href={portfolio.social_links.github}
                target="_blank"
                rel="noreferrer"
                className="portfolio-footer__link"
              >
                <Github />
              </a>
            )}
          </div>
        </Container>
      </footer>
    </div>
  );
}
