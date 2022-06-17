import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CollectorDetails = () => {
    useEffect(() => {
		if(id !== 0){
        	fetch(`http://localhost:8000/collectors/view/${id}`).then( res => res.json() ).then( data => {setCollectorValue(data.collector)});
		}
    },[]);
    const {id} = useParams();

	const [collectorId, setCollectorId] = useState('');
	const [typeName, setTypeName] = useState('');
	const [grokPattern, setGrokPattern] = useState('');
	const [message, setMessage] = useState({color: null, text : null});
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const setCollectorValue = (data) => {
		setTypeName(data.collectorName);
		setGrokPattern(data.grokPattern);
		setCollectorId(data._id); 
		setIsLoading(false)
	}

	const savecollector = () => {
		setIsLoading(true);

		const collectorObj = {
			collectorName :  typeName, 
			grokPattern
		}

		if(collectorId){
			collectorObj.collectorId = collectorId;
		}

		const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collectorObj)
        };

		if(collectorId){
			fetch('http://localhost:8000/collectors/update', requestOptions).then( res => res.json() ).then( data => handleData(data));
		}else{
			fetch('http://localhost:8000/collectors/save', requestOptions).then( res => res.json() ).then( data => handleData(data));
		}
	}

	const handleData = (data) => {
		if(data.collector){
			setMessage(prev => {prev.color = 'green'; prev.text = data.message; return prev;});
			navigate('/collectors');
		}else{
			setMessage(prev => {prev.color = 'red'; prev.text = data.message; return prev;})
		}
		setIsLoading(false);
	}

    return (
        <div className="col-sm-9">
		<div className = "row">
			<div className ="col-lg-6 col-md-6 col-sm-6 container justify-content-center card">
				<h2 className = "text-left"> Create New Log Collector </h2>
				<div className = "card-body">
					<form>
						<div className ="form-group">
							<label> Log Collector Name </label>
							<input
							type = "text"
							name = "name"
							className = "form-control"
							placeholder="Enter Log Collector Name" 
							/>
						</div>
						
						<div className ="form-group">
							<label> Collector IP </label>
							<input
							type = "text"
							name = "collectorIp"
							className = "form-control"
							placeholder="Enter Log Collector Ip" 
							/>
						</div>
						
						<div className ="form-group">
							<label> Collector Port </label>
							<input
							type = "text"
							name = "collectorPort"
							className = "form-control"
							placeholder="Enter Log Collector Port" 
							/>
						</div>
						
						
						
						<div className = "box-footer">
							<button className = "btn btn-primary">
								Submit
							</button>
							<button className="btn btn-outline-warning">Back</button>
						</div>
					</form>
				
				</div>
			</div>
		</div>
	</div>
    );
}

export default CollectorDetails;