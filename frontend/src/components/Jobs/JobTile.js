const JobTile = ({job, removeJob}) => {
    return (
        <div>
            <div>{job.jobName}</div>
            <div>{job.date}</div>
            <div>{job.status}</div>
            <div>{job.duration}</div>
            <div>{job.volume}</div>
            <div>{job.progress}</div>
            <div><button onClick={() => removeJob(job._id)}>x</button></div>
        </div>
    )
}

export default JobTile;