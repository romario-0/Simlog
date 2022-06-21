const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    jobName : String,
    logId : String,
    frequency : String,
    volume :  String,
    date : Date,
    sourceId : String,
    collectorId : String,
    state : String
},
{
    timestamps: true
});

const JobModel = mongoose.model('Job', JobSchema);

module.exports = JobModel;