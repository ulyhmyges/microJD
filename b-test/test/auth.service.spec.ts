import {AuthService} from "../platforms/services";
import {SecurityUtil} from "../platforms/utils";
import {MongooseUtil} from "../platforms/utils";
import {config} from "dotenv";
import {Schema} from 'mongoose';


config();

describe('auth.service.ts',function () {

    const authService: AuthService = new AuthService();
    let db: any;
    let account: any;

    beforeAll(async (): Promise<void> => {
        db = await MongooseUtil.openConnection();
    });

    beforeEach(() => {
        account = {
            email: "hello@esgi.fr",
            login: "world",
            password: "blockchain",
        };
    })


    it('findOne', async (): Promise<void> =>
    {
        const findOne =  await authService.findOne(account);
        account.password = SecurityUtil.toSHA512('blockchain');
        expect(findOne).toMatchObject(account);
    });

    it('findId', async () => {
        const findId = await authService.findId('653d22bf19a5e56d9a247ad3');
        account.password = SecurityUtil.toSHA512('blockchain');
        expect(findId).toMatchObject(account);
    })


    afterAll(async () => {
        await db.disconnect();
    })
})