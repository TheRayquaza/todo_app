"use strict";
//      /api/user
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
//    [GET] /api/user
router.get("/", user_1.get_user);
//    [DELETE] /api/user
router.delete("/", user_1.delete_user);
//    [PUT] /api/user
router.put("/", user_1.put_user);
//    [POST] /api/user
router.post("/", user_1.post_user);
exports.default = router;
//# sourceMappingURL=user.js.map