import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../services/CommonUtils";
import SimulationList from "./SimulationList";
import { MultiSelect } from "react-multi-select-component";
import List from "../List";
import { createSimulation, updateSimulation } from "../../services/simulation.service";
import JobCard from "./JobCard";

const jobHeaders = [
  { prop: 'job.jobName', value: 'Job Name' },
  { prop: 'job.status', value: 'Status' },
  { prop: 'job.duration', value: 'Duration' },
  { prop: 'job.volume', value: 'Volume' },
  { prop: 'job.progress', value: 'Progress' }
];

const SimulationDetails = () => {
  const { id } = useParams();
  const emptyJob = { logId: '', duration: 0, volume: 0, sourceId: '', collectorId: '' };
  const [simulation, setSimulation] = useState({
    simulationName: '',
    date: '',
  });
  const [simulationList, setSimulationList] = useState([]);
  // const [jobOptionsList, setJobOptionsList] = useState([]);
  // const [selectedJobs, setSelectedJobs] = useState([]);
  const [jobs, setJobs] = useState([emptyJob]);
  const [message, setMessage] = useState({ color: null, text: null });
  const [isLoading, setIsLoading] = useState(false);
  const [logOptions, setlogOptions] = useState("");
  const [sourceOptions, setSourceOptions] = useState("");
  const [collectorOptions, setCollectorOptions] = useState("");
  const navigate = useNavigate();

  // const createLogOptions = () => {
  //   if (logOptions) {
  //     return logOptions.map((ele) => (
  //       <option selected={ele._id === job.logId} key={ele._id} value={ele._id}>
  //         {ele.logName}
  //       </option>
  //     ));
  //   }
  // };

  // const createSourceOptions = () => {
  //   if (sourceOptions) {
  //     return sourceOptions.map((ele) => (
  //       <option
  //         key={ele._id}
  //         selected={ele._id === job.sourceId}
  //         value={ele._id}
  //       >
  //         {ele.sourceName + " -> " + ele.fromIP + " - " + ele.toIP}
  //       </option>
  //     ));
  //   }
  // };

  // const createCollectorOptions = () => {
  //   if (collectorOptions) {
  //     return collectorOptions.map((ele) => (
  //       <option
  //         key={ele._id}
  //         selected={ele._id === job.collectorId}
  //         value={ele._id}
  //       >
  //         {ele.collectorName +
  //           " -> " +
  //           ele.collectorIP +
  //           ":" +
  //           ele.collectorPort}
  //       </option>
  //     ));
  //   }
  // };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/logs`)
      .then((res) => res.json())
      .then((data) => {
        setlogOptions(data.logList);
      });
    fetch(`${process.env.REACT_APP_BACKEND_URL}/sources`)
      .then((res) => res.json())
      .then((data) => {
        setSourceOptions(data.sourceList);
      });
    fetch(`${process.env.REACT_APP_BACKEND_URL}/collectors`)
      .then((res) => res.json())
      .then((data) => {
        setCollectorOptions(data.collectorList);
      });
    fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations`).then(res => res.json()).then(data => { setSimulationList(data.simulationList) });
    // fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/newJobs`).then(res => res.json()).then(data => { setJobOptionsList(data.jobList) });
    if (Number(id) !== 0) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations/view/${id}`).then(res => res.json()).then(data => { 
        setSimulation(data.simulation);
        setJobs(data.simulation.jobs);
        // setSelectedJobList(data.simulation.jobs) 
      });
    } else {
      resetForm();
    }
    /* eslint-disable */
  }, [id]);

  const handleOnChange = (prop, value) => {
    setSimulation(prevState => ({ ...prevState, [prop]: value }))
  }

  const saveSimulation = async () => {
    if (validateForm()) {
      setIsLoading(true);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simulation)
      };

      if (simulation._id) {
        handleData(await updateSimulation(requestOptions));
      } else {
        handleData(await createSimulation(requestOptions));
      }
    }
  }

  const handleData = (data) => {
    if (data.simulation) {
      reloadList();
      resetForm();
    }
    setIsLoading(false);
  }

  const resetForm = (data={
    simulationName: '',
    date: '',
    // jobIds: [],
    jobs: [emptyJob]
  }) => {
    setSimulation(data);
    // setSelectedJobs([]);
    setJobs(data.jobs);
    setMessage({ color: null, text: null });
    navigate('/simulations/0');
  }

  const validateForm = () => {
    const date = Date.now();
    const selectedDate = new Date(simulation.date);
    if (!simulation.simulationName.trim()) {
      setMessage({ color: 'red', text: 'Enter Simulation Name' });
      return false;
    }
    // if (!simulation.jobIds || simulation.jobIds.length === 0) {
    //   setMessage({ color: 'red', text: 'Select a job' });
    //   return false;
    // }
    if (selectedDate < date) {
      setMessage({ color: 'red', text: 'Invalid date' });
      return false;
    }
    return true;
  }

  const cloneData = (data) => {
    const newData = {
      date: data.date,
      jobs: data.jobs
    }
    resetForm(newData)
  }

  // const getJobOptions = () => {
  //   const totalOptions = [...jobOptionsList, ...simulation.jobs];
  //   return totalOptions.map(job => ({ label: job.jobName, value: job._id, job }));
  // }

  // const setSelectedJobList = (jobs) => {
  //   const jobList = jobs.map(job => ({ label: job.jobName, value: job._id, job }))
  //   setSelectedJobs(jobList);
  // }

  // const setSimulationJobs = (jobs) => {
  //   const newJobIds = jobs.map(job => (job.value));
  //   setSimulation({ ...simulation, jobIds: newJobIds });
  //   setSelectedJobs(jobs);
  // }

  const reloadList = () => {
    // fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/newJobs`).then(res => res.json()).then(data => { setJobOptionsList(data.jobList) });
    fetch(`${process.env.REACT_APP_BACKEND_URL}/simulations`).then(res => res.json()).then(data => { setSimulationList(data.simulationList) });
  }

  const addFields = () => {
		const data = [...jobs];
		data.push({ logId: '', duration: 0, volume: 0, sourceId: '', collectorId: '' });
		setJobs(data);
	}

  const setJobData = (idx, value) => {
		const data = [...jobs];
		data[idx] = value;
		setJobs(data);
    setSimulation({...simulation, jobs : data});
	}

  const removeFields = (index) => {
		const data = [...jobs];
		data.splice(index, 1);
		setJobs(data);
	}

  const createFieldElements = () => {
		return jobs.map((ele, idx) => (
			<div key={`job_field_${idx}`}>

        <JobCard updateJob={(newJob) => { setJobData(idx, newJob)}} job={ele} logOptions={logOptions} sourceOptions={sourceOptions} collectorOptions={collectorOptions} />

				{jobs.length > 1 && <button type="button" className=" btnheight btn btn-primary" onClick={(e) => removeFields(idx)} >
					Del
				</button>}
				{idx === 0 && <button type="button" className="btnheight btn btn-primary" onClick={addFields} >
					Add
				</button>}
			</div>
		));
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
          {/* <div className="jobheight form-group col-md-4">
            <MultiSelect options={getJobOptions} onChange={setSimulationJobs} value={selectedJobs} />
          </div> */}
          <div className="dtheight form-group">
            <input type='datetime-local' className="form-control" value={formatDate(new Date(simulation.date))}
              onChange={e => handleOnChange('date', e.target.value)} />
          </div>

          <div className="col-md-1.5">
							{
								jobs.length && createFieldElements()
							}
					</div>

          <div className="box-footer">
            <button className="btn btn-primary" onClick={saveSimulation} disabled={isLoading}>Submit</button>

            <button className="btn btn-outline-warning" onClick={() => { resetForm(); navigate('/simulations/0'); }}>Cancel</button>
          </div>
        </div>
        {/* {<div className="form-group justify-content-center">
          {selectedJobs.length > 0 && <List data={selectedJobs} headers={jobHeaders} listOptions={{}}></List>}
        </div>} */}
        {message.text &&
          <div style={{ color: message.color }}>{message.text}</div>
        }

      </div>
      <div className="simlist">
        <SimulationList clone={(data) => cloneData(data) } refreshList={(list) => setSimulationList(list)} simulationList={simulationList} reload={reloadList}/>
      </div>
    </div>
  );
}

export default SimulationDetails;