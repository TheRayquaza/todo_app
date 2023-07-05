//      /api/user

import express from "express";
import { get_user, delete_user, put_user, post_user } from "../controllers/user";

const router = express.Router();

//    [GET] /api/user
router.get("/", get_user);
//    [DELETE] /api/user
router.delete("/", delete_user);
//    [PUT] /api/user
router.put("/", put_user);
//    [POST] /api/user
router.post("/", post_user);


export default router;