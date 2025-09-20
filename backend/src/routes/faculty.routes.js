const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty.controller');

router.post('/', facultyController.createFaculty);
router.get('/', facultyController.getAllFaculty);

module.exports = router;
