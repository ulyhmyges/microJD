import {Mongoose, connect} from "mongoose";

export class MongooseUtil {
    public static openConnection(): Promise<Mongoose> {
        return connect(process.env.MONGO_URI as string, {
            authSource: 'admin',
            autoCreate: true,
            auth: {
                username: process.env.MONGO_USERNAME,
                password: process.env.MONGO_PASSWORD
            }
        })
    }
}