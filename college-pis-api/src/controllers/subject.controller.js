const Subject = require('../models/subject.model');

exports.createSubject = async (req, res) => {
  try {
    const { SubjectName, CourseID, Credits, Semester } = req.body;
    if (!SubjectName || !CourseID) {
      return res.status(400).send({ message: 'SubjectName and CourseID are required!' });
    }
    const subject = await Subject.create({ SubjectName, CourseID, Credits, Semester });
    res.status(201).send(subject);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.status(200).send(subjects);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
