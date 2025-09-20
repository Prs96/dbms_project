// src/models/user.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const User = sequelize.define("User", {
  UserID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Name: { type: DataTypes.STRING, allowNull: false },
  DOB: { type: DataTypes.DATEONLY },
  Gender: { type: DataTypes.STRING },
  ContactNo: { type: DataTypes.STRING },
  Email: { type: DataTypes.STRING, unique: true },
  Address: { type: DataTypes.TEXT },
  AdmissionYear: { type: DataTypes.INTEGER },
  CourseID: { type: DataTypes.INTEGER }
});

module.exports = User;
