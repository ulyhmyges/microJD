import {config} from 'dotenv';
import * as express from 'express';
import {Request, Response} from "express";
import {AccountController} from "./platforms/controllers";
import {ExpressController} from "./definitions/controller";
import {MongooseUtil} from "./platforms/utils";
import mongoose, {Mongoose} from "mongoose";


config(); // load env vars

async function main() {

    // connection to MongoDB
    mongoose.connection?.on('connected', () => console.log("Mongoose connection open"))
    mongoose.connection?.on('disconnected', () => console.log("Mongoose connection disconnected"))
    process.on('SIGINT', () => {
        mongoose.connection.close()
        console.info("\nMongoose connection disconnected through app termination")
        process.exit(0)
    });
    const db: Mongoose = await MongooseUtil.openConnection();


    // open server HTTP
    const app = express();
    const controllers: ExpressController[] = [
        new AccountController()
    ];

    for (let i = 0; i < controllers.length; i += 1) {
        app.use(controllers[i]._path, controllers[i].buildRoutes())
    }

    app.get('/', (req: Request, res: Response) => {
        res.send("<h2>hello, I'm back</h2>");
    })
    app.listen(process.env.PORT, () => console.log(`listen on port ${process.env.PORT}`))

    /*
    const nodemailer =require('nodemailer');
    let transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        service: 'Outlook365',
        port: 587,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false
        }
    });
    await transporter.sendMail({
        from: 'htemal@myges.fr',
        to: 'htemal@myges.fr',
        subject: 'testing nodemailer',
        text: "Hello world!"
    })
     */


}

main().catch(console.error);
