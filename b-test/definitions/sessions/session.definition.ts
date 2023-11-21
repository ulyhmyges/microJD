import {IAccount} from "../accounts";
import {Schema, Types} from "mongoose";


export interface ISession {
    _id?: string,
    platform?: string,
    account: IAccount | string
}