import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import { AuthenticationContext } from '../services/AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import "./NavBar.css";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";



const Header = () => {
    
    const {user, onLogout} = useContext(AuthenticationContext);
    const navigate = useNavigate();

    const navigateToScreen = (path) => {
        navigate(path);
    }

    
    /*copied from navbar page from below*/
    const [selectedTab, setSelectedTab] = useState(null);
    const [toggleAdmin, setToggleAdmin] = useState(false);
    /*copied from navbar page till above line*/
    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" bg="white" variant="white">
            <Container>
            <Navbar.Brand><img src={require('../small_logo.png')}></img> </Navbar.Brand>
            {/* copied from navbar page from below */}
            {/* <div className="sidebar">
            <NavLink to={'/'} onClick={()=>setSelectedTab('Home')}>Home</NavLink>
            <NavLink  to={'/logLibrary'} onClick={()=>setSelectedTab('LogLibrary')} >Log</NavLink>
            {/* <NavLink  to={'/logTypes/0'} onClick={()=>setSelectedTab('LogTypes')} >Log Type</NavLink> */}
            {/* <NavLink  to={'/jobs/0'} onClick={()=>setSelectedTab('Jobs')} >Jobs</NavLink>
            <NavLink  to={'/sources/0'} onClick={()=>setSelectedTab('Sources')} >Sources</NavLink>
            <NavLink  to={'/collectors/0'} onClick={()=>setSelectedTab('Collectors')} >Collectors</NavLink>
            <a onMouseEnter ={() => setToggleAdmin(!toggleAdmin)} >Administration</a>
            {toggleAdmin && <NavLink  to={'/users/0'} onMouseEnter={()=>setSelectedTab('Users')} >Users</NavLink>} 
        </div> */}
        {/*copied from navbar page till above line*/}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto my-2 my-lg-0"></Nav>
                <Nav className="sidebar">
                    <Nav.Link onClick={() => navigateToScreen('/')}>Home</Nav.Link>
                    <Nav.Link onClick={() => navigateToScreen('/simulations/0')}>Simulation</Nav.Link>
                    <Nav.Link onClick={() => navigateToScreen('/logLibrary')}>Log</Nav.Link>
                    <Nav.Link onClick={() => navigateToScreen('/logTypes/0')}>Log Type</Nav.Link>
                    <Nav.Link onClick={() => navigateToScreen('/jobs/0')}>Jobs</Nav.Link>
                    <Nav.Link onClick={() => navigateToScreen('/sources/0')}>Sources</Nav.Link>
                    <Nav.Link onClick={() => navigateToScreen('/collectors/0')}>Collectors</Nav.Link>
                    <NavDropdown title="Administration" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => navigateToScreen('/users/0')}>Users</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
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