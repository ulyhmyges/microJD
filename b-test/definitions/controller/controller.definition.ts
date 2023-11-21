import {Router} from 'express';
export interface ExpressController {
    readonly _path: string,
    buildRoutes(): Router;
}