import express, { Request, Response } from "express";
import router_api from "./api";
import { login } from "../controllers/login";
import { register } from "../controllers/register";
import { send_error } from "../scripts/send";
import { error_handler } from "../middlewares/error_handler";

const router = express.Router();

// Body parser
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(error_handler);

//      /api
router.use("/api", router_api);
//      /login
router.post("/login", login);
//      /register
router.post("/register", register);

router.get("*", (req : Request, res : Response) => send_error(res, 404, "Not found"));
router.put("*", (req : Request, res : Response) => send_error(res, 405, "Not allowed"));
router.post("*", (req : Request, res : Response) => send_error(res, 405, "Not allowed"));
router.delete("*", (req : Request, res : Response) => send_error(res, 404, "Not found"));


export default router;