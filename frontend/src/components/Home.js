import { useEffect, useState } from "react";
import List from "./List";

const Home = () => {
    const [jobList, setJobList] = useState([]);
    const [filter, setFilter] = useState('Running');
    const [listOptions, setListOptions] = useState({
        actions : { stateName : 'Stop', stateAction : 'job/stop'}
    })

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/filter?status=${filter}`).then( res => res.json() ).then( data => {setJobList(data.jobList)});
    },[filter]);
    
    const headers = [
        {prop : 'jobName', value : 'Job Name'},
        {prop : 'date', value : 'Date'},
        {prop : 'duration', value : 'Duration'},
        {prop : 'volume', value : 'Volume'}
    ];

    const handleFilterChange = (value) => {
        setFilter(value);
        if(value.toUpperCase() === 'RUNNING' || value.toUpperCase() === 'PROCESSING'){
            setListOptions({
                actions : { stateName : 'Stop', stateAction : 'jobs/stop', prop : 'jobId'}
            });
        }else if(value === 'NEW'){
            setListOptions({
                actions : { stateName : 'Start', stateAction : 'jobs/start', prop : 'jobId'}
            });
        }else{
            setListOptions({});
        }
    }

    return (
        <div>
            <select onChange={e => handleFilterChange(e.target.value)}>
                <option selected={filter.toUpperCase() === 'NEW'} value="NEW">NEW</option>
                <option selected={filter.toUpperCase() === 'PROCESSING'} value="Processing">PROCESSING</option>
                <option selected={filter.toUpperCase() === 'RUNNING'} value="Running">RUNNING</option>
                <option selected={filter.toUpperCase() === 'CANCELLED'} value="Cancelled">CANCELLED</option>
                <option selected={filter.toUpperCase() === 'STOPPED'} value="Stopped">STOPPED</option>
                <option selected={filter.toUpperCase() === 'COMPLETED'} value="Completed">COMPLETED</option>
            </select>
            <List data={jobList} headers={headers} listOptions={listOptions}></List>
        </div>
    );
}

export default Home;