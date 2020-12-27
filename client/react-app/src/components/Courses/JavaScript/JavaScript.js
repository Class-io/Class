import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import "bootstrap/dist/css/bootstrap.min.css";
import "./JavaScript.css";
import "./JavaScript.scss";
import paolo  from '../../../assets/images/tutors/paolo_moretti.jpg';
import nisha  from '../../../assets/images/tutors/nisha_varma.jpg';
import patrick  from '../../../assets/images/tutors/patrick_taylor.jpg';
import chris  from '../../../assets/images/tutors/chris_zhou.jpg';

export default function JavaScript() {
  return (
    <div>
      <div className="tutor_cards">
        <Card className="tutor_card">
          <Card.Img
            className="tutor_image"
            variant="top"
            src={paolo}
          />
          <Card.Body>
            <Card.Title>Paolo Moretti</Card.Title>
            <Card.Text>
              mauris ultrices eros in cursus turpis massa tincidunt
              <br />
              dui ut ornare lectus sit amet est placerat
              <br />
              in egestas erat imperdiet sed euismod nisi porta
              <br />
              lorem mollis aliquam ut porttitor leo
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="tutor_card">
          <Card.Img
            className="tutor_image"
            variant="top"
            src={nisha}
          />
          <Card.Body>
            <Card.Title>Nisha Varma</Card.Title>
            <Card.Text>
              mauris ultrices eros in cursus turpis massa tincidunt
              <br />
              dui ut ornare lectus sit amet est placerat
              <br />
              in egestas erat imperdiet sed euismod nisi porta
              <br />
              lorem mollis aliquam ut porttitor leo
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="tutor_card">
          <Card.Img
            className="tutor_image"
            variant="top"
            src={patrick}
          />
          <Card.Body>
            <Card.Title>Patrick Taylor</Card.Title>
            <Card.Text>
              mauris ultrices eros in cursus turpis massa tincidunt
              <br />
              dui ut ornare lectus sit amet est placerat
              <br />
              in egestas erat imperdiet sed euismod nisi porta
              <br />
              lorem mollis aliquam ut porttitor leo
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="tutor_card">
          <Card.Img
            className="tutor_image"
            variant="top"
            src={chris}
          />
          <Card.Body>
            <Card.Title>Chris Zhou</Card.Title>
            <Card.Text>
              mauris ultrices eros in cursus turpis massa tincidunt
              <br />
              dui ut ornare lectus sit amet est placerat
              <br />
              in egestas erat imperdiet sed euismod nisi porta
              <br />
              lorem mollis aliquam ut porttitor leo
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}