
import * as winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file';


const logFormat = winston.format.printf(({ timestamp, level, message, ...meta }) => {

    const log = {
        level,
        message,
        timestamp,
        ...meta
    };
    return JSON.stringify(log);
});

const consoleFormat = winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const timeStr = `\x1b[90m${timestamp}\x1b[0m`; 
    let log = `[${level}] ${timeStr} message: ${message}`;
    if (meta && Object.keys(meta).length > 0) {
        log += `\n\x1b[36mMetadata:\x1b[0m ${JSON.stringify(meta, null, 2)}`;
    }

    return log;
});

const logger = winston.createLogger(
    {
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            logFormat
        ),

        transports: [

            new DailyRotateFile({
                filename: 'logs/application-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '10m',
                maxFiles: '90d'
            }),


            new DailyRotateFile({
                filename: 'logs/error-%DATE%.log',
                level: 'error',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '30d'
            }),

            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    consoleFormat

                )
            })



        ],
    }
)

export default logger