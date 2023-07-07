"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = __importDefault(require("./task"));
const user_1 = __importDefault(require("./user"));
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
// Auth of the user
router.use(auth_1.auth);
//      /api/task
router.use("/task", task_1.default);
//      /api/user
router.use("/user", user_1.default);
exports.default = router;
//# sourceMappingURL=api.js.map