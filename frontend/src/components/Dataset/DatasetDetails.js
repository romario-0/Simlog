import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createDataset, updateDataset } from "../../services/dataset.service";
import DatasetList from "./DatasetList";

const DatasetDetails = () => {
	const { id } = useParams();
	useEffect(() => {
		if (id !== 0) {
			fetch(`${process.env.REACT_APP_BACKEND_URL}/datasets/view/${id}`).then(res => res.json()).then(data => { setDatasetValue(data.dataset) });
		} else {
			resetForm();
		}
		fetch(`${process.env.REACT_APP_BACKEND_URL}/datasets`).then(res => res.json()).then(data => { setDatasetList(data.datasetList) });
		/* eslint-disable */
	}, [id]);

	const [datasetId, setDatasetId] = useState('');
	const [datasetName, setDatasetName] = useState('');
	const [delimiter, setDelimiter] = useState(0);
	const [datasetCollection, setDatasetCollection] = useState('');

	const [message, setMessage] = useState({ color: null, text: null });
	const [isLoading, setIsLoading] = useState(false);
	const [datasetList, setDatasetList] = useState([]);

	const navigate = useNavigate();

	const setDatasetValue = (data) => {
		setDatasetName(data.datasetName);
		setDelimiter(data.delimiter);
		setDatasetCollection(data.datasetCollection);

		setDatasetId(data._id);
		setIsLoading(false)
	}

	const saveDataset = async () => {
		if (validateForm()) {
			setIsLoading(true);

			const datasetObj = {
				datasetName,
				delimiter,
				datasetCollection,
			}

			if (datasetId) {
				datasetObj.datasetId = datasetId;
			}

			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(datasetObj)
			};

			if (datasetId) {
				handleData(await updateDataset(requestOptions));
			} else {
				handleData(await createDataset(requestOptions));
			}
		}
	}

	const handleData = (data) => {
		if (data.dataset) {
			reloadList();
			resetForm();
		}
		setIsLoading(false);
	}

	const resetForm = () => {
		setDatasetName('');
		setDelimiter(0);
		setDatasetCollection('');

		setDatasetId(0);
		setMessage({ color: null, text: null });
		navigate('/dataset/0');
	}

	const validateForm = () => {
		if (!datasetName.trim()) {
			setMessage({ color: 'red', text: 'Enter dataset name' });
			return false;
		}
		if (datasetCollection.length === 0) {
			setMessage({ color: 'red', text: 'Invalid dataset collection' });
			return false;
		}
		return true;
	}

	const reloadList = () => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/datasets`).then(res => res.json()).then(data => { setDatasetList(data.datasetList) });
	}

	return (
		<div>
			<div className="col-md-9 mx-auto">
				<div className="row col-lg-12 col-md-12 col-sm-6 card bg-light">
					<h4 className="card-title mb-3"> Create New Dataset </h4>
					<div className="card-body col row  align-items-end text-left py-0">
						<div className="form-group col-sm-3">
							<label> Dataset Name </label>
							<input
								type="text"
								name="name"
								value={datasetName}
								onChange={e => setDatasetName(e.target.value)}
								className="form-control"
								placeholder="Enter Dataset Name"
								disabled={datasetId}
							/>
						</div>

						<div className="form-group col-sm-3">
							<label> Delimiter </label>
							<select className="form-control" onChange={(e) => setDelimiter(e.target.value)}>
								<option value={0} selected={delimiter === 0}>-- Select Delimiter --</option>
								<option value={','} selected={delimiter === ','}>,</option>
								<option value={';'} selected={delimiter === ';'}>;</option>
								<option value={' '} selected={delimiter === ' '}>{'<space>'}</option>
							</select>
						</div>

						<div className="form-group col-sm-3">
							<label> Dataset Collections </label>
							<textarea style={{ height: "100px" }}
								name="datasetCollection"
								value={datasetCollection}
								onChange={e => setDatasetCollection(e.target.value)}
								className="form-control"
								placeholder="Enter Dataset Collections"
							/>
						</div>

						<div className=" form-group col-sm-3 row">
							<div className="col-sm-4">
								<button className="btn btn-primary" onClick={saveDataset} disabled={isLoading}>
									Submit
								</button>
							</div>
							<div className="col-sm-4">
								<button className="btn btn-outline-warning" onClick={() => { resetForm(); navigate('/dataset/0') }}>Cancel</button>
							</div>
						</div>

					</div>
					{message.text &&
						<div style={{ color: message.color }}>{message.text}</div>
					}

				</div>
			</div>
			<div className="container px-0 mt-1">
				<DatasetList datasetList={datasetList} reload={reloadList} />
			</div>
		</div>
	);
}

export default DatasetDetails;