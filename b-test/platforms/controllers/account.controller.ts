import {AuthService} from "../services";
import * as express from 'express';
import {Request, Response} from "express";
import {checkAuthToken} from "../middleware";
import {ExpressUtil} from "../utils";
import {ExpressController} from "../../definitions/controller";

export class AccountController implements ExpressController {
    readonly _path: string;
    readonly _authService: AuthService;

    constructor() {
        this._path = '/auth';
        this._authService = new AuthService();
    }

    public buildRoutes(): express.Router {
        const router = express.Router();
        router.get('/', (req: Request, res: Response) => {
            res.send('Hello world!')
        });
        router.post('/subscribe', express.json(), this.subscribe.bind(this));
        router.get('/accounts/:id', express.json(), this.getAccount.bind(this));
        router.put('/accounts/:id', express.json(), this.updateAccount.bind(this));
        router.delete('/accounts/:id', express.json(), this.deleteAccount.bind(this));
        router.get('/accounts', express.json(), this.getAll.bind(this));
        router.get('/me', checkAuthToken(), this.me.bind(this));
        router.post('/login', express.json(), this.login.bind(this));

        return router;
    }

    async login(req: Request, res: Response): Promise<void> {
        const account = await this._authService.findOne({
            login: req.body.login,
            password: req.body.password,
            email: req.body.email
        });
        if (!account){
            return ExpressUtil.unauthorized(res);
        }
        const platform = req.headers["user-agent"];
        const session = await this._authService.createSession(account, platform);
        if (!session){
            return ExpressUtil.internalServerError(res)
        }
        res.json({token: session?._id})
    }
    async me(req: Request, res: Response){
        console.log("me::", req.account)
        res.json(req.account)
    }

    async deleteAccount(req: Request, res: Response) {
        const deleteResult = await this._authService.delete({_id: req.params.id})
        console.log("deleteResult:", deleteResult);
        res.status(202).json(deleteResult);
    }

    async updateAccount(req: Request, res: Response) {
        await this._authService.update(
            {_id: req.params.id},
            {
                login: req.body.login,
                password: req.body.password,
                email: req.body.email
            }
        );
        const updated = await this._authService.findId(req.params.id)
        res.json(updated);
    }

    async getAccount(req: Request, res: Response) {
        const account = await this._authService.findId(req.params.id);
        res.json(account);
    }

    async subscribe(req: Request, res: Response) {
        const account = await this._authService.create(
            {
                login: req.body.login,
                password: req.body.password,
                email: req.body.email
            }
        )
        res.status(201).json(account);
    }

    async getAll(req: Request, res: Response) {
        const accounts = await this._authService.find();
        res.json(accounts)
    }

}