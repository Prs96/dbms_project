// src/app.js
const express = require("express");
const sequelize = require("./config/db.config"); // Import the sequelize instance
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger.config");
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

// CORS configuration for Vercel deployment
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// Swagger Documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "College PIS API Documentation",
    swaggerOptions: {
      docExpansion: "none",
      filter: true,
      showRequestHeaders: true,
    },
  })
);

// API Routes
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
  res.json({
    message: "Welcome to the College Personnel Information System API!",
    documentation: "/api-docs",
    endpoints: {
      authentication: "/auth",
      users: "/users",
      courses: "/courses",
      departments: "/departments",
      faculty: "/faculty",
      education: "/education",
      subjects: "/subjects",
      documents: "/documents",
      logins: "/logins",
    },
  });
});

// Sync all defined models to the DB (with error handling)
sequelize
  .sync()
  .then(() => {
    console.log("🔄 Database & tables synced!");
  })
  .catch((error) => {
    console.log(
      "⚠️ Database connection failed, but API will still serve documentation:"
    );
    console.log(
      "📚 Access Swagger documentation at: http://localhost:" +
        (process.env.PORT || 3000) +
        "/api-docs"
    );
  });

module.exports = app;
