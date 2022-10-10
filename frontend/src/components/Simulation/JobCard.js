const JobCard = ({ job, updateJob, logOptions, sourceOptions, collectorOptions }) => {

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

  const handleOnChange = (attr, value) => {
    let newJob = { ...job };
    newJob[attr] = value;
    updateJob(newJob);
  }

  return (
    <div>
      <div className="form-group">
        <select
          className="form-select"
          name="logSourceId"
          disabled={(job.status && job.status !== 'New')}
          onChange={(e) => handleOnChange("logId", e.target.value)}
        ><option value={0}>-- Select Log Type --</option>
          {logOptions && createLogOptions()}
        </select>
      </div>

      <div className="form-group">
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

      <div className="form-group">
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

      <div className="form-group">
        <select
          className="form-select"
          name="sourceId"
          disabled={(job.status && job.status !== 'New')}
          onChange={(e) => handleOnChange("sourceId", e.target.value)}
        ><option value={0}>-- Select Source Type --</option>
          {sourceOptions && createSourceOptions()}
        </select>
      </div>

      <div className="form-group">
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