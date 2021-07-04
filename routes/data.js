const express = require('express');
const router = express.Router();
const Camploc = require('../models/camploc');
const Footpathloc = require('../models/footpath');
const AOI = require('../models/aoi');
const mongoose = require('../database/mongoose');

/* GET Camp location listing. */
router.get('/camploc', (req, res, next) => {
    Camploc.find({}, (err, data) => {
        res.json(data);
    });
});

/* GET Foothpath location listing. */
router.get('/fploc', (req, res, next) => {
    Footpathloc.find({}, (err, data) => {
        res.json(data);
    });
});

/* GET AOI Polygon listing. */
router.get('/aoi', (req, res, next) => {
    AOI.find({}, (err, data) => {
        res.json(data);
    });
});

module.exports = router;