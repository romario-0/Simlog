var express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require("path");
const LogModel = require('../models/log.model');
const LogTypeModel = require('../models/logType.model');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/logs");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer(
  { storage: storage,
    fileFilter : (req, file, cb) => {
      if(file.originalname.includes('.log')){
        cb(null, true);
      }else{
        cb(null, false);
        return cb(new Error("Only log files are allowed"));
      }
    }
  }).single('upload_file');
  

/* Create image (store image data)*/
router.post('/upload', function(req, res, next){
  //req.body.data
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.send({ message : 'File type mismatch' });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.send({ message : 'File type mismatch' });
    } else{
      // Everything went fine.
      if(req.file){
        LogModelObj = new LogModel({
          logName : req.body.fileName,
          logTypeId : req.body.logTypeId,
          logLink : req.file.path,
          logSize :  req.file.size,
        });
  
        LogModelObj.save(function(err , logDetails){
          if(err){
            res.send({message:'Unable to add Object'});
          }else{
            res.send({ message : 'Log Added', log : logDetails })
          }
        });
      }else{
        res.send({ message : 'No file selected' });
      }
      
    } 
  });
});

/* Read log details */
router.get('/view/:logId', async function(req, res, next) {

    const logId = req.params.logId;
  
    const logObj = await LogModel.findById(logId);
    if(!logObj){
      res.send({message:'Unable to fetch Object'});
    }else{
      const logFullDetails = {
        _id : logObj._id,
        logName : logObj.logName,
        logTypeId : logObj.logTypeId,
        logLink : logObj.logLink,
        logSize :  logObj.logSize,
      };
      const logType = await LogTypeModel.findById(logObj.logTypeId);
      logFullDetails.logType = logType;
      res.send({message: 'Log fetched', log: logFullDetails});    
    }
  });

/* Delete Log details */
router.delete('/remove/:logId', function(req, res, next) {

    const logId = req.query.logId;
  
    LogModel.findByIdAndDelete(logId, function(err , logObj){
      if(err){
        res.send({message:'Unable to fetch Object'});
      }else{
        res.send({message: 'Log deleted', logDetails: logObj});
      }
    });
  });

  /* List all logs */
router.get('/', function(req, res, next) {

  LogModel.find(function(err , logList){
    if(err){
      res.send({message:'Unable to fetch List'});
    }else{
      res.send({message: 'Log List fetched', logList: logList});
    }
  });
});

module.exports = router;
