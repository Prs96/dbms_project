const Education = require('../models/grade.model');

exports.createRecord = async (req, res) => {
  try {
    const { UserID, CourseID, SubjectID, Grade, Semester } = req.body;
    if (!UserID || !CourseID || !SubjectID) {
      return res.status(400).send({ message: 'UserID, CourseID, and SubjectID are required!' });
    }
    const record = await Education.create({ UserID, CourseID, SubjectID, Grade, Semester });
    res.status(201).send(record);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllRecords = async (req, res) => {
  try {
    const records = await Education.findAll();
    res.status(200).send(records);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
