import { useEffect, useState } from "react";
import List from "../List";
import LogUpload from "./LogUpload";

const LogList = () => {
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/logs`).then( res => res.json() ).then( data => {setLogList(data.logList)});
    });

    const [logList, setLogList] = useState([]);
    const headers = [
        {prop : 'logName', value : 'Log Name'},
        {prop : 'logSize', value : 'File Size'},
        {prop : 'sampleLog', value : 'Sample'}
    ];

    const listOptions = {
    };

    return (
        <div>
            <LogUpload />
            <h3>List of Log Uploads</h3>
            <List data={logList} headers={headers} listOptions={listOptions}></List>
        </div>
    );
}

export default LogList;