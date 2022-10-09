var express = require('express');
const router = express.Router();
const SimulationModel = require('../models/simulation.model');
const JobModel = require('../models/job.model');
const { exec } = require('child_process');
const mongoose = require('mongoose');
const { upsertJobs, bulkDeleteJobs } = require('../services/job.service');

const SIMULATION_STATUS_NEW = 'NEW';

/* Create new Simulation*/
router.post('/save', async function (req, res, next) {
  const simulationObj = await SimulationModel.findOne({ simulationName: req.body.simulationName }); // checking simulationName is alreday existing or not
  if (!simulationObj) {
    if (validateData(req.body)) {
      const jobIds = await upsertNewJobs(req.body.jobs);
      if (jobIds) {
        const date = new Date(req.body.date);
        const simulationModelObj = new SimulationModel({
          simulationName: req.body.simulationName,
          jobIds: jobIds,
          date: date,
          status: SIMULATION_STATUS_NEW,
        });

        simulationModelObj.save(async function (err, simulationDetails) {
          if (err) {
            res.send({ message: 'Unable to add Object' });
          } else {
            res.send({ message: 'Simulation Added', simulation: simulationDetails });
          }
        });
      } else {
        res.send({ message: 'Failed to add jobs' });
      }
    } else {
      res.send({ message: 'Required details not provided' });
    }
  } else {
    res.send({ message: 'Simulation name already exists' });
  }
});

/* Update Simulation*/
router.post('/update', async function (req, res, next) {

  SimulationModel.findOne({ _id: req.body._id }, async function (err, simulationOldObj) {
    // checking for Simulation
    if (simulationOldObj) {
      if (simulationOldObj?.status?.toUpperCase() === SIMULATION_STATUS_NEW) {
        let simulation = req.body;
        if (validateDataForUpdate(simulation)) {
          const jobIds = await upsertNewJobs(req.body.jobs);
          deleteJobs(simulationOldObj.jobIds, req.body.jobs)
          const remainingJobs = req.body.jobs.filter(ele => ele._id).map(ele => ele._id);
          simulation.simulationName = simulationOldObj.simulationName;
          simulation.jobIds = [...remainingJobs, ...jobIds];
          SimulationModel.findOneAndUpdate({ _id: req.body._id }, simulation, function (err, simulationDetails) {
            if (err) {
              console.log(err);
              res.send({ message: 'Unable to update Object' });
            } else {
              res.send({ message: 'Simulation Updated', simulation: simulationDetails });
            }
          });
        } else {
          res.send({ message: 'Required details not proper' });
        }
      } else {
        res.send({ message: "Simulation already running" });
      }
    } else {
      res.send({ message: "Simulation doesn't exists" });
    }
  });

});

