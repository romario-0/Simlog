var express = require('express');
const router = express.Router();
const JobModel = require('../models/job.model');
const CollectorModel = require('../models/collector.model');
const SourceModel = require('../models/source.model');
const { exec } = require('child_process');

const states = {
  NEW : "NEW",
  RUNNING : "RUNNING",
  STOPPED : "STOPPED",
  COMPLETED : "COMPLETED"
} // PENDING, STOPPED

/* Create new Job*/
router.post('/save', async function(req, res, next){

    const jobObj = await JobModel.findOne({ jobName: req.body.jobName }); // checking jobName is alreday existing or not
    if (!jobObj) {
      const date = new Date(req.body.date);
        jobModelObj = new JobModel({
          jobName : req.body.jobName,
          logId : req.body.logId,
          frequency : req.body.frequency,
          volume :  req.body.volume,
          date : date,
          sourceId : req.body.sourceId,
          collectorId : req.body.collectorId,
          status : states.NEW
        });
  
        jobModelObj.save(function(err , jobDetails){
          if(err){
            res.send({message:'Unable to add Object'});
          }else{
            res.send({ message : 'Job Added', job : jobDetails })
          }
        });
      }else{
        res.send({ message : 'Job name already exists' });
      }
});

/* Update Job*/
router.post('/update', async function(req, res, next){

    const jobObj = await JobModel.findOne({ _id: req.body._id }); // checking for Job
    if (jobObj) {
      let job = req.body;
        if(job.hasOwnProperty('jobName')){
            delete job.jobName;
        }
      const jobObj = JobModel.findOneAndUpdate({  _id: req.body._id }, job, function(err, jobDetails){
            if(err){
              res.send({message:'Unable to add Object'});
            }else{
              res.send({ message : 'Job Updated', job : jobDetails });
            }
        });        
      }else{
        res.send({ message : "Job doesn't exists" });
      }
});

/* Read Job details */
router.get('/view/:jobId', async function(req, res, next) {

    const jobId = req.params.jobId;

    const jobObj = await JobModel.findById(jobId);
    if(!jobObj){
      res.send({message:'Unable to fetch Object'});
    }else{
      const jobFullDetails = {
        _id : jobObj._id,
        jobName : jobObj.jobName,
        logId : jobObj.logId,
        frequency : jobObj.frequency,
        volume :  jobObj.volume,
        schedule : jobObj.schedule,
        date : jobObj.date,
        sourceId : jobObj.sourceId,
        collectorId : jobObj.collectorId,
        status : jobObj.status
      };
      const source = await SourceModel.findById(jobObj.sourceId);
      const collector = await CollectorModel.findById(jobObj.collectorId);
      jobFullDetails.source = source;
      jobFullDetails.collector = collector;
      res.send({message: 'Job fetched', job: jobFullDetails});    
    }
  });

/* Delete Job details */
router.delete('/remove/:jobId', function(req, res, next) {

    const jobId = req.query.jobId;
  
    JobModel.findByIdAndDelete(jobId, function(err , jobObj){
      if(err){
        res.send({message:'Unable to fetch Object'});
      }else{
        res.send({message: 'Job deleted', job: jobObj});
      }
    });
  });

  /* List all Jobs */
router.get('/', function(req, res, next) {
    JobModel.aggregate([{
          $lookup: {
              from: "sources",
              localField: "sourceId",
              foreignField: "_id",
              as: "sources"
          }
      }, {
          $lookup: {
              from: "collectors",
              localField: "collectorId",
              foreignField: "_id",
              as: "collectors"
          }
      }, {
        $lookup: {
            from: "logs",
            localField: "logId",
            foreignField: "_id",
            as: "logs"
        }
    }]).exec(function (error, jobList) {
        if(error){
          res.send({message:'Unable to fetch List'});
        }else{
          res.send({message: 'Job List fetched', jobList: jobList});
        }
    });
});


/* Start Job*/
router.post('/start', async function(req, res, next){

  const jobObj = await JobModel.findOne({ _id: req.body.jobId }); // checking for Job
  if (jobObj) {
    const date = new Date();
    const jobObj = JobModel.findOneAndUpdate({  _id: req.body.jobId }, {date : date}, function(err, jobDetails){
          if(err){
            res.send({message:'Unable to add Object'});
          }else{
            res.send({ message : 'Job Started', job : jobDetails });
          }
      });        
    }else{
      res.send({ message : "Job doesn't exists" });
    }
});

/* Stop Job */
router.post('/stop', function(req, res, next) {

  const jobId = req.body.jobId;
  exec(`echo "stop ${jobId}"`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      res.send({ message : "Couldn't stop job" });
    }else{
      // executed Stop command
      res.send({ message : "Job Stopped" });
    }
  });
});

module.exports = router;
