const app = require("./app"); // the actual Express application
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");
const express = require("express");

const server = http.createServer(app);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
