import { useEffect, useRef, useState } from "react";
import { createLog } from "../../services/log.service";
import LogList from "./LogList";

const LogUpload = () => {

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes`).then(res => res.json()).then(data => { setTypeOptions(data.logTypeList) });
		fetchLogList();
		/* eslint-disable */
	}, []);

	const [file, setFile] = useState(null);
	const [logName, setLogName] = useState('');
	const [logType, setLogType] = useState('');
	const [message, setMessage] = useState({ color: null, text: null });
	const [isUploading, setIsUploading] = useState(false);
	const [typeOptions, setTypeOptions] = useState([]);
	const [logList, setLogList] = useState([]);
	const inputRef = useRef(null);

	const uploadLog = async () => {
		if (validateForm()) {
			setIsUploading(true);
			const data = new FormData();
			data.append('upload_file', file);
			data.append('logName', logName.trim());
			data.append('logTypeId', logType);

			const requestOptions = {
				method: 'POST',
				//headers: { 'Content-Type': 'multipart/form-data' },
				body: data
			};
			handleUpload(await createLog(requestOptions));
			//fetch(`${process.env.REACT_APP_BACKEND_URL}/logs/upload`, requestOptions).then( res => res.json() ).then( data => handleUpload(data));
		}
	}

	const handleUpload = (data) => {
		if (data.log) {
			fetchLogList();
			resetForm();
		}
		setIsUploading(false);
	}

	const createLogTypeOptions = () => {
		if (typeOptions) {
			return typeOptions.map(ele => (
				<option key={ele._id} selected={ele._id === logType} value={ele._id}>{ele.logTypeName}</option>
			));
		}
	}

	const fetchLogList = () => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/logs`).then(res => res.json()).then(data => { setLogList(data.logList) });
	}

	const resetForm = () => {
		setFile(null);
		inputRef.current.value = null;
		setLogName('');
		setLogType(0);
		setMessage({ color: null, text: null });
	}

	const validateForm = () => {
		if (!logName.trim()) {
			setMessage({ color: 'red', text: 'Enter Log Name' });
			return false;
		}
		if (!logType) {
			setMessage({ color: 'red', text: 'Select Log Type' });
			return false;
		}
		if (!file) {
			setMessage({ color: 'red', text: 'Select a file' });
			return false;
		} else {
			const name = file.name.split('.');
			const type = name[name.length - 1];
			const size = file.size;
			if (type !== 'log') {
				setMessage({ color: 'red', text: 'Please Upload a log file' });
				return false;
			} else if (size > (10 * 1000 * 1000)) {
				setMessage({ color: 'red', text: 'File size too big' });
				return false;
			}
		}
		return true;
	}

	return (
		<div>
			<div className="col-md-9 mx-auto">
				<div className="row col-lg-12 col-md-12 col-sm-6 card bg-light">
					<h2 className="card-title mb-3"> Create New Log Library </h2>
					<div className="card-body col row  align-items-end text-left py-0">
						<div className="form-group col-sm-3">
							<label> Log Upload Name </label>
							<input
								type="text"
								name="name"
								value={logName}
								onChange={(e) => { setLogName(e.target.value) }}
								className="form-control"
								placeholder="Enter Log Source Name"
							/>
						</div>
						<div className="form-group col-sm-3">
							<label> Log Upload Type </label>
							<select className="form-control" onChange={(e) => setLogType(e.target.value)}>
								<option value={0}>-- Select Log Type --</option>
								{typeOptions && createLogTypeOptions()}
							</select>
						</div>

						<div className="form-group col-sm-3">
							<label> Upload File </label>
							<input
								type="file"
								ref={inputRef}
								onChange={(e) => { setFile(e.target.files[0]); setIsUploading(false); }}
								className="form-control"
								placeholder=""
							/>
						</div>

						<div className="form-group col-sm-3 row">
							<div className="col-sm-4">
								<button onClick={uploadLog} className="btn btn-primary" disabled={isUploading}>
									Submit
								</button>
							</div>
						
						<div className="col-sm-4">
							<button
								className="btn btn-outline-warning"
								onClick={() => {
								resetForm();
								navigate("/logLibrary/0");
								}}
								>
								Cancel
							</button>
						</div> 
						</div>
					</div>
					{message.text &&
						<div style={{ color: message.color }}>{message.text}</div>
					}
				</div>
			</div>
				<div className="container px-0">
				<LogList logList={logList} reload={fetchLogList}/>
				</div>
		</div>
	);
}

export default LogUpload;