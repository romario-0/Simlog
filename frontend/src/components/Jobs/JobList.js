import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import List from "../List";

const JobList = ({jobList}) => {

    const headers = [
        {prop : 'jobName', value : 'Job Name'},
        {prop : 'date', value : 'Date'},
        {prop : 'time', value : 'Time'},
        //{prop : 'state', value : 'Status'},
        {prop : 'frequency', value : 'Frequency'},
        {prop : 'volume', value : 'Volume'}
    ];

    const listOptions = {
        editLink : 'jobs'
    };
    
    return (
        <div>
            <List data={jobList} headers={headers} listOptions={listOptions}></List>
        </div>
    );
}

export default JobList;