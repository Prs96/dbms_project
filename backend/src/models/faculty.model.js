// src/models/faculty.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Faculty = sequelize.define("Faculty", {
  FacultyID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING, allowNull: false },
  Designation: { type: DataTypes.STRING },
  DepartmentID: { type: DataTypes.INTEGER },
  Contact: { type: DataTypes.STRING },
  Email: { type: DataTypes.STRING, unique: true }
});

module.exports = Faculty;
