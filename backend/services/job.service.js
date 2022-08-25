const JobModel = require('../models/job.model');

function getModuleField(module){
    switch(module.toLowerCase()){
        case 'collector' : return 'collectorId';
        case 'source' : return 'sourceId';
        case 'log' : return 'logId';
    }
}

async function checkJobDependency(module, objectId){
    const moduleId = getModuleField(module);
    const query = {};
    query[moduleId] = objectId;
    const jobs = await JobModel.find( query);
    return jobs.length > 0;
}

module.exports = { checkJobDependency }