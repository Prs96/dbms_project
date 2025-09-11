const Department = require('../models/department.model');

exports.createDepartment = async (req, res) => {
  try {
    const { DepartmentName, HOD } = req.body;
    if (!DepartmentName) {
      return res.status(400).send({ message: 'Department name cannot be empty!' });
    }
    const department = await Department.create({ DepartmentName, HOD });
    res.status(201).send(department);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).send(departments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
