import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LogTypeList from "./LogTypeList";

const LogTypeDetails = () => {
	const {id} = useParams();
	useEffect(() => {
		if(id != 0){
        	fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes/view/${id}`).then( res => res.json() ).then( data => {setLogTypeValue(data.logType)});
		}
		fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes`).then( res => res.json() ).then( data => {setLogTypeList(data.logTypeList)});
    },[id]);

	const [logTypeId, setLogTypeId] = useState('');
	const [typeName, setTypeName] = useState('');
	const [grokPattern, setGrokPattern] = useState('');
	const [message, setMessage] = useState({color: null, text : null});
	const [isLoading, setIsLoading] = useState(false);
    const [logTypeList, setLogTypeList] = useState([]);
	const navigate = useNavigate();

	const setLogTypeValue = (data) => {
		setTypeName(data.logTypeName);
		setGrokPattern(data.grokPattern);
		setLogTypeId(data._id); 
		setIsLoading(false)
	}

	const saveLogType = () => {
		setIsLoading(true);

		const logTypeObj = {
			logTypeName :  typeName, 
			grokPattern
		}

		if(logTypeId){
			logTypeObj.logTypeId = logTypeId;
		}

		const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logTypeObj)
        };

		if(logTypeId){
			fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes/update`, requestOptions).then( res => res.json() ).then( data => handleData(data));
		}else{
			fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes/save`, requestOptions).then( res => res.json() ).then( data => handleData(data));
		}
	}

	const handleData = (data) => {
		if(data.logType){
			setMessage(prev => {prev.color = 'green'; prev.text = data.message; return prev;});
			fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes`).then( res => res.json() ).then( data => {setLogTypeList(data.logTypeList)});
			resetForm();
		}else{
			setMessage(prev => {prev.color = 'red'; prev.text = data.message; return prev;})
		}
		setIsLoading(false);
	}

	const resetForm = () => {
		setTypeName('');
		setGrokPattern('');
		navigate('/logTypes/0');
	}

    return (
		<div>
        <div className="col-sm-9">
		<div className = "row">
			<div className ="col-lg-6 col-md-6 col-sm-6 container justify-content-center card">
				<h2 className = "text-left"> Create New Log Type </h2>
				<div className = "card-body">
						<div className ="form-group">
							<label> Log Type Name</label>
							<input
							type = "text"
							name = "name"
							value={typeName}
							onChange = {(e) => setTypeName(e.target.value)}
							className = "form-control"
							placeholder="Enter Log Type Name"
							disabled={logTypeId} 
							/>
						</div>
						
						<div className ="form-group">
							<label> Grok Pattern </label>
							<input
							type = "text"
							name = "description"
							value={grokPattern}
							onChange = {(e) => setGrokPattern(e.target.value)}
							className = "form-control"
							placeholder="Enter Grok Pattern" 
							/>
						</div>
						
						
						
						<div className = "box-footer">
							<button type="button" className = "btn btn-primary" onClick={saveLogType} disabled={isLoading}>
								Submit
							</button>
							<button className = "btn btn-outline-warning" onClick={() => navigate('/logTypes/0')}>New</button>
						</div>
				
				</div>
			</div>
		</div>
	</div>
		<LogTypeList logTypeList={logTypeList} />
	</div>
    );
}

export default LogTypeDetails;