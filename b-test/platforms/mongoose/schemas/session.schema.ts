import mongoose, {Model, Schema, SchemaTypes} from "mongoose";
import {ISession} from "../../../definitions/sessions/session.definition";

export const sessionSchema: Schema = new Schema<ISession>({
    platform: {
        type: SchemaTypes.String
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }
}, {
    versionKey: false,
    collection: 'sessions',
    timestamps: true
});

export const SessionDAO : Model<ISession>= mongoose.model<ISession>('Session', sessionSchema);
