const mongoose = require('mongoose');

const SimulationSchema = mongoose.Schema({
    simulationName : String,
    date : Date,
    startTime: Date,
    endTime: Date,
    status: String,
    jobs: [{
        logId : mongoose.Schema.ObjectId,
        duration : Number,
        volume :  Number,
        sourceId : mongoose.Schema.ObjectId,
        collectorId : mongoose.Schema.ObjectId,
        progress: Number,
        createdAt: Date,
        updatedAt: Date,
}],
    createdBy : mongoose.Schema.ObjectId,
    updatedBy : mongoose.Schema.ObjectId
},
{
    timestamps: true
});

const SimulationModel = mongoose.model('Simulation', SimulationSchema);

module.exports = SimulationModel;