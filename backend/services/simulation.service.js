const SimulationModel = require('../models/simulation.model');

async function checkSimulationDependency(objectId) {
    const simulations = await SimulationModel.find({ jobIds: objectId });
    return simulations.length > 0;
}

module.exports = { checkSimulationDependency }