const express = require("express");
const router = express.Router();
const educationController = require("../controllers/grade.controller");

/**
 * @swagger
 * /education:
 *   post:
 *     tags:
 *       - Grades
 *     summary: Create a new education/grade record
 *     description: Create a new grade or education record for a student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Grade'
 *     responses:
 *       201:
 *         description: Education record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grade'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/", educationController.createRecord);

/**
 * @swagger
 * /education:
 *   get:
 *     tags:
 *       - Grades
 *     summary: Get all education/grade records
 *     description: Retrieve a list of all grade and education records
 *     responses:
 *       200:
 *         description: List of education records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grade'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", educationController.getAllRecords);

module.exports = router;
