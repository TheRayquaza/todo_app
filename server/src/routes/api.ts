import express from "express";
import router_task from "./task";
import router_user from "./user";
import { auth } from "../middlewares/auth";

const router = express.Router();

// Auth of the user
router.use(auth);

//      /api/task
router.use("/task", router_task);
//      /api/user
router.use("/user", router_user);

export default router;