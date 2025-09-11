// src/models/education.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Education = sequelize.define("Education", {
  RecordID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserID: { type: DataTypes.INTEGER },
  CourseID: { type: DataTypes.INTEGER },
  SubjectID: { type: DataTypes.INTEGER },
  Grade: { type: DataTypes.STRING },
  Semester: { type: DataTypes.INTEGER }
});

module.exports = Education;
