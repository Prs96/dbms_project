const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");

/**
 * @swagger
 * /documents:
 *   post:
 *     tags:
 *       - Documents
 *     summary: Create a new document record
 *     description: Create a new document record for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       201:
 *         description: Document created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/", documentController.createDocument);

/**
 * @swagger
 * /documents:
 *   get:
 *     tags:
 *       - Documents
 *     summary: Get all documents
 *     description: Retrieve a list of all document records
 *     responses:
 *       200:
 *         description: List of documents retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", documentController.getAllDocuments);

module.exports = router;
