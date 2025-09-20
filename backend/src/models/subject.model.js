// src/models/subject.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Subject = sequelize.define("Subject", {
  SubjectID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  SubjectName: { type: DataTypes.STRING, allowNull: false },
  CourseID: { type: DataTypes.INTEGER },
  Credits: { type: DataTypes.INTEGER },
  Semester: { type: DataTypes.INTEGER }
});

module.exports = Subject;
