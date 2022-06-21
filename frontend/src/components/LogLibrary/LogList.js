import { useEffect, useState } from "react";
import List from "../List";

const LogList = ({logList}) => {
    
    const headers = [
        {prop : 'logName', value : 'Log Name'},
        {prop : 'logSize', value : 'File Size'},
        {prop : 'sampleLog', value : 'Sample'}
    ];

    const listOptions = {
    };

    return (
        <div>
            <h3>List of Log Uploads</h3>
            <List data={logList} headers={headers} listOptions={listOptions}></List>
        </div>
    );
}

export default LogList;