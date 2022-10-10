import { useState } from "react";
import { Link } from "react-router-dom";
import { displayDate } from "../../services/CommonUtils";
import List from "../List";
import Collapse from 'react-bootstrap/Collapse';

const SimulationList = ({ simulationList, refreshList, reload, clone }) => {

    const [showJob, setShowJob] = useState({});

    const jobHeaders = [
        { prop: 'log.logName', value: 'Log' },
        { prop: 'source.sourceName', value: 'Source' },
        { prop: 'collector.collectorName', value: 'Collector' },
        { prop: 'duration', value: 'Duration' },
        { prop: 'volume', value: 'Volume' },
        { prop: 'progress', value: 'Progress' },
        { prop: 'status', value: 'Status' }
    ];

    const listOptions = {}

    const startSimulation = (simulation) => {
        const newObj = { ...simulation, date: Date.now() }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newObj)
        };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations/update`, requestOptions).then(res => res.json()).then(data => {
            //Handle success or failure
            fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations`).then(res => res.json()).then(data => { refreshList(data.simulationList) });
        });
    }

    const handleReload = () => {
        reload();
    }

    const handleClick = (event, index) => {
        event.preventDefault();
        if (event.target === event.currentTarget) {
            const show = {};
            show[index] = !showJob[index];
            setShowJob({ ...showJob, ...show });
        }
    }

    const createSimulationElements = () => {
        return simulationList.map((ele, index) =>
            <div className="simjoblist" key={`SimList_${ele._id}`}>
                <div onClick={(e) => handleClick(e, index)}>
                    <span onClick={(e) => handleClick(e, index)}>{ele.simulationName}</span>
                    <span>{displayDate(ele.date)}</span>
                    <span>{ele.status}</span>
                    <span>
                        {ele.status.toUpperCase() === 'NEW' && <Link class="btn btn-primary" to={`/simulations/${ele._id}`}>Edit</Link>}
                        {ele.status.toUpperCase() === 'NEW' && <button onClick={() => startSimulation(ele)} class="btn btn-outline-warning">Run Now</button>}
                        <button onClick={() => clone(ele)} class="btn btn-outline-warning">Clone</button>
                    </span>
                </div>
                <Collapse in={showJob[index]}>
                    <div>
                        <List data={ele.jobs} headers={jobHeaders} listOptions={listOptions} reload={handleReload}></List>
                    </div>
                </Collapse>
            </div>
        )
    }

    return (
        <div>
            <div>
                <span>Simulation Name</span>
                <span>Date</span>
                <span>Status</span>
                <span>Action</span>
            </div>
            {createSimulationElements()}
        </div>
    );
}

export default SimulationList;
