import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {

    const [selectedTab, setSelectedTab] = useState(null);

    return (
        <div className="sidebar">
            <ul>
                <li className={selectedTab === 'Home' ? 'active' : ''}><Link to={'/home'} onClick={()=>setSelectedTab('Home')}>Home</Link></li>
                <li className={selectedTab === 'LogLibrary' ? 'active' : ''}><Link to={'/logLibrary'} onClick={()=>setSelectedTab('LogLibrary')} >Log</Link></li>
                <li className={selectedTab === 'LogTypes' ? 'active' : ''}><Link to={'/logTypes'} onClick={()=>setSelectedTab('LogTypes')} >Log Type</Link></li>
                <li className={selectedTab === 'Jobs' ? 'active' : ''}><Link to={'/jobs'} onClick={()=>setSelectedTab('Jobs')} >Jobs</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;