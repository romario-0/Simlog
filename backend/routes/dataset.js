var express = require('express');
const router = express.Router();
const DatasetModel = require('../models/dataset.model');

/* Create new Dataset*/
router.post('/save', async function (req, res, next) {

    const datasetObj = await DatasetModel.findOne({ datasetName: req.body.datasetName }); // checking if datasetName is alreday existing or not
    if (!datasetObj) {
        const datasetModelObj = new DatasetModel({
            datasetName: req.body.datasetName,
            datasetCollection: req.body.datasetCollection,
            delimiter: req.body.delimiter,
        });

        datasetModelObj.save(function (err, datasetDetails) {
            if (err) {
                res.send({ message: 'Unable to add Object' });
            } else {
                res.send({ message: 'Dataset Added', dataset: datasetDetails })
            }
        });
    } else {
        res.send({ message: 'Dataset name already exists' });
    }
});

/* Update Dataset*/
router.post('/update', async function (req, res, next) {

    const datasetObj = await DatasetModel.findOne({ _id: req.body.datasetId }); // checking for Dataset
    if (datasetObj) {
        let dataset = req.body;
        if (dataset.hasOwnProperty('datasetName')) {
            delete dataset.datasetName;
        }

        DatasetModel.findOneAndUpdate({ _id: req.body.datasetId }, dataset, function (err, datasetDetails) {
            if (err) {
                res.send({ message: 'Unable to add Object' });
            } else {
                res.send({ message: 'Dataset Updated', dataset: datasetDetails })
            }
        });
    } else {
        res.send({ message: "Dataset doesn't exists" });
    }
});

/* Read Dataset details */
router.get('/view/:datasetId', function (req, res, next) {

    const datasetId = req.params.datasetId;

    DatasetModel.findById(datasetId, function (err, datasetObj) {
        if (err) {
            res.send({ message: 'Unable to fetch Object' });
        } else {
            res.send({ message: 'Dataset fetched', dataset: datasetObj });
        }
    });
});

/* Delete Dataset details */
router.delete('/remove/:datasetId', async function (req, res, next) {

    const datasetId = req.params.datasetId;

    const dependency = await checkJobDependency('dataset', datasetId);
    if (!dependency) {
        DatasetModel.findByIdAndDelete(datasetId, function (err, datasetObj) {
            if (err) {
                res.send({ message: 'Unable to fetch Object' });
            } else {
                res.send({ message: 'Dataset deleted', dataset: datasetObj });
            }
        });
    } else {
        res.send({ message: 'Dataset is linked to one or more jobs!!!' });
    }
});

/* List all Datasets */
router.get('/', function (req, res, next) {

    DatasetModel.find(function (err, datasetList) {
        if (err) {
            res.send({ message: 'Unable to fetch List' });
        } else {
            res.send({ message: 'Dataset List fetched', datasetList: datasetList });
        }
    });
});

module.exports = router;
