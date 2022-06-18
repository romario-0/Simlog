import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../List";

const CollectorList = () => {
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/collectors`).then( res => res.json() ).then( data => {setCollectorList(data.collectorList)});
    },[]);

    const [collectorList, setCollectorList] = useState([]);
    const headers = [
        {prop : 'collectorName', value : 'Collector Name'},
        {prop : 'collectorIP', value : 'Collector IP'},
        {prop : 'collectorPort', value : 'Collector Port'}
    ];

    const listOptions = {
        editLink : 'collector'
    };
    return (
        <div>
            <Link to={'/collector/0'}>Add new Collector</Link>
            <List data={collectorList} headers={headers} listOptions={listOptions}></List>
        </div>
    );
}

export default CollectorList;