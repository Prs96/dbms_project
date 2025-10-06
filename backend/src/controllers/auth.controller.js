const Login = require("../models/login.model");
const User = require("../models/user.model");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "username and password required" });
    const found = await Login.findOne({ where: { Username: username } });
    if (!found || found.Password !== password)
      return res.status(401).json({ message: "Invalid credentials" });
    return res.json({ message: "ok", userId: found.UserID, role: found.Role });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: err.message });
  }
};

exports.signup = async (req, res) => {
  try {
    const { name, email, username, password, role = "Student" } = req.body;
    console.log("Signup request:", { name, email, username, role });
    if (!name || !email || !username || !password)
      return res.status(400).json({ message: "Missing fields" });

    // Check if username already exists
    const usernameExists = await Login.findOne({
      where: { Username: username },
    });
    if (usernameExists)
      return res.status(409).json({ message: "Username already exists" });

    // Check if email already exists
    const emailExists = await User.findOne({ where: { Email: email } });
    if (emailExists)
      return res.status(409).json({ message: "Email already exists" });

    const user = await User.create({ Name: name, Email: email });
    const login = await Login.create({
      UserID: user.UserID,
      Username: username,
      Password: password,
      Role: role,
    });
    return res.status(201).json({
      message: "created",
      userId: user.UserID,
      loginId: login.LoginID,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: err.message });
  }
};
