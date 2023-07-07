import { Request, Response } from "express";
import { middleware_logger } from "../logger";
import {send_error, send_result, send_success} from "../scripts/send";
import Task from "../db/task";

// GET /api/task/{id}
export const get_task = async (req: Request, res: Response) => {
    middleware_logger.info("get task");
    const id = req.params.id;

    try {
        const task : Task | null = await Task.findByPk(id);
        if (task === null)
            send_error(res, 404, "Task " + id + " not found");
        else if (task.dataValues.user_id !== parseInt(req.headers["X-id"] as string, 10))
            send_error(res, 403, "You are not authorized to access this task");
        else
            send_result(res, 200, task);
    } catch (err) {
        middleware_logger.error(err);
        send_error(res, 500, "Server error");
    }
}

// GET /api/task
export const get_tasks = async (req: Request, res: Response) => {
    middleware_logger.info("get tasks");
    const user_id: string  = req.headers["X-id"] as string;

    try {
        const tasks: Task[] = await Task.findAll({ where : { user_id: user_id }});
        send_result(res, 200, tasks);
    } catch (err) {
        middleware_logger.error(err);
        send_error(res, 500, "Server error");
    }
}

// POST /api/task
export const post_task = async (req: Request, res: Response) => {
    middleware_logger.info("post task");
    const user_id : string = req.headers["X-id"] as string;

    try {
        const { title, description, priority, deadline } = req.body;
        const user_id_number : number = parseInt(user_id, 10);
        const task = await Task.create({
            title: title,
            description: description,
            priority: priority === undefined ? 0 : priority,
            deadline: deadline === undefined ? null : deadline,
            done : false,
            user_id: user_id_number
        });
        await task.save();
        send_result(res, 201, task);
    } catch (err) {
        middleware_logger.error(err);
        send_error(res, 500, "Server error");
    }
}

// PUT /api/task/{id}
export const put_task = async (req: Request, res: Response) => {
    middleware_logger.info("put task");
    const id : string = req.params.id;

    try {
        const { title, description, done, priority, deadline } = req.body;
        const task : Task | null = await Task.findByPk(id);
        if (task === null)
            send_error(res, 404, "Task " + id + " not found");
        else if (task.dataValues.user_id !== parseInt(req.headers["X-id"] as string, 10))
            send_error(res, 403, "You are not the owner of this task");
        else {
            if (title) task.setDataValue("title", title);
            if (description) task.setDataValue("description", description);
            task.setDataValue("done", done);
            if (priority) task.setDataValue("priority", priority);
            if (deadline) task.setDataValue("deadline", deadline);
            await task.save();
            send_success(res, 200);
        }
    } catch (err) {
        middleware_logger.error(err);
        send_error(res, 500, "Server error");
    }
}

// DELETE /api/task/{id}
export const delete_task = async (req: Request, res: Response) => {
    middleware_logger.info("delete task");
    const id = req.params.id;

    try {
        const task : Task  | null = await Task.findByPk(id);
        if (task === null)
            send_error(res, 404, "Task " + id + " not found");
        else if (task.dataValues.user_id !== parseInt(req.headers["X-id"] as string, 10))
            send_error(res, 403, "You are not allowed to delete this task");
        else {
            await task.destroy();
            send_success(res, 200);
        }
    } catch (err) {
        middleware_logger.error(err);
        send_error(res, 500, "Server error");
    }
}

// DELETE /api/task
export const delete_tasks = async (req: Request, res: Response) => {
    middleware_logger.info("delete tasks");
    const user_id: string  = req.headers["X-id"] as string;

    try {
        const tasks : Task[] = await Task.findAll({ where : { user_id: user_id }});
        if (tasks.length === 0)
            send_error(res, 404, "No task not found");
        else {
            await Task.destroy({ where : { user_id: user_id }});
            send_success(res, 200);
        }
    } catch (err) {
        middleware_logger.error(err);
        send_error(res, 500, "Server error");
    }
}