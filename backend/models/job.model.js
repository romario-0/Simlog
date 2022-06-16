const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    jobName : String,
    logSourceID : String,
    frequency : String,
    volume :  String,
    schedule : Boolean,
    date : Date,
    time : String,
    sourceIP : String,
    collectorIP : String
},
{
    timestamps: true
});

const JobModel = mongoose.model('Job', JobSchema);

module.exports = JobModel;