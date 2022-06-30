import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import { AuthenticationContext } from '../services/AuthenticationContext';



const Header = () => {

    const {user, onLogout} = useContext(AuthenticationContext);

    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="white" variant="white">
            <Container>
            <Navbar.Brand><img src={require('../small_logo.png')}></img> </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto my-2 my-lg-0"></Nav>
                <Nav>
                <NavDropdown title={user ? user.firstName : 'Sign In'} id="collasible-nav-dropdown">
                    <NavDropdown.Item onClick={onLogout}>Sign Out</NavDropdown.Item>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;