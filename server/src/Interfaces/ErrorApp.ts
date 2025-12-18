import { Url } from "url"


export class ErrorApp extends Error {

    constructor(
        public status: number,
        public message: string,
        public func?: string,
        public method?: "POST" | "GET" | "PATCH" | "PUT" | "DELETE",
        public reason?: string,
        public path?: Url | string,
        public data?: any) {
        super(message)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorApp);
        }

    }

}