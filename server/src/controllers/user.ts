import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { send_error, send_result, send_success } from "../scripts/send";
import {validate_email, validate_password, validate_username} from "../validators/user";
import { controller_logger } from "../logger";
import User from "../db/user";

const saltRound = 10;

// GET /api/user
export const get_user = async (req: Request, res: Response): Promise<void> => {
    const id = req.headers["X-id"] as string;
    controller_logger.info("Get user " + id);

    try {
        let user = await User.findByPk(id, {attributes: {exclude: ["password_hash"]}});
        if (!user) {
            controller_logger.info("Unable to get user with id " + id);
            send_error(res, 404, "Unable to get the user " + id);
        } else
            send_result(res, 200, user);
    } catch (err) {
        controller_logger.error(err);
        send_error(res, 500, "Unable to access the db");
    }
};

// DELETE /api/user
export const delete_user = async (req: Request, res: Response): Promise<void> => {
    controller_logger.info("Delete user");
    const id = req.headers["X-id"] as string;

    try {
        const user : User | null = await User.findByPk(id);
        if (!user)
            send_error(res, 404, "User not found");
        else {
            await user.destroy();
            send_success(res);
        }
    } catch (err) {
        controller_logger.error(err);
        send_error(res, 500, "Server error");
    }
};

// POST /api/user
// required in req.body : username, password, email
export const post_user = async (req: Request, res: Response): Promise<void> => {
    const { username, password, email } = req.body;
    let user: User | null, hash: string;
    controller_logger.info("Post a new user with username " + username);

    if (!username || !password)
        send_error(res, 400, "Username and password required");
    else if (!validate_password(password))
        send_error(res, 401, "Password did not meet expectations");
    else if (!validate_username(username))
        send_error(res, 401, "Username did not meet expectations");
    else if (!validate_email(email))
        send_error(res, 401, "Email did not meet expectations");
    else {
        try {
            user = await User.findOne({where: {username: username}});
            if (user)
                send_error(res, 409, "Username already taken");
            else {
                hash = await bcrypt.hash(password, saltRound);
                user = new User({
                    id: null,
                    username: username,
                    email : email,
                    password_hash: hash,
                    last_connection: new Date(),
                    creation_date: new Date()
                });
                await user.save();
                send_result(res, 201, {
                    id: user.dataValues.id,
                    username: user.dataValues.username,
                    email: user.dataValues.email,
                    last_connection: user.dataValues.last_connection,
                    creation_date: user.dataValues.creation_date
                });
            }
        } catch (err) {
            controller_logger.error(err);
            send_error(res, 500, "Unable to access the db");
        }
    }
};

// PUT /api/user
// optional in req.body : username, password
export const put_user = async (req: Request, res: Response): Promise<void> => {
    try {
        const id_modified: number = parseInt(req.params.id, 10);
        const id: number = parseInt(req.headers["X-id"] as string, 10);

        const user: User | null = await User.findByPk(id);

        const { username, password, email } = req.body;

        controller_logger.info("Put user " + id);

        if (!user) {
            send_error(res, 404, "User not found");
        } else {
            const update_values: any = {};

            if (password) {
                if (validate_password(password)) {
                    update_values["password"] = await bcrypt.hash(password, saltRound);
                } else {
                    send_error(res, 400, "Password did not meet expectations");
                    return;
                }
            }

            if (email) {
                if (validate_password(email)) {
                    update_values["email"] = await bcrypt.hash(email, saltRound);
                } else {
                    send_error(res, 400, "Email did not meet expectations");
                    return;
                }
            }

            if (username) {
                if (validate_username(username)) {
                    const any_user: User | null = await User.findOne({ where: { username: username } });
                    if (!any_user) {
                        update_values["username"] = username;
                    } else {
                        send_error(res, 409, "Username already taken");
                        return;
                    }
                } else {
                    send_error(res, 400, "Username did not meet expectations");
                    return;
                }
            }

            await user.update(update_values);
            send_result(res, 200, {
                id: user.dataValues.id,
                username: user.dataValues.username,
                email: user.dataValues.email,
                last_connection: user.dataValues.last_connection,
                creation_date: user.dataValues.creation_date
            });
        }
    } catch (err) {
        controller_logger.error(err);
        send_error(res, 500, "Server error");
    }
};
