import { Request, Response, NextFunction } from 'express';
declare const verifyJWT: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default verifyJWT;
//# sourceMappingURL=verifyJWT.d.ts.map