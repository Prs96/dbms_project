const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "College Personnel Information System API",
      version: "1.0.0",
      description:
        "A comprehensive API for managing college personnel information including students, faculty, courses, and administration",
      contact: {
        name: "API Support",
        email: "support@collegepis.com",
      },
      license: {
        name: "ISC",
        url: "https://opensource.org/licenses/ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://your-production-url.com",
        description: "Production server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["Name"],
          properties: {
            UserID: {
              type: "integer",
              description: "Auto-generated user ID",
              example: 1,
            },
            Name: {
              type: "string",
              description: "Full name of the user",
              example: "John Doe",
            },
            DOB: {
              type: "string",
              format: "date",
              description: "Date of birth",
              example: "2000-01-15",
            },
            Gender: {
              type: "string",
              description: "Gender of the user",
              example: "Male",
            },
            ContactNo: {
              type: "string",
              description: "Contact number",
              example: "+1234567890",
            },
            Email: {
              type: "string",
              format: "email",
              description: "Email address",
              example: "john.doe@example.com",
            },
            Address: {
              type: "string",
              description: "Full address",
              example: "123 Main St, City, State, ZIP",
            },
            AdmissionYear: {
              type: "integer",
              description: "Year of admission",
              example: 2022,
            },
            CourseID: {
              type: "integer",
              description: "ID of the enrolled course",
              example: 1,
            },
          },
        },
        Course: {
          type: "object",
          required: ["CourseName"],
          properties: {
            CourseID: {
              type: "integer",
              description: "Auto-generated course ID",
              example: 1,
            },
            CourseName: {
              type: "string",
              description: "Name of the course",
              example: "Computer Science",
            },
            DepartmentID: {
              type: "integer",
              description: "ID of the department",
              example: 1,
            },
            Duration: {
              type: "string",
              description: "Duration of the course",
              example: "4 years",
            },
          },
        },
        Department: {
          type: "object",
          required: ["DepartmentName"],
          properties: {
            DepartmentID: {
              type: "integer",
              description: "Auto-generated department ID",
              example: 1,
            },
            DepartmentName: {
              type: "string",
              description: "Name of the department",
              example: "Computer Science Department",
            },
            HOD: {
              type: "integer",
              description: "Faculty ID of Head of Department",
              example: 1,
            },
          },
        },
        Faculty: {
          type: "object",
          required: ["Name"],
          properties: {
            FacultyID: {
              type: "integer",
              description: "Auto-generated faculty ID",
              example: 1,
            },
            Name: {
              type: "string",
              description: "Full name of faculty member",
              example: "Dr. Jane Smith",
            },
            Designation: {
              type: "string",
              description: "Faculty designation",
              example: "Professor",
            },
            DepartmentID: {
              type: "integer",
              description: "ID of the department",
              example: 1,
            },
            Contact: {
              type: "string",
              description: "Contact number",
              example: "+1234567890",
            },
            Email: {
              type: "string",
              format: "email",
              description: "Email address",
              example: "jane.smith@college.edu",
            },
          },
        },
        Subject: {
          type: "object",
          required: ["SubjectName"],
          properties: {
            SubjectID: {
              type: "integer",
              description: "Auto-generated subject ID",
              example: 1,
            },
            SubjectName: {
              type: "string",
              description: "Name of the subject",
              example: "Data Structures and Algorithms",
            },
            Credits: {
              type: "integer",
              description: "Credit hours for the subject",
              example: 3,
            },
            CourseID: {
              type: "integer",
              description: "ID of the course",
              example: 1,
            },
          },
        },
        Grade: {
          type: "object",
          properties: {
            GradeID: {
              type: "integer",
              description: "Auto-generated grade ID",
              example: 1,
            },
            UserID: {
              type: "integer",
              description: "ID of the student",
              example: 1,
            },
            SubjectID: {
              type: "integer",
              description: "ID of the subject",
              example: 1,
            },
            Grade: {
              type: "string",
              description: "Grade received",
              example: "A",
            },
            GPA: {
              type: "number",
              format: "float",
              description: "Grade point average",
              example: 9.5,
            },
          },
        },
        Document: {
          type: "object",
          properties: {
            DocumentID: {
              type: "integer",
              description: "Auto-generated document ID",
              example: 1,
            },
            UserID: {
              type: "integer",
              description: "ID of the user",
              example: 1,
            },
            DocumentType: {
              type: "string",
              description: "Type of document",
              example: "Transcript",
            },
            DocumentPath: {
              type: "string",
              description: "Path to the document file",
              example: "/documents/transcript_1.pdf",
            },
            UploadDate: {
              type: "string",
              format: "date-time",
              description: "Date when document was uploaded",
              example: "2023-01-15T10:30:00Z",
            },
          },
        },
        Login: {
          type: "object",
          required: ["Username", "Password"],
          properties: {
            LoginID: {
              type: "integer",
              description: "Auto-generated login ID",
              example: 1,
            },
            UserID: {
              type: "integer",
              description: "ID of the user",
              example: 1,
            },
            Username: {
              type: "string",
              description: "Username for login",
              example: "johndoe",
            },
            Password: {
              type: "string",
              description: "Password for login",
              example: "password123",
            },
            Role: {
              type: "string",
              description: "User role",
              enum: ["Student", "Faculty", "Admin"],
              example: "Student",
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["username", "password"],
          properties: {
            username: {
              type: "string",
              description: "Username for authentication",
              example: "johndoe",
            },
            password: {
              type: "string",
              description: "Password for authentication",
              example: "password123",
            },
          },
        },
        SignupRequest: {
          type: "object",
          required: ["name", "email", "username", "password"],
          properties: {
            name: {
              type: "string",
              description: "Full name of the user",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "Email address",
              example: "john.doe@example.com",
            },
            username: {
              type: "string",
              description: "Desired username",
              example: "johndoe",
            },
            password: {
              type: "string",
              description: "Password for the account",
              example: "password123",
            },
            role: {
              type: "string",
              description: "User role (optional, defaults to Student)",
              enum: ["Student", "Faculty", "Admin"],
              example: "Student",
            },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Operation completed successfully",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "An error occurred",
            },
          },
        },
      },
      responses: {
        BadRequest: {
          description: "Bad Request",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        Unauthorized: {
          description: "Unauthorized",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        NotFound: {
          description: "Resource not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        Conflict: {
          description: "Conflict - Resource already exists",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
        InternalServerError: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Authentication",
        description: "User authentication and authorization",
      },
      {
        name: "Users",
        description: "Student and user management",
      },
      {
        name: "Courses",
        description: "Course management",
      },
      {
        name: "Departments",
        description: "Department management",
      },
      {
        name: "Faculty",
        description: "Faculty management",
      },
      {
        name: "Subjects",
        description: "Subject management",
      },
      {
        name: "Grades",
        description: "Grade and education record management",
      },
      {
        name: "Documents",
        description: "Document management",
      },
      {
        name: "Login Records",
        description: "Login record management",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to the API files for JSDoc comments
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
