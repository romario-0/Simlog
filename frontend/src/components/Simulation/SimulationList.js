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
            <div className="border border-secondary rounded-3">
                <div className="simjoblist row col-md-12 " key={`SimList_${ele._id}`}>
                    <div className="col-sm-1" onClick={(e) => handleClick(e, index)}><i class="bi bi-chevron-down"></i></div>
                    <div className="col-sm-2" onClick={(e) => handleClick(e, index)}>{ele.simulationName}</div>
                    <div className="col-sm-3" onClick={(e) => handleClick(e, index)}>{displayDate(ele.date)}</div>
                    <div className="col-sm-2" onClick={(e) => handleClick(e, index)}>{ele.status}</div>
                    <div className="col-sm-4" onClick={(e) => handleClick(e, index)}>
                        {ele.status.toUpperCase() === 'NEW' && <Link class="btn " to={`/simulations/${ele._id}`}><i class="bi bi-pencil-fill"></i></Link>}
                        {ele.status.toUpperCase() === 'NEW' && <button onClick={() => startSimulation(ele)} class="btn"><i class="bi bi-play-circle-fill"></i></button>}
                        <button onClick={() => clone(ele)} class="btn"><i class="bi bi-front"></i></button>
                    </div>

                </div>
                <div>
                    <Collapse in={showJob[index]}>
                        <div>
                            <List data={ele.jobs} headers={jobHeaders} listOptions={listOptions} reload={handleReload}></List>
                        </div>
                    </Collapse>
                </div>
            </div>
        )
    }

    return (
        <div className="container simlist">
            <div className="row bg-info rounded-2">
                <div className="col-sm-1"></div>
                <div className="col-sm-2">Simulation Name</div>
                <div className="col-sm-3">Date</div>
                <div className="col-sm-2">Status</div>
                <div className="col-sm-4">Action</div>
            </div>
            {createSimulationElements()}
        </div>
    );
}

export default SimulationList;
