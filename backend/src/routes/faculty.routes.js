const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/faculty.controller");

/**
 * @swagger
 * /faculty:
 *   post:
 *     tags:
 *       - Faculty
 *     summary: Create a new faculty member
 *     description: Create a new faculty member record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Faculty'
 *     responses:
 *       201:
 *         description: Faculty member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Faculty'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/", facultyController.createFaculty);

/**
 * @swagger
 * /faculty:
 *   get:
 *     tags:
 *       - Faculty
 *     summary: Get all faculty members
 *     description: Retrieve a list of all faculty members
 *     responses:
 *       200:
 *         description: List of faculty members retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Faculty'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", facultyController.getAllFaculty);

module.exports = router;
