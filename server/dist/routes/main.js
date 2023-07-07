"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./api"));
const login_1 = require("../controllers/login");
const register_1 = require("../controllers/register");
const send_1 = require("../scripts/send");
const error_handler_1 = require("../middlewares/error_handler");
const cors_extended_1 = require("../middlewares/cors_extended");
const flow_logger_1 = require("../middlewares/flow_logger");
const router = express_1.default.Router();
// Body parser
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: true }));
// Middlewares
router.use(error_handler_1.error_handler);
router.use(cors_extended_1.cors_extended);
router.use(flow_logger_1.flow_logger);
//      /api
router.use("/api", api_1.default);
//      /login
router.post("/login", login_1.login);
//      /register
router.post("/register", register_1.register);
router.get("*", (req, res) => (0, send_1.send_error)(res, 404, "Not found"));
router.put("*", (req, res) => (0, send_1.send_error)(res, 405, "Not allowed"));
router.post("*", (req, res) => (0, send_1.send_error)(res, 405, "Not allowed"));
router.delete("*", (req, res) => (0, send_1.send_error)(res, 404, "Not found"));
exports.default = router;
//# sourceMappingURL=main.js.map