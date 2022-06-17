const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    jobName : String,
    logId : String,
    frequency : String,
    volume :  String,
    schedule : Boolean,
    date : Date,
    time : String,
    sourceId : String,
    collectorId : String
},
{
    timestamps: true
});

const JobModel = mongoose.model('Job', JobSchema);

module.exports = JobModel;