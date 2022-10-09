const mongoose = require('mongoose');

const JobSchema = mongoose.Schema({
    // jobName : String,
    logId: mongoose.Schema.ObjectId,
    duration: Number,
    volume: Number,
    sourceId: mongoose.Schema.ObjectId,
    collectorId: mongoose.Schema.ObjectId,
    status: { type: String, default: 'New' },
    progress: Number,
    createdBy: mongoose.Schema.ObjectId,
    updatedBy: mongoose.Schema.ObjectId
},
    {
        timestamps: true
    });

const JobModel = mongoose.model('Job', JobSchema);

module.exports = JobModel;