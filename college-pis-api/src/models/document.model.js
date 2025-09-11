// src/models/document.model.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Document = sequelize.define("Document", {
  DocID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  UserID: { type: DataTypes.INTEGER },
  DocType: { type: DataTypes.STRING },
  FilePath: { type: DataTypes.STRING }
});

module.exports = Document;
