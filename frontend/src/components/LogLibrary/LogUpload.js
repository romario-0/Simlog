import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLog } from "../../services/log.service";
import LogList from "./LogList";

const LogUpload = () => {

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes`).then(res => res.json()).then(data => { setTypeOptions(data.logTypeList) });
		fetchLogList();
	}, []);

	const [file, setFile] = useState(null);
	const [logName, setLogName] = useState('');
	const [logType, setLogType] = useState('');
	const [message, setMessage] = useState({ color: null, text: null });
	const [isUploading, setIsUploading] = useState(false);
	const [typeOptions, setTypeOptions] = useState([]);
	const [logList, setLogList] = useState([]);
	const inputRef = useRef(null);
	const navigate = useNavigate();

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
			<div className="col-lg-8 col-md-6 col-sm-6 container justify-content-center card">
				<h2 className="text-left"> Create New Log Library </h2>
				<div className="card-body">
					<div className="form-group">
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
					<div className="form-group">
						<label> Log Upload Type </label>
						<select className="form-control" onChange={(e) => setLogType(e.target.value)}>
							<option value={0}>-- Select Log Type --</option>
							{typeOptions && createLogTypeOptions()}
						</select>
					</div>

					<div className="form-group">
						<label> Upload File </label>
						<input
							type="file"
							ref={inputRef}
							onChange={(e) => { setFile(e.target.files[0]); setIsUploading(false); }}
							className="form-control"
							placeholder=""
						/>
					</div>



					<div className="box-footer">
						<button onClick={uploadLog} className="btn btn-primary" disabled={isUploading}>
							Submit
						</button>
					</div>
				</div>
				{message.text &&
					<div style={{ color: message.color }}>{message.text}</div>
				}
			</div>
			<LogList logList={logList} />
		</div>
	);
}

export default LogUpload;