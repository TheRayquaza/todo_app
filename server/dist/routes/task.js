"use strict";
//      /api/task
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = require("../controllers/task");
const router = express_1.default.Router();
//    [GET] /api/task
router.get("/", task_1.get_tasks);
//    [GET] /api/task/:id
router.get("/:id", task_1.get_task);
//    [DELETE] /api/task
router.delete("/", task_1.delete_tasks);
//    [DELETE] /api/task/:id
router.delete("/:id", task_1.delete_task);
//    [PUT] /api/task/:id
router.put("/:id", task_1.put_task);
//    [POST] /api/task
router.post("/", task_1.post_task);
exports.default = router;
//# sourceMappingURL=task.js.map