import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../List";

const LogTypeList = () => {
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes`).then( res => res.json() ).then( data => {setLogTypeList(data.logTypeList)});
    },[]);

    const [logTypeList, setLogTypeList] = useState([]);
    const headers = [
        {prop : 'logTypeName', value : 'Log Type Name'},
        {prop : 'grokPattern', value : 'Pattern'}
    ];

    const listOptions = {
        editLink : 'logType'
    };
    return (
        <div>
            <Link to={'/logType/0'}>Add new Type</Link>
            <List data={logTypeList} headers={headers} listOptions={listOptions}></List>
        </div>
    );
}

export default LogTypeList;