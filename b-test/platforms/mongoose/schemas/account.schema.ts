import mongoose, {Model, Schema, SchemaTypes} from 'mongoose';
import {IAccount} from "../../../definitions/accounts";

interface AccountModel extends mongoose.Model<IAccount> {
    // ajouter des fonctions au model par exemple
}

export const accountSchema: Schema = new Schema<IAccount>({
    login: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: SchemaTypes.String,
        required: true
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    }
}, {
    versionKey: false,
    timestamps: true,
    collection: "accounts"
});

export const AccountDAO  = mongoose.model<IAccount, AccountModel >('Account', accountSchema);