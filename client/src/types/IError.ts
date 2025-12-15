
export interface IError {
    message?: string | null
    status?: number | null
    errors?: ValidationError[] | null
}

export type ValidationError = {
    type: 'field' | 'unknown' | 'alternative' | 'alternative_grouped';
    msg: string | null;
    path: string;
    location: 'body' | 'query' | 'params' | 'headers' | 'cookies';
    value: any;
}

