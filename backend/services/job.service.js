const JobModel = require('../models/job.model');

const states = {
    NEW: "New",
    PROCESSING: "Processing",
    RUNNING: "Running",
    CANCELLED: "Cancelled",
    STOPPED: "Stopped",
    COMPLETED: "Completed"
    //New, Processing, Running, Cancelled, Stopped
}

function getModuleField(module) {
    switch (module.toLowerCase()) {
        case 'collector': return 'collectorId';
        case 'source': return 'sourceId';
        case 'log': return 'logId';
    }
}

async function checkJobDependency(module, objectId) {
    const moduleId = getModuleField(module);
    const query = {};
    query[moduleId] = objectId;
    const jobs = await JobModel.find(query);
    return jobs.length > 0;
}

async function upsertJobs(jobs) {
    const bulkResult = await JobModel.bulkWrite(jobs.map(doc => {
        if (doc._id) {
            return ({
                updateOne: {
                    filter: { _id: doc._id },
                    update: doc,
                    upsert: true,
                }
            })
        } else {
            return ({
                insertOne: {
                    document: doc,
                }
            })
        }
        // else {
        //     return ({
        //         deleteOne: {
        //             filter: { _id: doc }
        //           }
        //     })
        // }
    }))

    return bulkResult;
}

function getJobList(jobIds) {
    JobModel.find({ _id: { $in: jobIds } }, function (jobList, err) {
        if (!err) {
            return jobList;
        }
        return [];
    })
}

async function bulkDeleteJobs(jobs) {
    const jobResult = await JobModel.bulkWrite(jobs.map(doc => {
        if (doc) {
            return ({
                deleteOne: {
                    filter: { _id: doc }
                }
            })
        }
    }))

    return jobResult;
}

// async function getSimulationJobs(simulationId){
//     JobModel. 
// }

module.exports = { checkJobDependency, upsertJobs, bulkDeleteJobs }