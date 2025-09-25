const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login.controller");

/**
 * @swagger
 * /logins:
 *   post:
 *     tags:
 *       - Login Records
 *     summary: Create a new login record
 *     description: Create a new login credentials record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: Login record created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post("/", loginController.createLogin);

/**
 * @swagger
 * /logins:
 *   get:
 *     tags:
 *       - Login Records
 *     summary: Get all login records
 *     description: Retrieve a list of all login credential records
 *     responses:
 *       200:
 *         description: List of login records retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Login'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", loginController.getAllLogins);

module.exports = router;
