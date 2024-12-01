import React from "react";
import Nav from "react-bootstrap/Nav";
import { FaPlus } from "react-icons/fa";
import { StyledNavbar } from "../styles";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

function Navbars({ onAddNewPlan }) {
  const Navigate = useNavigate();
  return (
    <StyledNavbar expand="lg" className="">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex align-items-center">
            <div className="me-3">
              <Button
                className="justify-content-end"
                size="sm"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  backgroundColor: "transparent",
                  color: "#ffffff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#ffffff";
                  e.target.style.color = "#000000";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#ffffff";
                }}
                onClick={() => Navigate("/")}
              >
                Route Plan App
              </Button>
            </div>

            <div>
              <Button
                variant="light"
                size="sm"
                style={{ display: "flex", alignItems: "center" }}
                onClick={onAddNewPlan}
              >
                <FaPlus style={{ color: "black", marginRight: "5px" }} /> Add
                New Plan
              </Button>
            </div>

            <div className="d-flex gap-3">
              <Nav.Link href="/history">History</Nav.Link>
              <Nav.Link href="/profile">Settings</Nav.Link>
              <Nav.Link href="/help">Help</Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  );
}

export default Navbars;
