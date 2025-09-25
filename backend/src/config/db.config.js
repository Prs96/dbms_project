// src/config/db.config.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Set to true to see SQL queries in the console
});

// Test the connection
async function testDbConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    console.log("📚 API documentation is still available at /api-docs");
  }
}

testDbConnection();

testDbConnection();

module.exports = sequelize;
