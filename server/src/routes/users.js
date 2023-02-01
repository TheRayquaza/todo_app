//      /api/users

const express = require('express');
const router = express.Router();
const controller = require(path.join(__dirname, "/../controllers/users.js"));

//    [GET] /api/users
router.get('/', controller.get_users);
//    [GET] /api/users/:id
router.get('/:id', controller.get_user);
//    [DELETE] /api/users
router.delete('/', controller.delete_users);
//    [DELETE] /api/users/:id
router.delete('/:id', controller.delete_user);
//    [PUT] /api/users/:id
router.put("/:id", controller.put_user);
//    [POST] /api/users/
router.post("/", controller.post_user);


module.exports = router;