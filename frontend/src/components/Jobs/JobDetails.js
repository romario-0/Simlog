import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const JobDetails = () => {

	const {id} = useParams();
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/logs`).then( res => res.json() ).then( data => { setlogOptions(data.logList)});
		fetch(`${process.env.REACT_APP_BACKEND_URL}/sources`).then( res => res.json() ).then( data => {setSourceOptions(data.sourceList)});
		fetch(`${process.env.REACT_APP_BACKEND_URL}/collectors`).then( res => res.json() ).then( data => {setCollectorOptions(data.collectorList)});

		if(id != 0){
        	fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/view/${id}`).then( res => res.json() ).then( data => {setJob(data.job)});
		}
    },[]);

	const [job, setJob] = useState('');
	const [logOptions, setlogOptions] = useState('');
	const [sourceOptions, setSourceOptions] = useState('');
	const [collectorOptions, setCollectorOptions] = useState('');
	const [message, setMessage] = useState({color: null, text : null});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const radios = [
		{ name: 'Yes', value: true, prop: 'success' },
		{ name: 'No', value: false, prop: 'danger' },
	  ];

	const handleOnChange = (prop, value) => {
		setJob(prevState=>({...prevState, [prop]: value}))	
	}

	const handleOnSelect = (prop, value) => {
		if(value === 0){
			setJob(prevState=>({...prevState, [prop]: null}))	
		}else{
			setJob(prevState=>({...prevState, [prop]: value}))	
		}
	}

	const createLogOptions = () =>{
		if(logOptions){
			return logOptions.map(ele => (
				<option key={ele._id} value={ele._id}>{ele.logName}</option>
			));
		}
	}

	const createSourceOptions = () =>{
		if(sourceOptions){
			return sourceOptions.map(ele => (
				<option key={ele._id} value={ele._id}>{ele.sourceName}</option>
			));
		}
	}

	const createCollectorOptions = () =>{
		if(collectorOptions){
			return collectorOptions.map(ele => (
				<option key={ele._id} value={ele._id} >{ele.collectorName}</option>
			));
		}
	}

	const saveJob = () => {
		setIsLoading(true);

		const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(job)
        };

		if(job._id){
			fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/update`, requestOptions).then( res => res.json() ).then( data => handleData(data));
		}else{
			fetch(`${process.env.REACT_APP_BACKEND_URL}/jobs/save`, requestOptions).then( res => res.json() ).then( data => handleData(data));
		}
	}

	const handleData = (data) => {
		if(data.job){
			setMessage(prev => {prev.color = 'green'; prev.text = data.message; return prev;});
			navigate('/jobs');
		}else{
			setMessage(prev => {prev.color = 'red'; prev.text = data.message; return prev;})
		}
		setIsLoading(false);
	}

	const displaySourceTable = (id) => {
		if(id){
			const selectedSource = sourceOptions.find(ele => ele._id === id);
			return (selectedSource && <table className = "table table-striped table-bordered">
			<thead className = "table-dark">
				<tr>
					<th> Log Source Name</th>
					<th> Log Source From Ip </th>
					<th> Log Source To Ip </th>
				</tr>
			</thead>
			
			<tbody>
				<tr >
					<td >{selectedSource.sourceName}</td>
					<td >{selectedSource.fromIP}</td>
					<td >{selectedSource.toIP}</td>
				</tr>
			</tbody>
		
		</table>)
		}
	}

	const displayCollectorTable = (id) => {
		if(id){
			const selectedCollector = collectorOptions.find(ele => ele._id === id);
			return (selectedCollector && <table className = "table table-striped table-bordered">
			<thead className = "table-dark">
				<tr>
					<th> Log Collector Name</th>
					<th> Log Collector Ip </th>
					<th> Log Collector Port </th>
				</tr>
			</thead>
			
			<tbody>
				<tr >
					<td >{selectedCollector.collectorName}</td>
					<td >{selectedCollector.collectorIP}</td>
					<td >{selectedCollector.collectorPort}</td>
				</tr>
			</tbody>
		
		</table>)
		}
	}

    return (
        <div className="col-sm-9">
		<div className = "row">
			<div className ="col-lg-6 col-md-6 col-sm-6 container justify-content-center card">
				<h2 className = "text-center"> Create New Jobs </h2>
				<div className = "card-body">
						<div className ="form-group">
							<label> Job Name </label>
							<input
							type = "text"
							name = "name"
							value={job.jobName}
							onChange={e => handleOnChange('jobName', e.target.value)}
							className = "form-control"
							placeholder="Enter Job Name" 
							/>
						</div>
						
						
						<div className ="form-group">
							<label> Log Source Name </label><br/>
							
							<select className="form-select" 
							name="logSourceId"
							onChange={e => handleOnSelect('logId', e.target.value)} >
							    <option value={0}>-- Select Log Type --</option>
								{logOptions && createLogOptions()}
							</select>
							
						</div>
						
						<div className ="form-group">
							<label> Frequency(in Minutes) </label>
							<input
							type = "text"
							name = "frequency"
							value={job.frequency}
							onChange={e => handleOnChange('frequency', e.target.value)}
							className = "form-control"
							placeholder="Enter Frequency" 
							/>
						</div>
						
						
						<div className ="form-group">
							<label> Volume(MB) </label>
							<input
							type = "text"
							name = "volume"
							value={job.volume}
							onChange={e => handleOnChange('volume', e.target.value)}
							className = "form-control"
							placeholder="Enter Volume" 
							/>
						</div>
						
						<div className="form-group"><label for="date">Schedule</label></div>
						<ButtonGroup>
							{radios.map((radio, idx) => (
							<ToggleButton
								key={idx}
								id={`radio-${idx}`}
								type="radio"
								variant={radio.value ? 'outline-success' : 'outline-danger'}
								name="radio"
								value={radio.value}
								checked={job.schedule === radio.value}
								onChange={(e) => handleOnChange('schedule',e.currentTarget.value)}
							>
								{radio.name}
							</ToggleButton>
							))}
						</ButtonGroup>
						
						<div className="form-group">
							<label for="date">Date:</label>
							
         						<input name="scheculedDate"   type='date' className="form-control" value={job.date}
							onChange={e => handleOnChange('date', e.target.value)} />
      						
							</div>
							<div className="form-group">
							<label for="date">Time:</label>
							
         						<input name="scheduledTime" type='time' className="form-control" value={job.time}
							onChange={e => handleOnChange('time', e.target.value)} />
      						
							</div>
				
				</div>

                <div className ="container">
								<div className ="form-group">
									<label> Source IP </label><br/>
									<select className="form-select" 
									onChange={e => handleOnSelect('sourceId', e.target.value)} >
										<option value={0}>-- Select Source --</option>
										{sourceOptions && createSourceOptions()}
									</select>		
								</div>

								<br/>
								{job.sourceId && displaySourceTable(job.sourceId)}
								
							</div>
				
				
				
							<div className ="container">
							<div className ="form-group">
									<label> Collector IP </label><br/>
									<select className="form-select" 
									onChange={e => {handleOnSelect('collectorId', e.target.value)}} >
										<option value={0}>-- Select Collector --</option>
										{collectorOptions && createCollectorOptions()}
									</select>		
								</div>
								<br/>
								{
									job.collectorId && displayCollectorTable(job.collectorId)
								}
							</div>

						<div className = "box-footer">
							<button className = "btn btn-primary" onClick={saveJob}>
								Submit
							</button>
							<button className="btn btn-outline-warning" >Back</button>
						</div>

			</div>
		</div>
	</div>
    );
}

export default JobDetails;