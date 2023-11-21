import {IAccount} from "../../definitions/accounts";
import {isValidObjectId, Model} from "mongoose";
import {ISession} from "../../definitions/sessions/session.definition";
import {AccountDAO, SessionDAO} from "../mongoose/schemas";
import {SecurityUtil} from "../utils";
import {NextFunction} from "express";

export class AuthService {

    private readonly accountDAO: Model<IAccount>;
    private readonly sessionDAO: Model<ISession>;

    constructor() {
        this.accountDAO = AccountDAO;
        this.sessionDAO = SessionDAO;
    }

    async create(account: IAccount): Promise<IAccount | null> {
        try{
            return await this.accountDAO.create({
                login: account.login,
                password: SecurityUtil.toSHA512(account.password),
                email: account.email
            });
        } catch (e: unknown) {
            console.error("create: ", e)
            return null;
        }
    }

    async delete(filter: object) {
        try {
            return await this.accountDAO.deleteOne(filter);
        }catch (e: unknown) {
            console.log("delete: ", e)
            return null;
        }
    }

    async update(filter: object, account: IAccount): Promise<IAccount | null> {
        try {
            account.password = SecurityUtil.toSHA512(account.password);
            return await this.accountDAO.findByIdAndUpdate(filter, account);
        } catch (e: unknown) {
            console.error("update: ", e)
            return null;
        }
    }

    async findOne(account: IAccount): Promise<IAccount | null> {
        try {
            return await this.accountDAO.findOne({
                login: account.login,
                password: SecurityUtil.toSHA512(account.password),
                email: account.email
            }).exec();
        } catch (e: unknown) {
            console.error("findOne: ", e)
            return null
        }
    }

    async findId(id: string): Promise<IAccount | null> {
        try {
            return await this.accountDAO.findById(id).exec();
        } catch (e: unknown) {
            console.error("findId: ", e)
            return null;
        }
    }

    async find(): Promise<IAccount[] | null> {
        try {
            return await this.accountDAO.find().exec();
        } catch (e: unknown) {
            console.error("find: ", e)
            return null;
        }
    }

    async createSession(account: IAccount, platform?: string): Promise<ISession | null> {
        try {
            return await this.sessionDAO.create({
                platform,
                account: account._id
            })
        } catch (e: unknown) {
            console.log("createSession: ", e)
            return null;
        }
    }

    async findSession(token: string): Promise<ISession | null> {
        if (!isValidObjectId(token)){
            return null;
        }
        return this.sessionDAO.findOne({_id: token}).populate('account').exec();
    }

}