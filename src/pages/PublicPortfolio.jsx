import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Card, Button } from 'react-bootstrap';
import { getPublicPortfolio } from '../services/portfolioServices';
import '../styles/portfolio.css';

export default function PublicPortfolio({ username }) {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    if (username) {
      getPublicPortfolio(username)
        .then((res) => setPortfolio(res.data))
        .catch((err) => console.error(err));
    }
  }, [username]);

  if (!portfolio) return <div className="loading">Loading...</div>;

  const { layout } = portfolio;
  const bgImage = `/backgroundimg/${layout.theme}.png`;

  return (
    <div
      className="portfolio-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Navbar */}
      <Navbar expand="lg" fixed="top" className="glass-nav">
        <Container>
          <Navbar.Brand
            href="#home"
            style={{ fontFamily: layout.headfont, color: layout.headcolor }}
          >
            {portfolio.full_name}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#education">Education</Nav.Link>
              <Nav.Link href="#skills">Skills</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#certifications">Certifications</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Home Section */}
      <section id="home" className="section home-section">
        <Container>
          <div className="text-center">
            <img
              src={portfolio.profile_image}
              alt="Profile"
              className="profile-img"
            />
            <h1 style={{ fontFamily: layout.headfont, color: layout.headcolor }}>
              {portfolio.full_name}
            </h1>
            <h4 style={{ fontFamily: layout.parafont, color: layout.paracolor }}>
              {portfolio.title}
            </h4>
            <p style={{ fontFamily: layout.parafont, color: layout.paracolor }}>
              {portfolio.short_bio}
            </p>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <Container>
          <Card className="shadow-sm p-4">
            <h2
              className="section-heading"
              style={{ fontFamily: layout.headfont, color: layout.headcolor }}
            >
              About Me
            </h2>
            <p style={{ fontFamily: layout.parafont, color: layout.paracolor }}>
              {portfolio.about_me}
            </p>
          </Card>
        </Container>
      </section>

      {/* Education Section */}
      <section id="education" className="section">
        <Container>
          <h2
            className="section-heading"
            style={{ fontFamily: layout.headfont, color: layout.headcolor }}
          >
            Education
          </h2>
          <Row>
            {portfolio.education.map((edu, index) => (
              <Col md={6} xs={12} key={index} className="mb-3">
                <Card className="shadow-sm p-3">
                  <h5 style={{ fontFamily: layout.headfont, color: layout.headcolor }}>
                    {edu.degree}
                  </h5>
                  <p style={{ fontFamily: layout.parafont, color: layout.paracolor }}>
                    {edu.institution} ({edu.start_year} - {edu.end_year})
                  </p>
                  <p style={{ fontFamily: layout.parafont, color: layout.paracolor }}>
                    {edu.description}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <Container>
          <h2
            className="section-heading"
            style={{ fontFamily: layout.headfont, color: layout.headcolor }}
          >
            Skills
          </h2>
          <Row>
            {portfolio.skills.map((skill, index) => (
              <Col md={6} xs={12} key={index} className="mb-3">
                <Card className="shadow-sm p-3">
                  <h6 style={{ fontFamily: layout.headfont, color: layout.headcolor }}>
                    {skill.skill}
                  </h6>
                  <p style={{ fontFamily: layout.parafont, color: layout.paracolor }}>
                    {skill.level}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <Container>
          <h2
            className="section-heading"
            style={{ fontFamily: layout.headfont, color: layout.headcolor }}
          >
            Projects
          </h2>
          <Row>
            {portfolio.projects.map((project, index) => (
              <Col md={6} xs={12} key={index} className="mb-3">
                <Card className="shadow-sm p-3">
                  <h5 style={{ fontFamily: layout.headfont, color: layout.headcolor }}>
                    {project.title}
                  </h5>
                  <p style={{ fontFamily: layout.parafont, color: layout.paracolor }}>
                    {project.description}
                  </p>
                  <p>
                    <strong>Tech Stack:</strong> {project.tech_stack}
                  </p>
                  <div className="d-flex gap-2">
                    {project.live_link && (
                      <Button
                        variant="outline-primary"
                        href={project.live_link}
                        target="_blank"
                      >
                        Live
                      </Button>
                    )}
                    {project.repo_link && (
                      <Button
                        variant="outline-secondary"
                        href={project.repo_link}
                        target="_blank"
                      >
                        Code
                      </Button>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section">
        <Container>
          <h2
            className="section-heading"
            style={{ fontFamily: layout.headfont, color: layout.headcolor }}
          >
            Certifications
          </h2>
          <Row>
            {portfolio.certifications.map((cert, index) => (
              <Col md={6} xs={12} key={index} className="mb-3">
                <Card className="shadow-sm p-3">
                  <h5 style={{ fontFamily: layout.headfont, color: layout.headcolor }}>
                    {cert.title}
                  </h5>
                  <p style={{ fontFamily: layout.parafont, color: layout.paracolor }}>
                    {cert.issuer} - {cert.date}
                  </p>
                  <p style={{ fontFamily: layout.parafont, color: layout.paracolor }}>
                    {cert.description}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <Container>
          <Card className="shadow-sm p-4">
            <h2
              className="section-heading"
              style={{ fontFamily: layout.headfont, color: layout.headcolor }}
            >
              Contact
            </h2>
            {portfolio.show_email && (
              <p style={{ fontFamily: layout.parafont, color: layout.paracolor }}>
                Email: {portfolio.email}
              </p>
            )}
            <p style={{ fontFamily: layout.parafont, color: layout.paracolor }}>
              Phone: {portfolio.phone}
            </p>
            {portfolio.show_contact_form && (
              <p style={{ fontFamily: layout.parafont, color: layout.paracolor }}>
                {portfolio.contact_message}
              </p>
            )}
          </Card>
        </Container>
      </section>

      {/* Footer */}
      <footer className="footer">
        <Container className="text-center">
          <p style={{ color: '#fff' }}>
            &copy; {new Date().getFullYear()} {portfolio.full_name} | Built with
            Portli
          </p>
          <div className="social-links">
            {portfolio.social_links.linkedin && (
              <a href={portfolio.social_links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
            {portfolio.social_links.github && (
              <a href={portfolio.social_links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
          </div>
        </Container>
      </footer>
    </div>
  );
}
