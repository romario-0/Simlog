import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createLogType, updateLogType } from "../../services/logType.service";
import LogTypeList from "./LogTypeList";

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const capDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const LogTypeDetails = () => {
	const { id } = useParams();
	useEffect(() => {
		if (Number(id) !== 0) {
			fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes/view/${id}`).then(res => res.json()).then(data => { setLogTypeValue(data.logType) });
		}
		fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes`).then(res => res.json()).then(data => { setLogTypeList(data.logTypeList) });
		fetch(`${process.env.REACT_APP_BACKEND_URL}/datasets`).then(res => res.json()).then(data => { setDatasetList(data.datasetList) });
	}, [id]);

	const [logTypeId, setLogTypeId] = useState('');
	const [typeName, setTypeName] = useState('');
	const [patternType, setPatternType] = useState('');
	const [pattern, setPattern] = useState([{ fieldKey: '', pyFormat: '', fieldFormat: 0 }]);
	const [testPattern, setTestPattern] = useState('');
	const [output, setOutput] = useState('');
	const [message, setMessage] = useState({ color: null, text: null });
	const [isLoading, setIsLoading] = useState(false);
	const [logTypeList, setLogTypeList] = useState([]);
	const [datasetList, setDatasetList] = useState([]);
	const navigate = useNavigate();

	const setLogTypeValue = (data) => {
		setTypeName(data.logTypeName);
		setPatternType(data.patternType);
		setPattern(data.pattern);
		setLogTypeId(data._id);
		setIsLoading(false)
	}

	const saveLogType = async () => {
		if (validateForm()) {
			setIsLoading(true);

			const logTypeObj = {
				logTypeName: typeName,
				patternType: patternType,
				pattern: pattern
			}

			if (logTypeId) {
				logTypeObj.logTypeId = logTypeId;
			}
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(logTypeObj)
			};

			if (logTypeId) {
				handleData(await updateLogType(requestOptions));
			} else {
				handleData(await createLogType(requestOptions));
			}
		}
	}

	const handleData = (data) => {
		if (data.logType) {
			reloadList();
			resetForm();
		}
		setIsLoading(false);
	}

	const validateForm = () => {
		if (!typeName.trim()) {
			setMessage({ color: 'red', text: 'Enter Log Type Name' });
			return false;
		}
		if (!patternType || Number(patternType) === 0) {
			setMessage({ color: 'red', text: 'Select a Log Type' });
			return false;
		}
		if (!pattern[0].fieldKey.trim() || !pattern[0].pyFormat.trim()) {
			setMessage({ color: 'red', text: 'Add atleast one pattern' });
			return false;
		}
		return true;
	}

	const resetForm = () => {
		setLogTypeId(0);
		setTypeName('');
		setPattern([{ fieldKey: '', pyFormat: '', fieldFormat: 0 }]);
		setPatternType('');
		setMessage({ color: null, text: null });
		setTestPattern('');
		setOutput('');
		navigate('/logTypes/0');
	}

	const addFields = () => {
		const data = [...pattern];
		data.push({ fieldKey: '', pyFormat: '', fieldFormat: 0 });
		setPattern(data);
	}

	const setPatternData = (idx, param, value) => {
		const data = [...pattern];
		data[idx][param] = value;
		setPattern(data);
	}

	const createDatasetOptions = (selected) => {
		if (datasetList) {
			return datasetList.map((ele) => (
				<option selected={ele._id === selected} key={ele._id} value={ele._id}>
					{ele.datasetName}
				</option>
			));
		}
	};

	const createFieldElements = () => {
		return pattern.map((ele, idx) => (
			<div className="row">
				<div className="grabdatepattern row col-sm-12 d-flex align-items-end " key={`pattern_field_${idx}`}>
					<div className="form-group col-sm-2 mb-0">
						{idx === 0 && <button type="button" className="btnheight btn btn-primary" onClick={addFields} >
							Add
						</button>}
					</div>
					<div className="form-group col-sm-4 mb-0">

						<input
							type="text"
							value={ele.fieldKey}
							onChange={(e) => setPatternData(idx, 'fieldKey', e.target.value)}
							className="form-control"
							placeholder="Enter Grab Pattern"
						/>
					</div>
					<div className="form-group col-sm-4 mb-0">

						<select className="form-control" onChange={(e) => setPatternData(idx, 'fieldFormat', e.target.value)}>
							<option value={0} selected={ele.fieldFormat === 0}>-- Select Log Type --</option>
							<option value={'static'} selected={ele.fieldFormat === 'static'}>Static Text</option>
							<option value={'dataset'} selected={ele.fieldFormat === 'dataset'}>Random Dataset</option>
							<option value={'date'} selected={ele.fieldFormat === 'date'}>Date</option>
						</select>
					</div>

					<div className="form-group col-sm-4 mb-0">
						{
							pattern[idx]?.fieldFormat === 'dataset' ?
								(
									<select className="form-control" onChange={(e) => setPatternData(idx, 'pyFormat', e.target.value)}>
										<option value={0}>-- Select Log Type --</option>
										{createDatasetOptions(ele.pyFormat)}
									</select>
								) :
								<input
									type="text"
									value={ele.pyFormat}
									onChange={(e) => setPatternData(idx, 'pyFormat', e.target.value)}
									className="form-control"
									placeholder="Enter Date Pattern"
								/>
						}
					</div>
					<div className="form-group col-sm-2 mb-0">
						{
							pattern.length > 1 && <button type="button" className=" btnheight btn btn-primary" onClick={(e) => removeFields(idx)} >
								Del
							</button>
						}
					</div>


				</div>
			</div>
		));
	}

	const removeFields = (index) => {
		const data = [...pattern];
		data.splice(index, 1);
		setPattern(data);
	}

	const testRegex = () => {

		let testData = '';
		switch (patternType.toUpperCase()) {
			case 'PLAIN': testData = testPattern; break;
			case 'CSV': testData = testPattern.split(','); break;
			case 'JSON': testData = JSON.parse(testPattern); break;
			default: setMessage({ color: 'red', text: 'Select a log type' });
		}
		for (let ele of pattern) {
			testData = processOutputData(patternType, ele.pyFormat, ele.fieldKey, testData, ele.fieldFormat);
		}
		switch (patternType.toUpperCase()) {
			case 'CSV': testData = testData.toString(); break;
			case 'JSON': testData = JSON.stringify(testData); break;
			default: break;
		}

		setOutput(testData);
	}

	const processOutputData = (patternType, datePattern, grabPattern, testData, dataType) => {

		let dateData = ''

		if (dataType === 'dataset') {
			dateData = calculateDataset(datePattern);
		} else if (dataType === 'date') {
			dateData = calculateDate(datePattern);
		} else {
			dateData = datePattern;
		}


		switch (patternType.toUpperCase()) {
			case 'PLAIN': return calculateForPlain(dateData, grabPattern, testData);
			case 'CSV': return calculateForCSV(dateData, grabPattern, testData);
			case 'JSON': return calculateForJson(dateData, grabPattern, testData);
			default: return testData;
		}
	}

	const calculateDate = (datePattern) => {
		const regPatterns = ((datePattern || '').match(/%[a-zA-Z]/g) || []);
		let dateOutput = datePattern;
		for (let reg of regPatterns) {
			dateOutput = dateOutput.replace(reg, replaceData(reg));
		}
		return dateOutput;
	}

	const calculateDataset = (datasetType) => {
		const dataset = datasetList.find(set => set._id === datasetType);
		let randomElement = '';
		if (dataset) {
			const array = dataset.datasetCollection.split(dataset.delimiter)
			randomElement = array[Math.floor(Math.random() * array.length)];
		}
		return randomElement;
	}

	const calculateForPlain = (dateOutput, grabPattern, testData) => {
		try {
			const grabRegex = new RegExp(grabPattern)
			const outputData = testData.replace(grabRegex, dateOutput);
			return outputData;
		} catch (error) {
			return testData;
		}
	}

	const calculateForCSV = (dateOutput, grabPattern, csvArray) => {
		try {
			const grabIndex = Number(grabPattern) - 1;
			csvArray[grabIndex] = dateOutput;
			return csvArray;
		} catch (error) {
			return csvArray;
		}
	}

	const calculateForJson = (dateOutput, grabPattern, test) => {
		try {
			const traverseArr = grabPattern.split('.');
			setDeep(test, traverseArr, dateOutput);
			return test;
		} catch (error) {
			setMessage(prev => { prev.color = 'red'; prev.text = 'Grab format not matching'; return prev; });
			return test;
		}
	}

	function setDeep(obj, path, value, setrecursively = false) {
		path.reduce((a, b, level) => {
			if (setrecursively && typeof a[b] === "undefined" && level !== path.length - 1) {
				a[b] = {};
				return a[b];
			}

			if (level === path.length - 1) {
				a[b] = value;
				return value;
			}
			return a[b];
		}, obj);
	}

	const replaceData = (pattern) => {
		const date = new Date();
		switch (pattern) {
			case '%y': return `${date.getFullYear()}`.slice(-2);
			case '%Y': return date.getFullYear();
			case '%b': return date.toLocaleString('default', { month: 'short' });
			case '%B': return date.toLocaleString('default', { month: 'long' });
			case '%m': return `0${date.getMonth() + 1}`.slice(-2);
			case '%d': return `0${date.getDate()}`.slice(-2);
			case '%H': return `0${date.getHours()}`.slice(-2);
			case '%l': return date.getHours() > 12 ? `0${Math.floor(date.getHours() - 12)}`.slice(-2) : `0${date.getHours()}`.slice(-2);
			case '%p': return date.getHours() >= 12 ? `PM` : `AM`;
			case '%M': return `0${date.getMinutes()}`.slice(-2);
			case '%S': return `0${date.getSeconds()}`.slice(-2);
			case '%a': return days[date.getDay()];
			case '%A': return capDays[date.getDay()];
			case '%w': return date.getDay();
			case '%f': return `${date.getMilliseconds()}000`;
			case '%%': return `%`;
			default: return '';
		}
	}

	const reloadList = () => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/logTypes`).then(res => res.json()).then(data => { setLogTypeList(data.logTypeList) });
	}

	return (
		<div>
			<div className="col-md-9 mx-auto">
				<div className=" row col-lg-12 col-md-12 col-sm-6 card bg-light">
					<h4 className="card-title mb-3"> Create New Log Type </h4>
					<div className="card-body col-lg-12 row  align-items-start text-left py-0">
						<div className="form-group col-sm-3 d-inline-block">
							<label> Log Type Name</label>
							<input
								type="text"
								name="name"
								value={typeName}
								onChange={(e) => setTypeName(e.target.value)}
								className="form-control"
								placeholder="Enter Log Type Name"
								disabled={logTypeId}
							/>
						</div>

						<div className="form-group col-sm-3">
							<label> Select Log Type</label>
							<select className=" form-control" onChange={(e) => setPatternType(e.target.value)}>
								<option selected value={0}>--Select Type--</option>
								<option selected={patternType === 'plain'} value={'plain'}>Plain</option>
								<option selected={patternType === 'json'} value={'json'}>Json</option>
								<option selected={patternType === 'csv'} value={'csv'}>CSV</option>
							</select>
						</div>
						<div className="grab&grok form-group col-sm-6 p-0">
							<div className="header form-group col ">
								<div className=" form-group">
									Grab Pattern
								</div>
								<div className=" form-group">
									Date Pattern
								</div>
							</div>
							<div className="form-group col">
								{
									pattern.length && createFieldElements()
								}
							</div>
						</div>
						<div className="form-group col-sm-3">
							<label> Test Data </label>
							<textarea style={{ height: "100px" }}
								value={testPattern}
								onChange={(e) => setTestPattern(e.target.value)}
								className="form-control"
								placeholder="Enter Test Data"
							/>
						</div>

						<div className="form-group col-sm-3">
							<label> Output </label>
							<textarea style={{ height: "100px" }}
								value={output}
								className="form-control"
								disabled
							/>
						</div>

						<div className=" form-group col-sm-2 row">

						</div>
						<div className=" form-group col-sm-1 row mt-3">
							<button className="form-group btnheight btn btn-primary" onClick={testRegex} >
								Test
							</button>
						</div>


						<div className=" box-footer form-group col-sm-3 row mt-3">
							<div className=" col-sm-6 pl-5" >

								<button type="button" className="btn btn-primary " onClick={saveLogType} disabled={isLoading}>
									Submit
								</button>
							</div>
							<div className=" col-sm-6" >
								<button className="btn btn-outline-warning" onClick={() => { resetForm(); navigate('/logTypes/0'); }}>Cancel</button>
							</div>
						</div>
						{message.text &&
							<div style={{ color: message.color }}>{message.text}</div>
						}

					</div>
				</div>
				<div className="container px-0 mt-1">
					<LogTypeList logTypeList={logTypeList} reload={reloadList} />
				</div>
			</div>
		</div>
	);
}

export default LogTypeDetails;