/* Read Simulation details */
router.get('/view/:simulationId', async function (req, res, next) {

  try {
    const simulationId = mongoose.Types.ObjectId(req.params.simulationId);
    SimulationModel.aggregate([
      { $match: { _id: simulationId } }, {
        $lookup:
        {
          from: "jobs",
          localField: "jobIds",
          foreignField: "_id",
          as: "job"
        }
      },
      {
        $unwind: {
          path: "$job",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "sources",
          localField: "job.sourceId",
          foreignField: "_id",
          as: "job.source"
        }
      }, {
        $lookup: {
          from: "collectors",
          localField: "job.collectorId",
          foreignField: "_id",
          as: "job.collector"
        }
      }, {
        $lookup: {
          from: "logs",
          localField: "job.logId",
          foreignField: "_id",
          as: "job.log"
        }
      },
      {
        $unwind: '$job.source'
      },
      {
        $unwind: '$job.collector'
      },
      {
        $unwind: '$job.log'
      },
      {
        $group: {
          _id: "$_id",
          simulationName: { $first: "$simulationName" },
          date: { $first: "$date" },
          startTime: { $first: "$startTime" },
          endTime: { $first: "$endTime" },
          status: { $first: "$status" },
          jobIds: { $first: "$jobIds" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          // createdBy : 
          // updatedBy : 
          jobs: { $push: "$job" }
        }
      },
    ]).exec(function (error, simulation) {
      if (error) {
        res.send({ message: 'Unable to fetch Object' });
      } else {
        res.send({ message: 'Simulation fetched', simulation: simulation[0] });
      }
    });
  } catch (e) {
    res.send({ message: 'No simulations found' });
  }
});

/* Delete Simulation details */
router.delete('/remove/:simulationId', function (req, res, next) {

  const simulationId = req.params.simulationId;
  //Need to delete entry in jobs
  /*SimulationModel.findByIdAndDelete(simulationId, function(err , simulationObj){
    if(err){
      res.send({message:'Unable to fetch Object'});
    }else{
      res.send({message: 'Simulation deleted', simulation: simulationObj});
    }
  });*/
});

/* List all Simulations */
router.get('/', function (req, res, next) {
  SimulationModel.aggregate([
    {
      $lookup:
      {
        from: "jobs",
        localField: "jobIds",
        foreignField: "_id",
        as: "job"
      }
    },
    {
      $unwind: {
        path: "$job",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: "sources",
        localField: "job.sourceId",
        foreignField: "_id",
        as: "job.source"
      }
    }, {
      $lookup: {
        from: "collectors",
        localField: "job.collectorId",
        foreignField: "_id",
        as: "job.collector"
      }
    }, {
      $lookup: {
        from: "logs",
        localField: "job.logId",
        foreignField: "_id",
        as: "job.log"
      }
    },
    {
      $unwind: '$job.source'
    },
    {
      $unwind: '$job.collector'
    },
    {
      $unwind: '$job.log'
    },
    {
      $group: {
        _id: "$_id",
        simulationName: { $first: "$simulationName" },
        date: { $first: "$date" },
        startTime: { $first: "$startTime" },
        endTime: { $first: "$endTime" },
        status: { $first: "$status" },
        jobIds: { $first: "$jobIds" },
        createdAt: { $first: "$createdAt" },
        updatedAt: { $first: "$updatedAt" },
        // createdBy : 
        // updatedBy : 
        jobs: { $push: "$job" }
      }
    },
    {
      $sort: { createdAt: -1 }
    }
  ]).exec(function (error, simulationList) {
    if (error) {
      res.send({ message: 'Unable to fetch List' });
    } else {
      res.send({ message: 'Simulation List fetched', simulationList: simulationList });
    }
  });
});

/* Simulation Actions */
router.post('/action', function (req, res, next) {

  const simulationId = req.body.simulationId;
  const action = req.body.action.toLowerCase();
  SimulationModel.findById(simulationId, function (err, simulation) {


    if (action === 'run') {
      const simAction = ''; //python command
      /*
        const command = `${process.env.PYTHON_ENV_VAR} ${process.env.PYTHON_FILE_PATH}/controller.py ${simAction} ${jobIds}`;
        exec(command, (err, stdout, stderr) => {
          if (err) {
            console.log(err);
            res.send({ message : `Couldn't run simulation` });
          }else{
            // executed Stop command
            res.send({ message : `Simulation run requested` });
          }
        }); 
       */
    }
    /*else if(action === 'stop'){
      const simAction = ''; //python command
      const command = `${process.env.PYTHON_ENV_VAR} ${process.env.PYTHON_FILE_PATH}/controller.py ${simAction} ${jobIds}`;
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          res.send({ message : `Couldn't ${action} simulation` });
        }else{
          // executed Stop command
          res.send({ message : `Simulation ${action} requested` });
        }
      }); 
    }*/
    res.send({ message: `Simulation action requested` }); // **Temp, romove once code has been updated
  })

});


function validateData(simulation) {
  if (!simulation.simulationName || !simulation.date || !simulation.jobs) {
    return false;
  } else if (!validateDataForUpdate(simulation)) {
    return false
  }
  return true;
}

function validateDataForUpdate(simulation) {
  if ((!simulation.date)
    || (simulation.jobs !== undefined && simulation.jobs.length < 1)) {
    return false;
  }
  return true;
}

async function validateNewJobs(jobIds) {
  let flag = true;
  for (let job of jobIds) {
    const temp = await JobModel.find({ _id: job, simulation: { $exists: false } });
    if (temp.length === 0) {
      flag = false;
    }
  }
  return flag;
}

function getJobsToRemove(oldList, newList) {
  const removeJobs = [];
  for (let job of oldList) {
    const idx = newList.findIndex(ele => ele._id == job.toString());
    if (idx < 0) {
      removeJobs.push(job);
    }
  }
  return removeJobs;
}

async function upsertNewJobs(jobs) {
  try {
    const res = await upsertJobs(jobs)
    if (res) {
      return Object.keys(res.insertedIds).map((key) => res.insertedIds[key].toString());
    }
    return [];
  }
  catch (err) {
    console.log(err)
    return [];
  }
}

async function deleteJobs(oldJobs, newJobs) {
  const jobs = getJobsToRemove(oldJobs, newJobs);
  const res = await bulkDeleteJobs(jobs);
  return jobs;
}
module.exports = router;