//      /api/tasks

const express = require('express');
const router = express.Router();
const controller = require(path.join(__dirname, "/../controllers/tasks.js"));

//    [GET] /api/tasks
router.get('/', controller.get_tasks);
//    [GET] /api/tasks/:id
router.get('/:task_id', controller.get_task);
//    [DELETE] /api/tasks
router.delete('/', controller.delete_tasks);
//    [DELETE] /api/tasks/:id
router.delete('/:task_id', controller.delete_task);
//    [PUT] /api/tasks/:id
router.put("/:task_id", controller.put_task);
//    [POST] /api/tasks/
router.post("/", controller.post_user);


module.exports = router;