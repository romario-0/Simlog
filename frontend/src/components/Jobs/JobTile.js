const JobTile = ({job, removeJob}) => {
    return (
        <div className="container col-sm-7 jobtile simjoblist">
            <div>{job.jobName}</div>
            <div>{job.date}</div>
            <div>{job.status}</div>
            <div>{job.duration}</div>
            <div>{job.volume}</div>
            <div>{job.progress}</div>
            <div><button className="btn-outline-warning"onClick={() => removeJob(job._id)}> x </button></div>
        </div>
    )
}

export default JobTile;