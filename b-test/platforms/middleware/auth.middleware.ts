import {IAccount} from "../../definitions/accounts";
import {NextFunction, Request, RequestHandler, Response} from "express";
import {ExpressUtil} from "../utils/express.util";
import {AuthService} from "../services/auth.service";

declare module 'express' {
    export interface Request {
        account?: IAccount
    }
}

export function checkAuthToken(): RequestHandler {
    return async function (req: Request, res: Response, next){
        const authorization = req.headers['authorization']
        if (authorization == undefined) {
            return ExpressUtil.unauthorized(res);
        }
        const parts = authorization.split(' ');
        if (parts.length !== 2 || parts[0] !== "Bearer"){
            return ExpressUtil.unauthorized(res);
        }

        const token = parts[1];
        const authService = new AuthService();
        const session = await authService.findSession(token);
        if (!session){
            return ExpressUtil.unauthorized2(res);
        }
        // adding account in Request
        req.account = session.account as IAccount;
        next();
    }

}