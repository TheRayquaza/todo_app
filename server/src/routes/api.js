//      /api
const express = require('express');
const router = express.Router();

// ROUTERS

const router_tasks = require(path.join(__dirname, "tasks.js"));


//      /api/tasks
router.use('/tasks', router_tasks);
//      /api/users
router.use('/users', router_users);

module.exports = router;