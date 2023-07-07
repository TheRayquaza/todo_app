"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_tasks = exports.delete_task = exports.put_task = exports.post_task = exports.get_tasks = exports.get_task = void 0;
const logger_1 = require("../logger");
const send_1 = require("../scripts/send");
const task_1 = __importDefault(require("../db/task"));
// GET /api/task/{id}
const get_task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.middleware_logger.info("get task");
    const id = req.params.id;
    try {
        const task = yield task_1.default.findByPk(id);
        if (task === null)
            (0, send_1.send_error)(res, 404, "Task " + id + " not found");
        else if (task.dataValues.user_id !== parseInt(req.headers["X-id"], 10))
            (0, send_1.send_error)(res, 403, "You are not authorized to access this task");
        else
            (0, send_1.send_result)(res, 200, task);
    }
    catch (err) {
        logger_1.middleware_logger.error(err);
        (0, send_1.send_error)(res, 500, "Server error");
    }
});
exports.get_task = get_task;
// GET /api/task
const get_tasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.middleware_logger.info("get tasks");
    const user_id = req.headers["X-id"];
    try {
        const tasks = yield task_1.default.findAll({ where: { user_id: user_id } });
        (0, send_1.send_result)(res, 200, tasks);
    }
    catch (err) {
        logger_1.middleware_logger.error(err);
        (0, send_1.send_error)(res, 500, "Server error");
    }
});
exports.get_tasks = get_tasks;
// POST /api/task
const post_task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.middleware_logger.info("post task");
    const user_id = req.headers["X-id"];
    try {
        const { title, description, priority, deadline } = req.body;
        const user_id_number = parseInt(user_id, 10);
        const task = yield task_1.default.create({
            title: title,
            description: description,
            priority: priority === undefined ? 0 : priority,
            deadline: deadline === undefined ? null : deadline,
            done: false,
            user_id: user_id_number
        });
        yield task.save();
        (0, send_1.send_result)(res, 201, task);
    }
    catch (err) {
        logger_1.middleware_logger.error(err);
        (0, send_1.send_error)(res, 500, "Server error");
    }
});
exports.post_task = post_task;
// PUT /api/task/{id}
const put_task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.middleware_logger.info("put task");
    const id = req.params.id;
    try {
        const { title, description, done, priority, deadline } = req.body;
        const task = yield task_1.default.findByPk(id);
        if (task === null)
            (0, send_1.send_error)(res, 404, "Task " + id + " not found");
        else if (task.dataValues.user_id !== parseInt(req.headers["X-id"], 10))
            (0, send_1.send_error)(res, 403, "You are not the owner of this task");
        else {
            if (title)
                task.setDataValue("title", title);
            if (description)
                task.setDataValue("description", description);
            task.setDataValue("done", done);
            if (priority)
                task.setDataValue("priority", priority);
            if (deadline)
                task.setDataValue("deadline", deadline);
            yield task.save();
            (0, send_1.send_success)(res, 200);
        }
    }
    catch (err) {
        logger_1.middleware_logger.error(err);
        (0, send_1.send_error)(res, 500, "Server error");
    }
});
exports.put_task = put_task;
// DELETE /api/task/{id}
const delete_task = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.middleware_logger.info("delete task");
    const id = req.params.id;
    try {
        const task = yield task_1.default.findByPk(id);
        if (task === null)
            (0, send_1.send_error)(res, 404, "Task " + id + " not found");
        else if (task.dataValues.user_id !== parseInt(req.headers["X-id"], 10))
            (0, send_1.send_error)(res, 403, "You are not allowed to delete this task");
        else {
            yield task.destroy();
            (0, send_1.send_success)(res, 200);
        }
    }
    catch (err) {
        logger_1.middleware_logger.error(err);
        (0, send_1.send_error)(res, 500, "Server error");
    }
});
exports.delete_task = delete_task;
// DELETE /api/task
const delete_tasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.middleware_logger.info("delete tasks");
    const user_id = req.headers["X-id"];
    try {
        const tasks = yield task_1.default.findAll({ where: { user_id: user_id } });
        if (tasks.length === 0)
            (0, send_1.send_error)(res, 404, "No task not found");
        else {
            yield task_1.default.destroy({ where: { user_id: user_id } });
            (0, send_1.send_success)(res, 200);
        }
    }
    catch (err) {
        logger_1.middleware_logger.error(err);
        (0, send_1.send_error)(res, 500, "Server error");
    }
});
exports.delete_tasks = delete_tasks;
//# sourceMappingURL=task.js.map