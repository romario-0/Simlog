import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import { AuthenticationContext } from '../services/AuthenticationContext';



const Header = () => {

    const {user, onLogout} = useContext(AuthenticationContext);

    return (
        <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
            <Container>
            <Navbar.Brand><img Class="Image" src="small_logo.png"></img></Navbar.Brand>
            <Navbar.Brand>Simlog</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                <Nav.Link href="#deets">About</Nav.Link>
                <NavDropdown title={user ? user.firstName : 'Sign In'} id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={onLogout}>Sign Out</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;