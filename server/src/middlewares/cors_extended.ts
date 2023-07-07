import { NextFunction, Request, Response } from "express";

export const cors_extended = (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    // Check if the request is an OPTIONS request (preflight request)
    if (req.method === "OPTIONS") {
        // Add the necessary headers for the preflight request
        res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.status(204).send();
        return;
    }

    next();
};
