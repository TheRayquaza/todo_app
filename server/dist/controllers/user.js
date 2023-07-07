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
exports.put_user = exports.post_user = exports.delete_user = exports.get_user = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const send_1 = require("../scripts/send");
const user_1 = require("../validators/user");
const logger_1 = require("../logger");
const user_2 = __importDefault(require("../db/user"));
const saltRound = 10;
// GET /api/user
const get_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.headers["X-id"];
    logger_1.controller_logger.info("Get user " + id);
    try {
        let user = yield user_2.default.findByPk(id, { attributes: { exclude: ["password_hash"] } });
        if (!user) {
            logger_1.controller_logger.info("Unable to get user with id " + id);
            (0, send_1.send_error)(res, 404, "Unable to get the user " + id);
        }
        else
            (0, send_1.send_result)(res, 200, user);
    }
    catch (err) {
        logger_1.controller_logger.error(err);
        (0, send_1.send_error)(res, 500, "Unable to access the db");
    }
});
exports.get_user = get_user;
// DELETE /api/user
const delete_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.controller_logger.info("Delete user");
    const id = req.headers["X-id"];
    try {
        const user = yield user_2.default.findByPk(id);
        if (!user)
            (0, send_1.send_error)(res, 404, "User not found");
        else {
            yield user.destroy();
            (0, send_1.send_success)(res);
        }
    }
    catch (err) {
        logger_1.controller_logger.error(err);
        (0, send_1.send_error)(res, 500, "Server error");
    }
});
exports.delete_user = delete_user;
// POST /api/user
// required in req.body : username, password, email
const post_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    let user, hash;
    logger_1.controller_logger.info("Post a new user with username " + username);
    if (!username || !password)
        (0, send_1.send_error)(res, 400, "Username and password required");
    else if (!(0, user_1.validate_password)(password))
        (0, send_1.send_error)(res, 401, "Password did not meet expectations");
    else if (!(0, user_1.validate_username)(username))
        (0, send_1.send_error)(res, 401, "Username did not meet expectations");
    else if (!(0, user_1.validate_email)(email))
        (0, send_1.send_error)(res, 401, "Email did not meet expectations");
    else {
        try {
            user = yield user_2.default.findOne({ where: { username: username } });
            if (user)
                (0, send_1.send_error)(res, 409, "Username already taken");
            else {
                hash = yield bcrypt_1.default.hash(password, saltRound);
                user = new user_2.default({
                    id: null,
                    username: username,
                    email: email,
                    password_hash: hash,
                    last_connection: new Date(),
                    creation_date: new Date()
                });
                yield user.save();
                (0, send_1.send_result)(res, 201, {
                    id: user.dataValues.id,
                    username: user.dataValues.username,
                    email: user.dataValues.email,
                    last_connection: user.dataValues.last_connection,
                    creation_date: user.dataValues.creation_date
                });
            }
        }
        catch (err) {
            logger_1.controller_logger.error(err);
            (0, send_1.send_error)(res, 500, "Unable to access the db");
        }
    }
});
exports.post_user = post_user;
// PUT /api/user
// optional in req.body : username, password
const put_user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_modified = parseInt(req.params.id, 10);
        const id = parseInt(req.headers["X-id"], 10);
        const user = yield user_2.default.findByPk(id);
        const { username, password, email } = req.body;
        logger_1.controller_logger.info("Put user " + id);
        if (!user) {
            (0, send_1.send_error)(res, 404, "User not found");
        }
        else {
            const update_values = {};
            if (password) {
                if ((0, user_1.validate_password)(password)) {
                    update_values["password"] = yield bcrypt_1.default.hash(password, saltRound);
                }
                else {
                    (0, send_1.send_error)(res, 400, "Password did not meet expectations");
                    return;
                }
            }
            if (email) {
                if ((0, user_1.validate_password)(email)) {
                    update_values["email"] = yield bcrypt_1.default.hash(email, saltRound);
                }
                else {
                    (0, send_1.send_error)(res, 400, "Email did not meet expectations");
                    return;
                }
            }
            if (username) {
                if ((0, user_1.validate_username)(username)) {
                    const any_user = yield user_2.default.findOne({ where: { username: username } });
                    if (!any_user) {
                        update_values["username"] = username;
                    }
                    else {
                        (0, send_1.send_error)(res, 409, "Username already taken");
                        return;
                    }
                }
                else {
                    (0, send_1.send_error)(res, 400, "Username did not meet expectations");
                    return;
                }
            }
            yield user.update(update_values);
            (0, send_1.send_result)(res, 200, {
                id: user.dataValues.id,
                username: user.dataValues.username,
                email: user.dataValues.email,
                last_connection: user.dataValues.last_connection,
                creation_date: user.dataValues.creation_date
            });
        }
    }
    catch (err) {
        logger_1.controller_logger.error(err);
        (0, send_1.send_error)(res, 500, "Server error");
    }
});
exports.put_user = put_user;
//# sourceMappingURL=user.js.map