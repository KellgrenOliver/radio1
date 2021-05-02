const fetch = require("node-fetch");
const json = "format=json";
const paginationFalse = "pagination=false";
const sqlite3 = require("sqlite3");
const path = require("path");
const db = new sqlite3.Database(path.join(__dirname, "../radio.db"));

const getAllChannels = async (req, res) => {
  let channels = await fetch(
    `http://api.sr.se/api/v2/channels?${json}&${paginationFalse}`
  );
  channels = await channels.json();
  res.json(channels.channels);
};

const getChannelById = async (req, res) => {
  let channel = await fetch(
    `http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}`
  );
  channel = await channel.json();
  res.json(channel);
};

const todayDate = new Date().toISOString().slice(0, 10);

const getChannelSchedule = async (req, res) => {
  let channelSchedule = await fetch(
    `http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelId=${req.params.channelId}&date=${todayDate}`
  );
  channelSchedule = await channelSchedule.json();
  res.json(channelSchedule.schedule);
};

const getChannelsFromUser = async (req, res) => {
  let query = `SELECT channels FROM user WHERE email = $email`;
  let params = { $email: req.params.email };
  db.all(query, params, async (err, row) => {
    if (err) {
      console.log("Error message db:");
      console.error(err.message);
    }
    let channels = row[0].channels;
    channels.length > 0 ? res.json(JSON.parse(channels)) : res.json(channels);
  });
};

module.exports = {
  getAllChannels,
  getChannelById,
  getChannelSchedule,
  getChannelsFromUser,
};
