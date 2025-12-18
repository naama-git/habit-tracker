import { IncomingMessage, ServerResponse } from 'http'
import morgan, { TokenIndexer } from 'morgan'
import logger from '../config/logger'


export const morganMiddleware = morgan((tokens: TokenIndexer<IncomingMessage, ServerResponse>, req: IncomingMessage, res: ServerResponse) => {
    const text =
        [
            tokens.method?.(req, res),
            tokens.url?.(req, res),
            tokens.status?.(req, res),
            tokens['response-time']?.(req, res), 'ms'

        ].join(' ')
    return text
},
    {
        stream: {
            write: (message) => {

                const parts = message.trim().split(' ');
                const status = parseInt(parts[2] ?? "0");
                if (status >= 500) {
                    logger.error(message.trim())
                }
                else if (status >= 400 && status < 500){
                    logger.warn(message.trim())
                }
                else {
                    logger.info(message.trim())
                }
            }
        }
    }
)



