import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SourceList from "./SourceList";
import { createSource, updateSource } from "../../services/source.service";

const SourceDetails = () => {
  const { id } = useParams();
  useEffect(() => {
    if (Number(id) !== 0) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/sources/view/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setSourceValue(data.source);
        });
    } else {
      resetForm();
    }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/sources`)
      .then((res) => res.json())
      .then((data) => {
        setSourceList(data.sourceList);
      });
    /* eslint-disable */
  }, [id]);

  const [sourceId, setSourceId] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [fromIP, setFromIP] = useState("");
  const [toIP, setToIP] = useState("");
  const [message, setMessage] = useState({ color: null, text: null });
  const [isLoading, setIsLoading] = useState(false);
  const [sourceList, setSourceList] = useState([]);
  const IP_REGEX =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const navigate = useNavigate();

  const setSourceValue = (data) => {
    setSourceName(data.sourceName);
    setFromIP(data.fromIP);
    setToIP(data.toIP);
    setSourceId(data._id);
    setIsLoading(false);
  };

  const saveSource = async () => {
    if (validateForm()) {
      setIsLoading(true);

      const sourceObj = {
        sourceName,
        fromIP,
        toIP,
      };

      if (sourceId) {
        sourceObj.sourceId = sourceId;
      }

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sourceObj),
      };

      if (sourceId) {
        handleData(await updateSource(requestOptions));
      } else {
        handleData(await createSource(requestOptions));
      }
    }
  };

  const handleData = (data) => {
    if (data.source) {
      reloadList();
      resetForm();
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setSourceName("");
    setFromIP("");
    setToIP("");
    setSourceId(0);
    setMessage({ color: null, text: null });
    navigate("/sources/0");
  };

  const validateForm = () => {
    if (!sourceName.trim()) {
      setMessage({ color: "red", text: "Enter source name" });
      return false;
    }
    if (!IP_REGEX.test(fromIP)) {
      setMessage({ color: "red", text: "Invalid From IP address" });
      return false;
    }
    if (!IP_REGEX.test(toIP)) {
      setMessage({ color: "red", text: "Invalid To IP address" });
      return false;
    }
    return true;
  };

  const reloadList = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/sources`)
      .then((res) => res.json())
      .then((data) => {
        setSourceList(data.sourceList);
      });
  };

  return (
    <div>
      <div className="col-md-9 mx-auto">
        <div className="row col-lg-12 col-md-12 col-sm-6 card bg-light">
          <h4 className="card-title mb-3"> Create Source Range </h4>
          <div className="card-body col row  align-items-end text-left py-0">
            <div className="form-group col-sm-3">
              <label>Source Name </label>
              <input
                type="text"
                name="name"
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                className="form-control"
                placeholder="Enter Source Name"
                disabled={sourceId}
              />
            </div>

            <div className="form-group col-sm-3">
              <label> From IP </label>
              <input
                type="text"
                name="firstIp"
                value={fromIP}
                onChange={(e) => setFromIP(e.target.value)}
                className="form-control"
                placeholder="Enter First Ip"
              />
            </div>

            <div className="form-group col-sm-3">
              <label> To IP </label>
              <input
                type="text"
                name="secondIp"
                value={toIP}
                onChange={(e) => setToIP(e.target.value)}
                className="form-control"
                placeholder="Enter Second Ip"
              />
            </div>
				<div className=" form-group col-sm-3 row">
				<div className="col-sm-4">
							<button
								className="btn btn-primary"
								onClick={saveSource}
								disabled={isLoading}
								>
								Submit
							</button>
					</div>
					
					<div className="col-sm-4">
							<button
								className="btn btn-outline-warning"
								onClick={() => {
								resetForm();
								navigate("/sources/0");
								}}
								>
								Cancel
							</button>
					</div>
					</div>

            {message.text && (
              <div className="text-center" style={{ color: message.color }}>{message.text}</div>
            )}
          </div>
        </div>
		</div>
		<div className="container px-0 mt-1">
	    <SourceList sourceList={sourceList} reload={reloadList} />
		</div>
    </div>
  );
};

export default SourceDetails;
