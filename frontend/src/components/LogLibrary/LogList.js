import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../List";

const LogList = () => {
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/logs`).then( res => res.json() ).then( data => {setLogList(data.logList)});
    },[]);

    const [logList, setLogList] = useState([]);
    const headers = [
        {prop : 'logName', value : 'Log Name'},
        {prop : 'logSize', value : 'File Size'}
    ];

    const listOptions = {
    };

    return (
        <div>
            <h3>List of Log Uploads</h3>
            <Link to="/logUpload">Upload</Link>
            <List data={logList} headers={headers} listOptions={listOptions}></List>
        </div>
    );
}

export default LogList;