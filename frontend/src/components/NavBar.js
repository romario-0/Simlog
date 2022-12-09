import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    const [toggleAdmin, setToggleAdmin] = useState(false);

    return (
        <div className="sidebar">
            <NavLink to={'/'} >Home</NavLink>
            <NavLink  to={'/logLibrary'} >Log</NavLink>
            <NavLink  to={'/logTypes/0'} >Log Type</NavLink>
            <NavLink  to={'/jobs/0'} >Dataset</NavLink>
            <NavLink  to={'/jobs/0'} >Jobs</NavLink>
            <NavLink  to={'/sources/0'} >Sources</NavLink>
            <NavLink  to={'/collectors/0'} >Collectors</NavLink>
            <NavLink onClick={() => setToggleAdmin(!toggleAdmin)} >Administration</NavLink>
            {toggleAdmin && <NavLink  to={'/users/0'} >Users</NavLink>}
        </div>
    );
}

export default NavBar;