const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");

/**
 * @swagger
 * /departments:
 *   post:
 *     tags:
 *       - Departments
 *     summary: Create a new department
 *     description: Create a new department record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       201:
 *         description: Department created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Department'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/", departmentController.createDepartment);

/**
 * @swagger
 * /departments:
 *   get:
 *     tags:
 *       - Departments
 *     summary: Get all departments
 *     description: Retrieve a list of all departments
 *     responses:
 *       200:
 *         description: List of departments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Department'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", departmentController.getAllDepartments);

module.exports = router;
