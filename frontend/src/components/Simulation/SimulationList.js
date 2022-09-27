import { Link } from "react-router-dom";
import { displayDate } from "../../services/CommonUtils";
import List from "../List";

const SimulationList = ({simulationList, refreshList, reload, clone}) => {

    const jobHeaders = [
        // {prop : 'jobName', value : 'Job Name'},
        //{prop : 'status', value : 'Status'},
        {prop : 'duration', value : 'Duration'},
        {prop : 'volume', value : 'Volume'},
        {prop : 'progress', value : 'Progress'}
    ];

    const handleAction = (simulationId, action) => {
        const obj = {
            simulationId,
            action
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations/action`, requestOptions).then( res => res.json() ).then( data => {
            //Handle success or failure
            fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations`).then( res => res.json() ).then( data => {refreshList(data.simulationList)});
        });
    }

    const handleReload = () => {
        reload();
    }

    const createSimulationElements = () => {
        return simulationList.map(ele => 
            <div className="simjoblist" key={`SimList_${ele._id}`}>
                <div>
                    <span className="simname">{ele.simulationName}</span>
                    <span className="simdate">{displayDate(ele.date)}</span>
                    <span>{ele.status}</span>
                    <span>
                        <Link class="btn btn-primary" to={`/simulations/${ele._id}`}>Edit</Link> 
                        <button onClick={() => handleAction(ele._id, 'run')} class="btn btn-outline-warning">Run Immediately</button>
                        <button onClick={() => clone(ele)} class="btn btn-outline-warning">Clone</button>
                    </span>
                </div>
                <div>
                    <List data={ele.jobs} headers={jobHeaders} listOptions={{}} reload={handleReload}></List>
                </div>
            </div>
        )
    }

    return (
    <div>
        {createSimulationElements()}
    </div>
    );
}

export default SimulationList;
