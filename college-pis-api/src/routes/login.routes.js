const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login.controller');

router.post('/', loginController.createLogin);
router.get('/', loginController.getAllLogins);

module.exports = router;
