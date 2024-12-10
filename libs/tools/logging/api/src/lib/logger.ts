import {ConsoleLogger, Injectable, Scope} from '@nestjs/common';
import log4js from 'log4js';

@Injectable({scope: Scope.TRANSIENT})
export class Logger extends ConsoleLogger {
    public static debug(context: string, message: string,) {
        //  super.debug.apply(message, context);
        Logger.instance.debug(message, context);
    }

    public static log(context: string, message: string,) {
        // super.log(message, context);
        console.log(message,);
        Logger.instance.log(`[${context}]`, message);
    }

    // tslint:disable-next-line:no-any
    public static error(context: string, message: string, trace?: any) {
        // add your tailored logic here
        // super.error(message, trace);
        console.error(message);
        Logger.instance.error(`[${context}]`, message, trace);
    }

    public static warn(context: string, message: string) {
        // add your tailored logic here
        //   super.warn(message, context);
        console.warn(message);
        Logger.instance.warn(`[${context}]`, message);
    }

    private readonly _logger: log4js.Logger;
    private static instance: Logger

    private constructor() {
        super();
        const logDir = process.env['LOG_DIR'] ?? 'logs';
        console.log('logDir:', logDir);
        log4js.configure({
            appenders: {app: {type: "file", filename: `${logDir}/app.log`}},
            categories: {default: {appenders: ["app"], level: "info"}},
        });

        this._logger = log4js.getLogger('app');
    }

    public static init() {
        if (!Logger.instance) {
            Logger.instance = new Logger()
        }

        return Logger.instance
    }

    public override debug(message: string, context: string) {
        super.log(message, context);
        this._logger.debug(message, context);
        this._logger.message(`[${context}]`, message);
    }

    public override log(message: string, context: string) {
        super.log(message, context);
        this._logger.log(`[${context}]`, message);
    }

    public override error(message: string, stack?: string, context?: string) {
        // add your tailored logic here
        super.error(message, stack, context);
        this._logger.error(`[${context}]`, message, stack);
    }

    public override warn(message: string, context: string) {
        // add your tailored logic here
        super.warn(message, context);
        this._logger.warn(`[${context}]`, message);
    }


}
