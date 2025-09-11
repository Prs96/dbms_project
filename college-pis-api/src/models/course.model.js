// src/models/course.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Course = sequelize.define("Course", {
  CourseID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  CourseName: { type: DataTypes.STRING, allowNull: false },
  DepartmentID: { type: DataTypes.INTEGER },
  Duration: { type: DataTypes.STRING }
});

module.exports = Course;
