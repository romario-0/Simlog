var express = require('express');
const router = express.Router();
const JobModel = require('../models/job.model');

/* Create new Job*/
router.post('/save', async function(req, res, next){

    const jobObj = await JobModel.findOne({ jobName: req.body.jobName }); // checking jobName is alreday existing or not
    if (!jobObj) {
        jobModelObj = new JobModel({
          jobName : req.body.jobName,
          logSourceID : req.body.logSourceID,
          frequency : req.body.frequency,
          volume :  req.body.volume,
          schedule : req.body.schedule,
          date : req.body.date,
          time : req.body.time,
          sourceIP : req.body.sourceIP,
          collectorIP : req.body.collectorIP,
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
      const jobObj = JobModel.findOneAndUpdate({  _id: req.body._id }, req.body, function(err, jobDetails){
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
router.get('/view/:jobId', function(req, res, next) {

    const jobId = req.params.jobId;
  
    JobModel.findById(jobId, function(err , jobObj){
      if(err){
        res.send({message:'Unable to fetch Object'});
      }else{
        res.send({message: 'Job fetched', job: jobObj});
      }
    });
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

    JobModel.find(function(err , jobList){
    if(err){
      res.send({message:'Unable to fetch List'});
    }else{
      res.send({message: 'Job List fetched', jobList: jobList});
    }
  });
});

module.exports = router;
