import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../List";

const SourceList = () => {
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/sources`).then( res => res.json() ).then( data => {setSourceList(data.sourceList)});
    },[]);

    const [sourceList, setSourceList] = useState([]);
    const headers = [
        {prop : 'sourceName', value : 'Source Name'},
        {prop : 'fromIP', value : 'From IP'},
        {prop : 'toIP', value : 'To IP'}
    ];

    const listOptions = {
        editLink : 'source'
    };

    return (
        <div>
            <Link to={'/source/0'}>Add new Source</Link>
            <List data={sourceList} headers={headers} listOptions={listOptions}></List>
        </div>
    );
}

export default SourceList;