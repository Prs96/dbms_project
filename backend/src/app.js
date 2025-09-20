// src/app.js
const express = require("express");
const sequelize = require("./config/db.config"); // Import the sequelize instance
const departmentRoutes = require("./routes/department.routes.js"); // Import routes
const userRoutes = require("./routes/user.routes.js");
const courseRoutes = require("./routes/course.routes.js");
const facultyRoutes = require("./routes/faculty.routes.js");
const educationRoutes = require("./routes/grade.routes.js");
const subjectRoutes = require("./routes/subject.routes.js");
const documentRoutes = require("./routes/document.routes.js");
const loginRoutes = require("./routes/login.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const app = express();
app.use(express.json());

// Connect the department routes under the '/api/departments' path
app.use("/users", require("./routes/user.routes"));
app.use("/courses", require("./routes/course.routes.js"));
app.use("/departments", require("./routes/department.routes"));
app.use("/faculty", require("./routes/faculty.routes"));
app.use("/education", require("./routes/grade.routes"));
app.use("/subjects", require("./routes/subject.routes"));
app.use("/documents", require("./routes/document.routes"));
app.use("/logins", require("./routes/login.routes"));
app.use("/auth", require("./routes/auth.routes"));

app.get("/", (req, res) => {
  res.send("Welcome to the College PIS API!");
});

// Sync all defined models to the DB
sequelize.sync().then(() => {
  console.log("🔄 Database & tables synced!");
});

module.exports = app;
