import { useEffect, useState } from "react";
import List from "./List";

const Home = () => {
    const [jobList, setJobList] = useState([]);
    const [filter, setFilter] = useState('ONGOING');
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
        if(value === 'COMPLETED'){
            setListOptions({
            });
        }else if(value === 'ONGOING'){
            setListOptions({
                actions : { stateName : 'Stop', stateAction : 'jobs/stop', prop : 'jobId'}
            });
        }else if(value === 'NEW'){
            setListOptions({
                actions : { stateName : 'Start', stateAction : 'jobs/start', prop : 'jobId'}
            });
        }
    }

    return (
        <div>
            <select onChange={e => handleFilterChange(e.target.value)}>
                <option selected={filter === 'NEW'} value="NEW">NEW</option>
                <option selected={filter === 'ONGOING'} value="ONGOING">ON GOING</option>
                <option selected={filter === 'COMPLETED'} value="COMPLETED">COMPLETED</option>
            </select>
            <List data={jobList} headers={headers} listOptions={listOptions}></List>
        </div>
    );
}

export default Home;