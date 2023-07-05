//      /api/task

import express, { Router } from "express";
import { get_task, get_tasks, delete_task, delete_tasks, put_task, post_task } from "../controllers/task";

const router = express.Router();

//    [GET] /api/task
router.get("/", get_tasks);
//    [GET] /api/task/:id
router.get("/:id", get_task);

//    [DELETE] /api/task
router.delete("/", delete_tasks);
//    [DELETE] /api/task/:id
router.delete("/:id", delete_task);

//    [PUT] /api/task/:id
router.put("/:id", put_task);
//    [POST] /api/task
router.post("/", post_task);


export default router;