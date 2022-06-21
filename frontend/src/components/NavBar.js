import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {

    const [selectedTab, setSelectedTab] = useState(null);

    return (
        <div className="sidebar">
            <ul>
                <li className={selectedTab === 'Home' ? 'active' : ''}><Link to={'/'} onClick={()=>setSelectedTab('Home')}>Home</Link></li>
                <li className={selectedTab === 'LogLibrary' ? 'active' : ''}><Link to={'/logLibrary'} onClick={()=>setSelectedTab('LogLibrary')} >Log</Link></li>
                <li className={selectedTab === 'LogTypes' ? 'active' : ''}><Link to={'/logTypes/0'} onClick={()=>setSelectedTab('LogTypes')} >Log Type</Link></li>
                <li className={selectedTab === 'Jobs' ? 'active' : ''}><Link to={'/jobs/0'} onClick={()=>setSelectedTab('Jobs')} >Jobs</Link></li>
                <li className={selectedTab === 'Sources' ? 'active' : ''}><Link to={'/sources/0'} onClick={()=>setSelectedTab('Sources')} >Sources</Link></li>
                <li className={selectedTab === 'Collectors' ? 'active' : ''}><Link to={'/collectors/0'} onClick={()=>setSelectedTab('Collectors')} >Collectors</Link></li>
            </ul>
        </div>
    );
}

export default NavBar;