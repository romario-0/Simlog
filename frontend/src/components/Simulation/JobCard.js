import { useState } from "react";

const JobCard = ({ job, updateJob, logOptions, sourceOptions, collectorOptions, validate }) => {

  const emptyError = { logId: '', duration: '', volume: '', sourceId: '', collectorId: '' };
  const [formErrors, setFormErrors] = useState(emptyError);

  const createLogOptions = () => {
    if (logOptions) {
      return logOptions.map((ele) => (
        <option selected={ele._id === job.logId} key={ele._id} value={ele._id}>
          {ele.logName}
        </option>
      ));
    }
  };

  const createSourceOptions = () => {
    if (sourceOptions) {
      return sourceOptions.map((ele) => (
        <option
          key={ele._id}
          selected={ele._id === job.sourceId}
          value={ele._id}
        >
          {ele.sourceName + " -> " + ele.fromIP + " - " + ele.toIP}
        </option>
      ));
    }
  };

  const createCollectorOptions = () => {
    if (collectorOptions) {
      return collectorOptions.map((ele) => (
        <option
          key={ele._id}
          selected={ele._id === job.collectorId}
          value={ele._id}
        >
          {ele.collectorName +
            " -> " +
            ele.collectorIP +
            ":" +
            ele.collectorPort}
        </option>
      ));
    }
  };

  const validateForm = (newJob) => {
    let error = { ...emptyError };
    let flag = true;
    if (!newJob.logId || Number(newJob.logId) === 0) {
      error.logId = "Select a log";
      flag = false;
    }
    if (!newJob.duration || !Number(newJob.duration) || newJob.duration <= 0) {
      error.duration = "Invalid duration";
      flag = false;
    }
    if (!newJob.volume || !Number(newJob.volume) || newJob.volume <= 0) {
      error.volume = "Invalid volume";
      flag = false;
    }
    if (!newJob.sourceId || Number(newJob.sourceId) === 0) {
      error.sourceId = "Select a Source IP range";
      flag = false;
    }
    if (!newJob.collectorId || Number(newJob.collectorId) === 0) {
      error.collectorId = "Select a Collector IP";
      flag = false;
    }
    validate(!flag);
  };

  const handleOnChange = (attr, value) => {
    let newJob = { ...job };
    newJob[attr] = value;
    validateForm(newJob);
    updateJob(newJob);
  }

  return (
    <div className="simjobcard row">
      <div className="form-group col-sm-2">
        <select
          className="form-select"
          name="logSourceId"
          disabled={(job.status && job.status !== 'New')}
          onChange={(e) => handleOnChange("logId", e.target.value)}
        ><option value={0}>-- Select Log Type --</option>
          {logOptions && createLogOptions()}
        </select>
      </div>

      <div className="form-group col-sm-2">
        <input
          type="text"
          name="duration"
          value={job.duration}
          onChange={(e) => handleOnChange("duration", e.target.value)}
          className="form-control"
          placeholder="Enter Duration"
          disabled={(job.status && job.status !== 'New')}
        />
      </div>

      <div className="form-group col-sm-2">
        <input
          type="text"
          name="volume"
          value={job.volume}
          onChange={(e) => handleOnChange("volume", e.target.value)}
          className="form-control"
          placeholder="Enter Volume"
          disabled={(job.status && job.status !== 'New')}
        />
      </div>

      <div className="form-group col-sm-3">
        <select
          className="form-select"
          name="sourceId"
          disabled={(job.status && job.status !== 'New')}
          onChange={(e) => handleOnChange("sourceId", e.target.value)}
        ><option value={0}>-- Select Source Type --</option>
          {sourceOptions && createSourceOptions()}
        </select>
      </div>

      <div className="form-group col-sm-3">
        <select
          className="form-select"
          name="collectorId"
          disabled={(job.status && job.status !== 'New')}
          onChange={(e) => handleOnChange("collectorId", e.target.value)}
        ><option value={0}>-- Select Collector Type --</option>
          {collectorOptions && createCollectorOptions()}
        </select>
      </div>
    </div>
  );
}

export default JobCard;