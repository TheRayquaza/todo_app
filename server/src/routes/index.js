//      /
const express = require('express');
const router = express.Router();

// ROUTERS

const router_api = require(path.join(__dirname, "api.js"));

// MIDDLEWARES

const middleware_login = require(path.join(__dirname, "/../middlewares/login.js"));
const middleware_register = require(path.join(__dirname, "/../middlewares/register.js"));

//      /api
router.use('/api', router_api);
//      /login
router.get('/login', middleware_login);
//      /register
router.get('/register', middleware_register);


module.exports = router;