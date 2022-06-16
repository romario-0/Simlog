const mongoose = require('mongoose');

const LogSchema = mongoose.Schema({
    logName : String,
    logType : {
        logTypeId : String,
        logTypeName : String,
        grokPattern : String
    },
    logLink : String,
    logSize :  String,
    //uploadedBy : mongoose.SchemaTypes.ObjectId,
},
{
    timestamps: true
});

const LogModel = mongoose.model('Log', LogSchema);

module.exports = LogModel;