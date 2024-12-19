const express = require('express');
const PredictController = require('../controllers/predictController')
const router = express.Router();


router.post('/price', PredictController.findprice);

module.exports = router;
