const Document = require('../models/document.model');

exports.createDocument = async (req, res) => {
  try {
    const { UserID, DocType, FilePath } = req.body;
    if (!UserID || !DocType || !FilePath) {
      return res.status(400).send({ message: 'UserID, DocType, and FilePath are required!' });
    }
    const document = await Document.create({ UserID, DocType, FilePath });
    res.status(201).send(document);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();
    res.status(200).send(documents);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
