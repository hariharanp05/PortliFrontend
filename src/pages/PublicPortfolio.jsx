import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Nav, Card, Button } from 'react-bootstrap';
import { getPublicPortfolio } from '../services/portfolioServices';
// import '../styles/portfolio.css';

export default function PublicPortfolio({ username }) {
  const [portfolio, setPortfolio] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('minimal-white'); // default theme

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
      <Navbar expand="lg" fixed="top" className="glass-nav animate-fade-down">
        <Container>
          <Navbar.Brand href="#home">
            {portfolio.full_name}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              {portfolio.about_me && <Nav.Link href="#about">About</Nav.Link>}
              {hasData(portfolio.education) && <Nav.Link href="#education">Education</Nav.Link>}
              {hasData(portfolio.skills) && <Nav.Link href="#skills">Skills</Nav.Link>}
              {hasData(portfolio.projects) && <Nav.Link href="#projects">Projects</Nav.Link>}
              {hasData(portfolio.certifications) && <Nav.Link href="#certifications">Certifications</Nav.Link>}
              {(portfolio.show_email || portfolio.phone || portfolio.show_contact_form) && (
                <Nav.Link href="#contact">Contact</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Home Section */}
      <section id="home" className="section home-section animate-fade-up">
        <Container className="text-center">
          <h1>{portfolio.full_name}</h1>
          {portfolio.title && <h4>{portfolio.title}</h4>}
          {portfolio.short_bio && <p>{portfolio.short_bio}</p>}
        </Container>
      </section>

      {/* About Section */}
      {portfolio.about_me && (
        <section id="about" className="section alt-bg animate-slide-left">
          <Container>
            <Card className="shadow-sm p-4">
              <h2 className="section-heading">About Me</h2>
              <p>{portfolio.about_me}</p>
            </Card>
          </Container>
        </section>
      )}

      {/* Education Section */}
      {hasData(portfolio.education) && (
        <section id="education" className="section animate-fade-up">
          <Container>
            <h2 className="section-heading">Education</h2>
            <Row>
              {portfolio.education.map((edu, index) => (
                <Col md={6} xs={12} key={index} className="mb-3">
                  <Card className="shadow-sm p-3 hover-lift">
                    <h5>{edu.degree}</h5>
                    <p>{edu.institution} ({edu.start_year} - {edu.end_year})</p>
                    {edu.description && <p>{edu.description}</p>}
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Skills Section */}
      {hasData(portfolio.skills) && (
        <section id="skills" className="section alt-bg animate-slide-right">
          <Container>
            <h2 className="section-heading">Skills</h2>
            <Row>
              {portfolio.skills.map((skill, index) => (
                <Col md={6} xs={12} key={index} className="mb-3">
                  <Card className="shadow-sm p-3 hover-lift">
                    <h6>{skill.skill}</h6>
                    {skill.level && <p>{skill.level}</p>}
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Projects Section */}
      {hasData(portfolio.projects) && (
        <section id="projects" className="section animate-fade-up">
          <Container>
            <h2 className="section-heading">Projects</h2>
            <Row>
              {portfolio.projects.map((project, index) => (
                <Col md={6} xs={12} key={index} className="mb-3">
                  <Card className="shadow-sm p-3 hover-lift">
                    <h5>{project.title}</h5>
                    {project.description && <p>{project.description}</p>}
                    {project.tech_stack && <p><strong>Tech Stack:</strong> {project.tech_stack}</p>}
                    <div className="d-flex gap-2">
                      {project.live_link && (
                        <Button variant="outline-primary" href={project.live_link} target="_blank">
                          Live
                        </Button>
                      )}
                      {project.repo_link && (
                        <Button variant="outline-secondary" href={project.repo_link} target="_blank">
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
      )}

      {/* Certifications Section */}
      {hasData(portfolio.certifications) && (
        <section id="certifications" className="section alt-bg animate-slide-left">
          <Container>
            <h2 className="section-heading">Certifications</h2>
            <Row>
              {portfolio.certifications.map((cert, index) => (
                <Col md={6} xs={12} key={index} className="mb-3">
                  <Card className="shadow-sm p-3 hover-lift">
                    <h5>{cert.title}</h5>
                    <p>{cert.issuer} - {cert.date}</p>
                    {cert.description && <p>{cert.description}</p>}
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* Contact Section */}
      {(portfolio.show_email || portfolio.phone || portfolio.show_contact_form) && (
        <section id="contact" className="section animate-fade-up">
          <Container>
            <Card className="shadow-sm p-4">
              <h2 className="section-heading">Contact</h2>
              {portfolio.show_email && <p>Email: {portfolio.email}</p>}
              {portfolio.phone && <p>Phone: {portfolio.phone}</p>}
              {portfolio.show_contact_form && portfolio.contact_message && (
                <p>{portfolio.contact_message}</p>
              )}
            </Card>
          </Container>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <Container className="text-center">
          <p>
            &copy; {new Date().getFullYear()} {portfolio.full_name} | Built with Portli
          </p>
          <div className="social-links">
            {portfolio.social_links?.linkedin && (
              <a href={portfolio.social_links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
            {portfolio.social_links?.github && (
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
