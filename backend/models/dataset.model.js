const mongoose = require('mongoose');

const DatasetSchema = mongoose.Schema({
    datasetName: String,
    datasetCollection: String,
    delimiter: String
});

const DatasetModel = mongoose.model('Dataset', DatasetSchema);

module.exports = DatasetModel;