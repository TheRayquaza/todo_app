import { NextFunction, Request, Response } from "express";

export const error_handler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && "body" in err)
        res.status(400).json({ error: "Invalid JSON" });
    else
        res.status(500).json({ error: err.message || "Internal Server Error" });
};