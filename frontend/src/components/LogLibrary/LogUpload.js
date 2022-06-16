import { useState } from "react";

const LogUpload = () => {

	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState('');
	const [logType, setLogType] = useState('');
	const [message, setMessage] = useState({color: null, text : null});
	const [isUploading, setIsUploading] = useState(false);

	const uploadLog = () => {
		setIsUploading(true);
		const data = new FormData();
        data.append('upload_file', file );
        data.append('fileName', fileName);
        data.append('logType', logType);

		const requestOptions = {
            method: 'POST',
            //headers: { 'Content-Type': 'multipart/form-data' },
            body: data
        };

        fetch('http://localhost:8000/logs/upload', requestOptions).then( res => res.json() ).then( data => handleUpload(data));
	}

	const handleUpload = (data) => {
		if(data.log){
			setMessage(prev => {prev.color = 'green'; prev.text = data.message; return prev;});
		}else{
			setMessage(prev => {prev.color = 'red'; prev.text = data.message; return prev;})
		}
		setIsUploading(false);
	}

    return (
        <div className ="col-lg-6 col-md-6 col-sm-6 container justify-content-center card">
				<h2 className = "text-left"> Create New Log Library </h2>
				<div className = "card-body">
					<form >
						<div className ="form-group">
							<label> Log Upload Name </label>
							<input
							type = "text"
							name = "name"
							onChange={(e) =>{setFileName(e.target.value)}}
							className = "form-control"
							placeholder="Enter Log Source Name"
							/>
						</div>
						<div className ="form-group">
							<label> Log Upload Type </label>
                            <input
							type = "text"
							name = "logTypeId"
							onChange={(e) =>{setLogType(e.target.value)}}
							className = "form-control"
							placeholder="Enter Log Type"
							/>
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
							<button type="button" onClick={uploadLog} className = "btn btn-primary" disabled={isUploading}>
								Submit
							</button>
							<button type="button" className="btn btn-outline-warning">Back</button>
						</div>
					</form>
				
				</div>
			</div>
    );
}

export default LogUpload;