import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../services/CommonUtils";
import SimulationList from "./SimulationList";
import JobTile from "../Jobs/JobTile";
import { MultiSelect } from "react-multi-select-component";
import List from "../List";

const jobHeaders = [
  { prop: 'job.jobName', value: 'Job Name' },
  { prop: 'job.date', value: 'Date', format: 'DATE' },
  { prop: 'job.status', value: 'Status' },
  { prop: 'job.duration', value: 'Duration' },
  { prop: 'job.volume', value: 'Volume' },
  { prop: 'job.progress', value: 'Progress' }
];

const SimulationDetails = () => {
  const { id } = useParams();
  const [simulation, setSimulation] = useState({
    simulationName: '',
    date: '',
    jobIds: [],
    jobs: []
  });
  const [simulationList, setSimulationList] = useState([]);
  const [jobOptionsList, setJobOptionsList] = useState([]);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [message, setMessage] = useState({ color: null, text: null });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations`).then(res => res.json()).then(data => { setSimulationList(data.simulationList) });
    fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/newJobs`).then(res => res.json()).then(data => { setJobOptionsList(data.jobList) });
    if (id != 0) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations/view/${id}`).then(res => res.json()).then(data => { setSimulation(data.simulation); setSelectedJobList(data.simulation.jobs) });
    } else {
      resetForm();
    }
  }, [id]);

  const handleOnChange = (prop, value) => {
    setSimulation(prevState => ({ ...prevState, [prop]: value }))
  }

  const saveSimulation = () => {
    if (validateForm()) {
      setIsLoading(true);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simulation)
      };

      if (simulation._id) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations/update`, requestOptions).then(res => res.json()).then(data => handleData(data));
      } else {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations/save`, requestOptions).then(res => res.json()).then(data => handleData(data));
      }
    }
  }

  const handleData = (data) => {
    if (data.simulation) {
      setMessage(prev => { prev.color = 'green'; prev.text = data.message; return prev; });
      fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/newJobs`).then(res => res.json()).then(data => { setJobOptionsList(data.jobList) });
      fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations`).then(res => res.json()).then(data => { setSimulationList(data.simulationList) });
      resetForm();
    } else {
      setMessage(prev => { prev.color = 'red'; prev.text = data.message; return prev; })
    }
    setIsLoading(false);
  }

  const resetForm = () => {
    setSimulation({
      simulationName: '',
      date: '',
      jobIds: [],
      jobs: []
    });
    setSelectedJobs([]);
    navigate('/simulations/0');
  }

  const validateForm = () => {
    const date = Date.now();
    const selectedDate = new Date(simulation.date);
    if (!simulation.simulationName.trim()) {
      setMessage({ color: 'red', text: 'Enter Simulation Name' });
      return false;
    }
    if (!simulation.jobIds || simulation.jobIds.length == 0) {
      setMessage({ color: 'red', text: 'Select a job' });
      return false;
    }
    if (selectedDate < date) {
      setMessage({ color: 'red', text: 'Invalid date' });
      return false;
    }
    return true;
  }

  const getJobOptions = () => {
    const totalOptions = [...jobOptionsList, ...simulation.jobs];
    return totalOptions.map(job => ({ label: job.jobName, value: job._id, job }));
  }

  const setSelectedJobList = (jobs) => {
    const jobList = jobs.map(job => ({ label: job.jobName, value: job._id, job }))
    setSelectedJobs(jobList);
  }

  const setSimulationJobs = (jobs) => {
    const newJobIds = jobs.map(job => (job.value));
    setSimulation({ ...simulation, jobIds: newJobIds });
    setSelectedJobs(jobs);
  }

  return (
    <div>
      <div className="col-lg-10 col-md-6 col-sm-6 container justify-content-center card">
        <h2>Create new simulation</h2>
        <div className="card-body">
          <div className="jobheight form-group col-3">
            <label >Simulation Name</label>
            <input className="form-control"
              disabled={simulation._id}
              value={simulation.simulationName}
              onChange={e => handleOnChange('simulationName', e.target.value)}
              placeholder="Add new Simulation name" />
          </div>
          <div className="jobheight form-group col-md-4">
            <MultiSelect options={getJobOptions} onChange={setSimulationJobs} value={selectedJobs} />
          </div>
          <div className="dtheight form-group">
            <input type='datetime-local' className="form-control" value={formatDate(new Date(simulation.date))}
              onChange={e => handleOnChange('date', e.target.value)} />
          </div>
          <div className="box-footer">
            <button className="btn btn-primary" onClick={saveSimulation}>Submit</button>

            <button className="btn btn-outline-warning" onClick={() => { resetForm(); navigate('/simulations/0'); }}>Cancel</button>
          </div>
        </div>
        {<div className="form-group justify-content-center">
          {selectedJobs.length > 0 && <List data={selectedJobs} headers={jobHeaders} listOptions={{}}></List>}
        </div>}
        {message.text &&
          <div style={{ color: message.color }}>{message.text}</div>
        }

      </div>
      <div className="simlist">
        <SimulationList refreshList={(list) => setSimulationList(list)} simulationList={simulationList} />
      </div>
    </div>
  );
}

export default SimulationDetails;