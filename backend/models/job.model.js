const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    jobName : String,
    logId : mongoose.Schema.ObjectId,
    duration : Number,
    volume :  Number,
    date : Date,
    sourceId : mongoose.Schema.ObjectId,
    collectorId : mongoose.Schema.ObjectId,
    status : String,
    progress : Number
},
{
    timestamps: true
});

const JobModel = mongoose.model('Job', JobSchema);

module.exports = JobModel;