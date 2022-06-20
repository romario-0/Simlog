import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../List";

const JobList = () => {
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs`).then( res => res.json() ).then( data => {setJobList(data.jobList)});
    },[]);

    const [jobList, setJobList] = useState([]);
    const headers = [
        {prop : 'jobName', value : 'Job Name'},
        {prop : 'date', value : 'Date'},
        {prop : 'time', value : 'Time'},
        //{prop : 'state', value : 'From IP'},
        {prop : 'frequency', value : 'Frequency'},
        {prop : 'volume', value : 'Volume'}
    ];

    const listOptions = {
        editLink : 'job'
    };
    return (
        <div>
            <Link to={'/job/0'}>Add new Job</Link>
            <List data={jobList} headers={headers} listOptions={listOptions}></List>
        </div>
    );
}

export default JobList;