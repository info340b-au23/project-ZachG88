import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export function NavBar() {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Navbar expand="sm">
            <Navbar.Brand as={Link} to="/">
                <img
                    src="img/icoffee_logo.jpeg"
                    height="80"
                    alt="iCoffee Logo"
                    loading="lazy"
                />
            </Navbar.Brand>

            <Navbar.Toggle onClick={handleClick} />

            <Navbar.Collapse in={expanded}>
                <Nav className="ms-auto me-4">
                    <Nav.Link className="ms-3" as={Link} to="/" onClick={handleClick}>Home</Nav.Link>
                    <Nav.Link className="ms-3" as={Link} to="/quiz" onClick={handleClick}>Quiz</Nav.Link>
                    <Nav.Link className="ms-3" as={Link} to="/education" onClick={handleClick}>Education</Nav.Link>
                    <Nav.Link className="ms-3" as={Link} to="/library" onClick={handleClick}>Library</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

