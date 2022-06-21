import { useEffect, useState } from "react";
import List from "./List";

const Home = () => {
    const [filter, setFilter] = useState('NEW');
    const [jobList, setJobList] = useState([]);
    const [listOptions, setListOptions] = useState({
        editLink : 'jobs',
        actions : [
            { stateName : 'Start', stateAction : 'job/start'},
            { stateName : 'Stop', stateAction : 'job/stop'}
        ]
    })

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs?status=${filter}`).then( res => res.json() ).then( data => {setJobList(data.jobList)});
    },[filter]);
    
    const headers = [
        {prop : 'jobName', value : 'Job Name'},
        {prop : 'date', value : 'Date'},
        {prop : 'time', value : 'Time'},
        {prop : 'frequency', value : 'Frequency'},
        {prop : 'volume', value : 'Volume'}
    ];

    const handleFilterChange = (value) => {
        setFilter(value);
        if(value === 'COMPLETED'){
            setListOptions({
            });
        }else{
            setListOptions({
                editLink : 'jobs',
                actions : [
                    { stateName : 'Start', stateAction : 'job/start'},
                    { stateName : 'Stop', stateAction : 'job/stop'}
                ]
            });
        }
    }

    return (
        <div>
            <select onChange={e => handleFilterChange(e.target.value)}>
                <option selected={filter === 'NEW'} value="NEW">NOT COMPLETED</option>
                <option selected={filter === 'COMPLETED'} value="COMPLETED">COMPLETED</option>
            </select>
            <List data={jobList} headers={headers} listOptions={listOptions}></List>
        </div>
    );
}

export default Home;