import { Response, NextFunction, Request } from "express"
import { middleware_logger }  from "../logger"
import  { verify_jwt, TokenPayload } from "../scripts/jwt"
import { send_error } from "../scripts/send"

export const auth = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    middleware_logger.info("authentication");

    try {
        const token : string | undefined = req.headers.authorization?.split(" ")[1];
        if (!token)
            send_error(res, 401, "No token provided");
        else {
            const decoded: TokenPayload = await verify_jwt(token);
            if (!decoded)
                send_error(res, 401, "Invalid token");
            else {
                req.headers["X-id"] = decoded.id.toString();
                req.headers["X-username"] = decoded.username;
                next();
            }
        }
    } catch (err) {
        middleware_logger.error(err);
        send_error(res, 401, "Invalid token");
    }
}