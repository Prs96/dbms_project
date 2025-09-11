// src/models/department.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Department = sequelize.define("Department", {
  DepartmentID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  DepartmentName: { type: DataTypes.STRING, allowNull: false },
  HOD: { type: DataTypes.INTEGER } // FacultyID FK
});

module.exports = Department;
