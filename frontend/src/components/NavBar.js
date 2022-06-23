import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {

    const [selectedTab, setSelectedTab] = useState(null);
    const [toggleAdmin, setToggleAdmin] = useState(false);

    return (
        <div className="sidebar">
            <ul>
                <li className={selectedTab === 'Home' ? 'active' : ''}><NavLink to={'/'} onClick={()=>setSelectedTab('Home')}>Home</NavLink></li>
                <li className={selectedTab === 'LogLibrary' ? 'active' : ''}><NavLink to={'/logLibrary'} onClick={()=>setSelectedTab('LogLibrary')} >Log</NavLink></li>
                <li className={selectedTab === 'LogTypes' ? 'active' : ''}><NavLink to={'/logTypes/0'} onClick={()=>setSelectedTab('LogTypes')} >Log Type</NavLink></li>
                <li className={selectedTab === 'Jobs' ? 'active' : ''}><NavLink to={'/jobs/0'} onClick={()=>setSelectedTab('Jobs')} >Jobs</NavLink></li>
                <li className={selectedTab === 'Sources' ? 'active' : ''}><NavLink to={'/sources/0'} onClick={()=>setSelectedTab('Sources')} >Sources</NavLink></li>
                <li className={selectedTab === 'Collectors' ? 'active' : ''}><NavLink to={'/collectors/0'} onClick={()=>setSelectedTab('Collectors')} >Collectors</NavLink></li>
                <li className={selectedTab === 'Admin' ? 'active' : ''} onClick={() => setToggleAdmin(!toggleAdmin)} >Administration</li>
                {toggleAdmin && <li className={selectedTab === 'Users' ? 'active' : ''}><NavLink to={'/users/0'} onClick={()=>setSelectedTab('Users')} >Users</NavLink></li>}
            </ul>
        </div>
    );
}

export default NavBar;