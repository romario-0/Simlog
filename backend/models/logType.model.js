const mongoose = require('mongoose');

const LogTypeSchema = mongoose.Schema({
    logTypeName : String,
    grokPattern : String
});

const LogTypeModel = mongoose.model('LogType', LogTypeSchema);

module.exports = LogTypeModel;