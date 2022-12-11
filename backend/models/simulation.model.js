const mongoose = require('mongoose');

const SimulationSchema = mongoose.Schema({
    simulationName: String,
    date: Date,
    startTime: Date,
    endTime: Date,
    nextRun: Date,
    frequency: Number,
    frequencyType: String,
    actualFrequency: Number,
    status: { type: String, default: 'NEW' },
    jobIds: [mongoose.Schema.ObjectId],
    createdBy: mongoose.Schema.ObjectId,
    updatedBy: mongoose.Schema.ObjectId
},
    {
        timestamps: true
    });

const SimulationModel = mongoose.model('Simulation', SimulationSchema);

module.exports = SimulationModel;