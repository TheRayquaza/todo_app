import { NextFunction, Response, Request } from "express";
import { middleware_logger } from "../logger";

export const flow_logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`REQUEST > ${req.method} ${req.originalUrl} ${res.statusCode}}`);
    res.on('finish', () => console.log(`RESPONSE > ${req.method} ${req.originalUrl} ${res.statusCode}}`));
    next();
}