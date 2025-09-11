const Login = require('../models/login.model');

exports.createLogin = async (req, res) => {
  try {
    const { UserID, Username, Password, Role } = req.body;
    if (!UserID || !Username || !Password) {
      return res.status(400).send({ message: 'UserID, Username, and Password are required!' });
    }
    const login = await Login.create({ UserID, Username, Password, Role });
    res.status(201).send(login);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllLogins = async (req, res) => {
  try {
    const logins = await Login.findAll();
    res.status(200).send(logins);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
