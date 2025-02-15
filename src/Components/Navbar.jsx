import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { useAuth } from "../Components/PrivateRoute"; 
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";

const NavbarComponent = ({ onSearch, onSort }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleSort = (order) => {
    onSort(order); 
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); 
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="px-5">
      <Navbar.Brand href="#">PRODUCT</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/add-product">Home</Nav.Link>
          <Nav.Link href="/products">View</Nav.Link>
          <NavDropdown title="Sorting" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={() => handleSort("asc")}>A-Z</NavDropdown.Item>
            <NavDropdown.Item onClick={() => handleSort("desc")}>Z-A</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleSort("default")}>Normal</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search"
          />
          <Button variant="outline-success">
            Search
          </Button>
        </Form>

        {currentUser ? (
          <Button variant="outline-primary" onClick={handleLogout} className="ms-3">
            LogOut
          </Button>
        ) : (
          <Nav.Link href="/login" className="ms-3">
            Login
          </Nav.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
