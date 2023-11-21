import {Response} from "express";

export class ExpressUtil {

    public static unauthorized(res: Response){
        res.status(401).end("unauthorized 401 --")
    }
    public static unauthorized2(res: Response){
        res.status(401).end("unauthorized 401 second if")
    }

    public static badrequest(res: Response){
        res.status(400).end("Bad Request");
    }

    public static internalServerError(res: Response) {
        res.status(500).end('internal server error')
    }
}