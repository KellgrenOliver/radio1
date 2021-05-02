const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";
const sqlite3 = require("sqlite3");
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "../radio.db"));

const getAllPrograms = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs?${json}&${paginationFalse}`
  );
  programs = await programs.json();
  res.json(programs.programs);
};

const renderProgramsById = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs/index?channelid=${req.params.channelId}&${json}`
  );
  programs = await programs.json();
  res.json(programs.programs);
};

const renderCategories = async (req, res) => {
  let categories = await fetch(
    `http://api.sr.se/api/v2/programcategories?${json}&${paginationFalse}`
  );
  categories = await categories.json();
  res.json(categories.programcategories);
};

const renderProgramsByCategory = async (req, res) => {
  let programs = await fetch(
    `http://api.sr.se/api/v2/programs/index?channelid=${req.params.channelId}&programcategoryid=${req.params.categoryId}&${json}&${paginationFalse}`
  );
  programs = await programs.json();
  res.json(programs.programs);
};

const getProgramsFromUser = async (req, res) => {
  let query = `SELECT programs FROM user WHERE email = $email`;
  let params = { $email: req.params.email };
  db.all(query, params, async (err, row) => {
    if (err) {
      console.log("Error message db:");
      console.error(err.message);
    }
    let programs = row[0].programs;
    programs.length > 0 ? res.json(JSON.parse(programs)) : res.json(programs);
  });
};

// const getSpecificProgram = async (req, res) => {
//   let program = await fetch(
//     `http://api.sr.se/api/v2/programs/${req.params.programId}?${json}&${paginationFalse}`
//   );
//   program = await program.json();
//   //res.json(program.program);
// };

module.exports = {
  getAllPrograms,
  renderCategories,
  renderProgramsByCategory,
  renderProgramsById,
  getProgramsFromUser,
  //getSpecificProgram,
};
