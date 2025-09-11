// src/models/login.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Login = sequelize.define("Login", {
  LoginID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserID: { type: DataTypes.INTEGER },  // can also be Faculty
  Username: { type: DataTypes.STRING, unique: true },
  Password: { type: DataTypes.STRING }, // hash later with bcrypt
  Role: { type: DataTypes.ENUM("Admin", "Faculty", "Student") }
});

module.exports = Login;
