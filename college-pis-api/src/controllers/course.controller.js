const Course = require('../models/course.model');

exports.createCourse = async (req, res) => {
  try {
    const { CourseName, DepartmentID, Duration } = req.body;
    if (!CourseName || !DepartmentID) {
      return res.status(400).send({ message: 'Course name and DepartmentID are required!' });
    }
    const course = await Course.create({ CourseName, DepartmentID, Duration });
    res.status(201).send(course);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
