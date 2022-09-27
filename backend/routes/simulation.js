var express = require('express');
const router = express.Router();
const SimulationModel = require('../models/simulation.model');
const JobModel = require('../models/job.model');
const { exec } = require('child_process');
const mongoose = require('mongoose');
const SIMULATION_STATUS_NEW = 'NEW';

/* Create new Simulation*/
router.post('/save', async function (req, res, next) {
  const simulationObj = await SimulationModel.findOne({ simulationName: req.body.simulationName }); // checking simulationName is alreday existing or not
  if (!simulationObj) {
    if (validateData(req.body)) {
      // if (await validateNewJobs(req.body.jobs)) {
        const date = new Date(req.body.date);
        const simulationModelObj = new SimulationModel({
          simulationName: req.body.simulationName,
          jobs: req.body.jobs,
          date: date,
          status: SIMULATION_STATUS_NEW,
          createdBy: res.locals.user,
          updatedBy: res.locals.user
        });

        simulationModelObj.save(async function (err, simulationDetails) {
          if (err) {
            res.send({ message: 'Unable to add Object' });
          } else {
            // await JobModel.updateMany({ _id: { $in: simulationDetails.jobIds } }, { date: date, simulation: { simulationId: simulationDetails._id, simulationName: simulationDetails.simulationName } });
            res.send({ message: 'Simulation Added', simulation: simulationDetails });
          }
        });
      // } else {
      //   res.send({ message: 'Some jobs are already mapped to another simulation!!!' });
      // }
    } else {
      res.send({ message: 'Required details not provided' });
    }
  } else {
    res.send({ message: 'Simulation name already exists' });
  }
});

/* Update Simulation*/
router.post('/update', async function (req, res, next) {

  SimulationModel.findOne({ _id: req.body._id }, async function (err, simulationObj) {
    // checking for Simulation
    if (simulationObj) {
      let simulation = req.body;
      if (validateDataForUpdate(simulation)) {
        simulation.simulationName = simulationObj.simulationName;
        simulation.updatedBy = res.locals.user;
        //  await updateSimulationJobs(simulation.jobIds, simulationObj.jobIds, simulation);
        SimulationModel.findOneAndUpdate({ _id: req.body._id }, simulation, function (err, simulationDetails) {
          if (err) {
            console.log(err);
            res.send({ message: 'Unable to update Object' });
          } else {
            // updateJobsDate(simulationDetails.jobIds, simulation.date);
            res.send({ message: 'Simulation Updated', simulation: simulationDetails });
          }
        });
      } else {
        res.send({ message: 'Required details not proper' });
      }
    } else {
      res.send({ message: "Simulation doesn't exists" });
    }
  });

});

/* Read Simulation details */
router.get('/view/:simulationId', async function (req, res, next) {

  // try{
  //   const simulationId = mongoose.Types.ObjectId(req.params.simulationId);
  //   SimulationModel.aggregate([
  //       {$match: { _id: simulationId }},{
  //         $lookup:
  //           {
  //             from: "jobs",
  //             localField: "jobIds",
  //             foreignField: "_id",
  //             as: "jobs"
  //           }
  //     }
  //   ]).exec(function (error, simulation) {
  //       if(error){
  //         res.send({message:'Unable to fetch Object'});
  //       }else{
  //         res.send({message: 'Simulation fetched', simulation: simulation[0]});
  //       }
  //   });
  // }catch(e){
  //   res.send({message:'No simulations found'});
  // }
  const simulationId = mongoose.Types.ObjectId(req.params.simulationId);

  SimulationModel.findById(simulationId, function (err, simulationObj) {
    if (err) {
      res.send({ message: 'Unable to fetch Object' });
    } else {
      res.send({ message: 'Simulation fetched', simulation: simulationObj });
    }
  });
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
  //   SimulationModel.aggregate( [
  //       {
  //          $lookup:
  //             {
  //               from: "jobs",
  //               localField: "jobIds",
  //               foreignField: "_id",
  //               as: "jobs"
  //            }
  //       }
  //    ]).exec(function (error, simulationList) {
  //     if(error){
  //       res.send({message:'Unable to fetch List'});
  //     }else{
  //       res.send({message: 'Simulation List fetched', simulationList: simulationList});
  //     }
  // });
  SimulationModel.find(function (err, simulationList) {
    if (err) {
      res.send({ message: 'Unable to fetch List' });
    } else {
      res.send({ message: 'Simulation List fetched', simulationList: simulationList });
      }
  });
});

function startJobs(jobIds) {
  const date = new Date();
  updateJobsDate(jobIds, date)
};

function updateJobsDate(jobIds, date) {
  const jobObj = JobModel.updateMany({ _id: { $in: jobIds }, status: 'New' }, { date: date }, function (err, jobs) {
    if (err) {
      return false;
    } else {
      return true
    }
  });
};

/* Simulation Actions */
router.post('/action', function (req, res, next) {

  const simulationId = req.body.simulationId;
  const action = req.body.action.toLowerCase();
  SimulationModel.findById(simulationId, function (err, simulation) {

    const jobIds = simulation.jobIds; //Array of job Ids (This would change accoring to command created in python)
    if (action === 'run') {
      startJobs(simulation.jobIds);
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
  if (!simulation.simulationName || !simulation.date || !(simulation?.jobs && simulation.jobs.length > 0)) {
    return false;
  } else if (!validateDataForUpdate(simulation)) {
    return false
  }
  return true;
}

function validateDataForUpdate(simulation) {
  if (!simulation.date) {
    return false;
  } else if (!(simulation?.jobs && simulation.jobs.length > 0)) {
    return false;
  } else {
    for (let job of simulation.jobs) {
      if ((job.logId !== undefined && !job.logId.trim())
        || (job.duration !== undefined && !Number(job.duration))
        || (job.volume !== undefined && !Number(job.volume))
        || (job.sourceId !== undefined && !job.sourceId.trim())
        || (job.collectorId !== undefined && !job.collectorId.trim())) {
        return false;
      }
    }
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

async function updateSimulationJobs(newList, oldList, simulation) {
  const removeJobList = getJobsToRemove(newList, oldList);
  await JobModel.updateMany({ _id: { $in: removeJobList } }, { $unset: { simulation: "" } });
  const addJobList = getJobsToAdd(newList, oldList);
  const result = await JobModel.updateMany({ _id: { $in: addJobList } }, { date: simulation.date, simulation: { simulationId: simulation._id, simulationName: simulation.simulationName } });
}

function getJobsToRemove(newList, oldList) {
  const removeJobs = [];
  for (let job of oldList) {
    const idx = newList.findIndex(ele => ele == job.toString());
    if (idx < 0) {
      removeJobs.push(job);
    }
  }
  return removeJobs;
}

function getJobsToAdd(newList, oldList) {
  const addJobs = [];
  for (let job of newList) {
    const idx = oldList.findIndex(ele => ele.toString() == job);
    if (idx < 0) {
      addJobs.push(job);
    }
  }
  return addJobs;
}
module.exports = router;