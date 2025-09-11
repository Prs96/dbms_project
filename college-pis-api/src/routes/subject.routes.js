const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subject.controller.js');

router.post('/', subjectController.createSubject);
router.get('/', subjectController.getAllSubjects);

module.exports = router;
