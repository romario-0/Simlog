import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogList from "./LogList";

const LogUpload = () => {

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes`).then( res => res.json() ).then( data => {setTypeOptions(data.logTypeList)});
		fetchLogList();
	},[]);

	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState('');
	const [logType, setLogType] = useState('');
	const [message, setMessage] = useState({color: null, text : null});
	const [isUploading, setIsUploading] = useState(false);
	const [typeOptions, setTypeOptions] = useState([]);
	const [logList, setLogList] = useState([]);
	const navigate = useNavigate();

	const uploadLog = () => {
		setIsUploading(true);
		const data = new FormData();
        data.append('upload_file', file );
        data.append('logName', fileName);
        data.append('logTypeId', logType);

		const requestOptions = {
            method: 'POST',
            //headers: { 'Content-Type': 'multipart/form-data' },
            body: data
        };

        fetch(`${process.env.REACT_APP_BACKEND_URL}/logs/upload`, requestOptions).then( res => res.json() ).then( data => handleUpload(data));
	}

	const handleUpload = (data) => {
		if(data.log){
			setMessage(prev => {prev.color = 'green'; prev.text = data.message; return prev;});
			fetchLogList();
			resetForm();
		}else{
			setMessage(prev => {prev.color = 'red'; prev.text = data.message; return prev;})
		}
		setIsUploading(false);
	}

	const createLogTypeOptions = () =>{
		if(typeOptions){
			return typeOptions.map(ele => (
				<option key={ele._id} value={ele._id}>{ele.logTypeName}</option>
			));
		}
	}

	const fetchLogList = () => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/logs`).then( res => res.json() ).then( data => {setLogList(data.logList)});
	}

	const resetForm = () => {
		setFile(null);
		setFileName('');
		setLogType('');
	}

    return (
		<div>
        <div className ="col-lg-6 col-md-6 col-sm-6 container justify-content-center card">
				<h2 className = "text-left"> Create New Log Library </h2>
				<div className = "card-body">
					<form >
						<div className ="form-group">
							<label> Log Upload Name </label>
							<input
							type = "text"
							name = "name"
							value={fileName}
							onChange={(e) =>{setFileName(e.target.value)}}
							className = "form-control"
							placeholder="Enter Log Source Name"
							/>
						</div>
						<div className ="form-group">
							<label> Log Upload Type </label>
							<select className = "form-control" onChange={(e) => setLogType(e.target.value)}>
								<option>-- Select Log Type --</option>
								{typeOptions && createLogTypeOptions()}
							</select>
						</div>
						
						<div className ="form-group">
							<label> Upload File </label>
							<input
							type = "file"
							name = "file_l"
							onChange = {(e) => {setFile(e.target.files[0]);setIsUploading(false);}}
							className = "form-control"
							placeholder="" 
							/>
						</div>
						
						{ message.text &&
							<div style={{color:message.color}}>{message.text}</div>
						}
						
						<div className = "box-footer">
							<button onClick={uploadLog} className = "btn btn-primary" disabled={isUploading}>
								Submit
							</button>
						</div>
					</form>
				
				</div>
			</div>
			<LogList logList={logList} />
			</div>
    );
}

export default LogUpload;