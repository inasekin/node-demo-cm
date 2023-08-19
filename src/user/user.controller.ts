import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import 'reflect-metadata';

@injectable()
export class UserController extends BaseController {
    constructor(@inject(TYPES.ILogger) private loggerService: LoggerService) {
        super(loggerService);
        this.bindRoutes([
            { path: 'registration', method: 'post', func: this.registration },
            { path: 'login', method: 'post', func: this.login },
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'login');
    }

    registration(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'registration');
    }
}
