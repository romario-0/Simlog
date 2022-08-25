const LogModel = require('../models/log.model');

async function checkLogDependency(objectId) {
    const query = {};
    query.logTypeId = objectId;
    const logs = await LogModel.find(query);
    return logs.length > 0;
}

module.exports = { checkLogDependency }