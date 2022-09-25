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
    let newJob = {...job};
    newJob[attr] = value;
    updateJob(newJob); 
  }

    return (
        <div>
            <div className="form-group">
                <label> Select Log </label>
                <select
                    className="form-select"
                    name="logSourceId"
                    onChange={(e) => handleOnChange("logId", e.target.value)}
                ><option value={0}>-- Select Log Type --</option>
                    {logOptions && createLogOptions()}
                </select>
            </div>

            <div className="form-group">
                <label> Duration </label>
                <input
                    type="text"
                    name="duration"
                    value={job.duration}
                    onChange={(e) => handleOnChange("duration", e.target.value)}
                    className="form-control"
                    placeholder="Enter Duration"
                />
            </div>

            <div className="form-group">
                <label> Volume </label>
                <input
                    type="text"
                    name="volume"
                    value={job.volume}
                    onChange={(e) => handleOnChange("volume", e.target.value)}
                    className="form-control"
                    placeholder="Enter Volume"
                />
            </div>

            <div className="form-group">
                <label> Select Source </label>
                <select
                    className="form-select"
                    name="sourceId"
                    onChange={(e) => handleOnChange("sourceId", e.target.value)}
                ><option value={0}>-- Select Source Type --</option>
                    {sourceOptions && createSourceOptions()}
                </select>
            </div>

            <div className="form-group">
                <label> Select Collector </label>
                <select
                    className="form-select"
                    name="collectorId"
                    onChange={(e) => handleOnChange("collectorId", e.target.value)}
                ><option value={0}>-- Select Collector Type --</option>
                    {collectorOptions && createCollectorOptions()}
                </select>
            </div>
        </div>
    );
}

export default JobCard;