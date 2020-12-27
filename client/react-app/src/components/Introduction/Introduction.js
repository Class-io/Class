import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Introduction.css";
import Questionaire from "../../modules/Questionaire/Questionaire.js";
import JavaScript from "../Courses/JavaScript/JavaScript.js";
import Login from  "../../modules/Login/Login.js";

export default function Introduction() {
  return (
    <div className="Header">
      <Navbar collapseOnSelect expand="lg" bg="" variant="dark">
        <Navbar.Brand href="#home">Class {}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something.</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link eventKey={2} href="#signup">
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid className="Overlay">
        <Container fluid className="HeaderContent">
          <h1 class="display-1 text-white">Welcome to Class</h1>
          <h2>Share your skills, or learn from the best</h2>
          <Questionaire/>
        </Container>
        <JavaScript />   
        <Login />
      </Container>
    </div>
  );
}
