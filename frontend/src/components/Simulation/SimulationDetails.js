import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../services/CommonUtils";
import SimulationList from "./SimulationList";
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
    frequency: 0,
    frequencyType: 0,
  });
  const [simulationList, setSimulationList] = useState([]);
  // const [jobOptionsList, setJobOptionsList] = useState([]);
  // const [selectedJobs, setSelectedJobs] = useState([]);
  const [jobs, setJobs] = useState([emptyJob]);
  const [jobsError, setJobsError] = useState([true]);
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
        setJobsError(Array(data.simulation.jobs.length).fill(false));
        // setSelectedJobList(data.simulation.jobs) 
      });
    } else if (jobs.logId === '') {
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

      const simulationObj = { ...simulation, jobs: jobs }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simulationObj)
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

  const resetForm = (data = {
    simulationName: '',
    date: '',
    frequency: 0,
    frequencyType: 0,
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
    if (jobsError.length === 0 || jobsError.includes(true)) {
      setMessage({ color: 'red', text: 'Job details invalid' });
      return false;
    }
    if (selectedDate < date) {
      setMessage({ color: 'red', text: 'Invalid date' });
      return false;
    }
    return true;
  }

  const cloneData = (data) => {
    const newJobs = data.jobs.map(ele => {
      const job = { ...ele, progress: 0 };
      delete job._id;
      delete job.status;
      return job;
    })
    const newData = {
      simulationName: '',
      date: data.date,
      frequency: 0,
      frequencyType: 0,
      jobs: newJobs
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

    const errors = [...jobsError];
    errors.push(true);
    setJobsError(errors);
  }

  const setJobData = (idx, value) => {
    const data = [...jobs];
    data[idx] = value;
    setJobs(data);
    setSimulation({ ...simulation, jobs: data });
  }

  const setJobErrors = (idx, value) => {
    const data = [...jobsError];
    data[idx] = value;
    setJobsError(data);
  }
  const removeFields = (index) => {
    const data = [...jobs];
    const errorData = [...jobsError];
    data.splice(index, 1);
    errorData.splice(index, 1);
    setJobs(data);
    setJobsError(errorData);
  }

  const createFieldElements = () => {
    return jobs.map((ele, idx) => (

      <div className="deljob col-12" key={`job_field_${idx}`}>

        <JobCard updateJob={(newJob) => { setJobData(idx, newJob) }} job={ele} logOptions={logOptions} sourceOptions={sourceOptions} collectorOptions={collectorOptions} validate={(val) => { setJobErrors(idx, val) }} />

        <div className="delbtn col-1">
          {jobs.length > 1 && !(ele.status && ele.status !== 'New') && <button type="button" className=" btnheight btn btn-primary" onClick={(e) => removeFields(idx)} >
            Del
          </button>}
        </div>

        <div className="jobcardbtn1">
          {idx === 0 && <button type="button" className="btnheight btn btn-primary " onClick={addFields} >
            Add
          </button>}
        </div>

      </div>

    ));
  }

  return (
    <div className="Container-md">
      <div className="row form-inline justify-content-center">
        <div className="col-lg-10 col-md-6 col-sm-6 card bg-light row p-0 mx-3">
          <h4 class="card-title mb-3">Create New Simulation</h4>
          <div className="card-body col-sm-12 col-md-12 row">
            <div className="simulationhead row col ">
              <div  className="col-lg-2 simtitle row">
              <label className="form-group col-sm-auto">Simulation Name</label>
              <input className="form-control"
                disabled={simulation._id}
                value={simulation.simulationName}
                onChange={e => handleOnChange('simulationName', e.target.value)}
                placeholder="Add Simulation name" />
              
              </div>

            <div className="col-2 simtext ">
            
            <label className="form-group col-sm-auto">Simulation Schedule</label>
              <input type='datetime-local' className="form-control col-sm-12" value={formatDate(new Date(simulation.date))}
                onChange={e => handleOnChange('date', e.target.value)} />
            </div>
            </div>
            {/* <div className="jobheight form-group col-md-4">
            <MultiSelect options={getJobOptions} onChange={setSimulationJobs} value={selectedJobs} />
          </div> */}

            <div className="newjob row">
              <div className="deljob col-12 simhead">
                <div className="form-group col-sm-2 log">
                  Log
                </div>
                <div className="form-group col-sm-2 duration">
                  Duration (in mins)
                </div>
                <div className="form-group col-sm-2 volume">
                  Volume (in mb)
                </div>
                <div className="form-group col-sm-3 source">
                  Source
                </div>
                <div className="form-group col-sm-3 collector">
                  Collector
                </div>
              </div>
              <div className="jobfield col row">
                {
                  jobs.length && createFieldElements()
                }
              </div>
            </div>

            <div className="dtheight form-group">
              {/* <input type='datetime-local' className="form-control" value={formatDate(new Date(simulation.date))}
                onChange={e => handleOnChange('date', e.target.value)} /> */}

              <input type='number' className="form-control" value={simulation.frequency}
                onChange={e => handleOnChange('frequency', e.target.value)} />

              <select onChange={e => handleOnChange('frequencyType', e.target.value)} disabled={!simulation.frequency} >
                <option selected={simulation.frequencyType === 0} value={0}>Select</option>
                <option selected={simulation.frequencyType === 's'} value={'s'}>Seconds</option>
                <option selected={simulation.frequencyType === 'm'} value={'m'}>Minutes</option>
                <option selected={simulation.frequencyType === 'h'} value={'h'}>Hours</option>
                <option selected={simulation.frequencyType === 'd'} value={'d'}>Days</option>
              </select>

              <button className="btn btn-primary" onClick={saveSimulation} disabled={isLoading}>Submit</button>

              <button className="btn btn-outline-warning" onClick={() => { resetForm(); navigate('/simulations/0'); }}>Cancel</button>
            </div>
          </div>
        </div>
        {/* <div className="jobcard0">
							{
								jobs.length && createFieldElements()
							}
					</div> */}

        {/* {<div className="form-group justify-content-center">
          {selectedJobs.length > 0 && <List data={selectedJobs} headers={jobHeaders} listOptions={{}}></List>}
        </div>} */}
        {message.text &&
          <div style={{ color: message.color }}>{message.text}</div>
        }

      </div>
      <div className="simlist mt-2">
        <SimulationList clone={(data) => cloneData(data)} refreshList={(list) => setSimulationList(list)} simulationList={simulationList} reload={reloadList} />
      </div>
    </div>


  );
}

export default SimulationDetails;