const Faculty = require('../models/faculty.model');

exports.createFaculty = async (req, res) => {
  try {
    const { Name, Designation, DepartmentID, Contact, Email } = req.body;
    if (!Name || !DepartmentID) {
      return res.status(400).send({ message: 'Name and DepartmentID are required!' });
    }
    const faculty = await Faculty.create({ Name, Designation, DepartmentID, Contact, Email });
    res.status(201).send(faculty);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllFaculty = async (req, res) => {
  try {
    const facultyList = await Faculty.findAll();
    res.status(200).send(facultyList);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
