const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    logName : String,
    logTypeId : String,
    logLink : String,
    logSize :  String,
    //uploadedBy : mongoose.SchemaTypes.ObjectId,
},
{
    timestamps: true
});

const LogModel = mongoose.model('Log', LogSchema);

module.exports = LogModel;