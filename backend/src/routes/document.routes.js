const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document.controller');

router.post('/', documentController.createDocument);
router.get('/', documentController.getAllDocuments);

module.exports = router;
