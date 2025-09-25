const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject.controller.js");

/**
 * @swagger
 * /subjects:
 *   post:
 *     tags:
 *       - Subjects
 *     summary: Create a new subject
 *     description: Create a new subject record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subject'
 *     responses:
 *       201:
 *         description: Subject created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subject'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/", subjectController.createSubject);

/**
 * @swagger
 * /subjects:
 *   get:
 *     tags:
 *       - Subjects
 *     summary: Get all subjects
 *     description: Retrieve a list of all subjects
 *     responses:
 *       200:
 *         description: List of subjects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subject'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", subjectController.getAllSubjects);

module.exports = router;
