const express = require('express')
const path = require('path');

const app = express()
const router = require(path.join(__dirname, "/routes/index.js"));
const config = require(path.join(__dirname, "/config/server.js"));

// Middlewares
const middleware_make_response = require(path.join(__dirname, "/middlewares/make_response.js"));
const middleware_send_response = require(path.join(__dirname, "/middlewares/send_response.js"));

app.listen(config.port, () => console.log(`Server is now listenning to ${config.port}!`));
// Main route of the app
app.use(middleware_make_response, router, middleware_send_response);

module.exports = app;
