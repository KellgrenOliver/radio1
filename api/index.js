const express = require("express");
const path = require("path");

const channelRoutes = require("./routes/channelRoutes");
const channelPrefix = "/api/v1/channels";

const programRoutes = require("./routes/programRoutes");
const programPrefix = "/api/v1/programs";

const userRoutes = require("./routes/userRoutes");
const userPrefix = "/api/v1/user";

const port = 3001;
// Server setup
const app = express();

// Make sure the server can read the req.body object
app.use(express.json());

// Express-session setup (comes later)

// Routes setup goes underneath here...
app.use(channelPrefix, channelRoutes);
app.use(programPrefix, programRoutes);
app.use(userPrefix, userRoutes);

// Serve static files, makes the frontend files "available" to the backend
app.use(express.static(path.join(__dirname, "../build")));

// Starts the server
app.listen(port, (err) => {
  if (err) {
    console.error("The server could not be started...");
    console.log(err);
    return;
  }
  console.log(`Listening on port ${port}`);
});

process.on("uncaughtException", function (err) {
  console.log(err);
});
