const CryptoJS = require("crypto-js");
const sqlite3 = require("sqlite3");
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "../radio.db"));

const getUser = (req, res) => {
  let query = `SELECT * FROM user WHERE email = $email`;
  let params = { $email: req.params.email };
  db.all(query, params, (err, row) => {
    if (err) {
      console.log("Error message db:");
      console.error(err.message);
    }
    res.json(row[0]);
  });
};

const addProgramToUser = async (req, res) => {
  // Get saved programs from db
  let getPrograms = `SELECT programs FROM user WHERE email = $email`;
  let params = {
    $email: req.params.email,
  };
  let savedPrograms = "";
  db.all(getPrograms, params, async (err, row) => {
    if (err) {
      console.log("Error message db:");
      console.error(err.message);
    }
    savedPrograms = row[0].programs;
    // Add new program to saved programs
    let program = req.body;
    savedPrograms = savedPrograms.length > 0 ? JSON.parse(savedPrograms) : [];
    savedPrograms.push(program);
    let query = /*sql*/ `
    UPDATE user SET programs = $programs WHERE email = $email`;
    params = {
      $programs: JSON.stringify(savedPrograms),
      $email: req.params.email,
    };
    let result = await db.run(query, params);
    res.json(result);
  });
};

const addChannelToUser = async (req, res) => {
  // Get saved channels from db
  let getChannels = `SELECT channels FROM user WHERE email = $email`;
  let params = {
    $email: req.params.email,
  };
  let savedChannels = "";
  db.all(getChannels, params, async (err, row) => {
    if (err) {
      console.log("Error message db:");
      console.error(err.message);
    }
    savedChannels = row[0].channels;
    // Add new program to saved channels
    let channel = req.body;
    savedChannels = savedChannels.length > 0 ? JSON.parse(savedChannels) : [];
    savedChannels.push(channel);
    let query = /*sql*/ `
    UPDATE user SET channels = $channels WHERE email = $email`;
    params = {
      $channels: JSON.stringify(savedChannels),
      $email: req.params.email,
    };
    let result = await db.run(query, params);
    res.json(result);
  });
};

const createUser = async (req, res) => {
  let { email, password } = req.body;
  const hashedPassword = CryptoJS.AES.encrypt(
    password,
    "You will never gonna hack this"
  ).toString();
  let query = /*sql*/ `
  INSERT INTO user (email, password) VALUES ($email, $password)`;
  let params = {
    $email: email,
    $password: hashedPassword,
  };
  let result = await db.run(query, params);
  res.json(result);
};

const deleteUser = (req, res) => {
  let query = `DELETE FROM user WHERE email = $email`;
  let params = { $email: req.params.email };
  db.run(query, params, (err, row) => {
    if (err) {
      console.log("Error message db:");
      console.error(err.message);
    }
    res.json(true);
  });
};

module.exports = {
  deleteUser,
  addProgramToUser,
  addChannelToUser,
  getUser,
  createUser,
};
