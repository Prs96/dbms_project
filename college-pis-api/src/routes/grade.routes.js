const express = require('express');
const router = express.Router();
const educationController = require('../controllers/grade.controller');

router.post('/', educationController.createRecord);
router.get('/', educationController.getAllRecords);

module.exports = router;
