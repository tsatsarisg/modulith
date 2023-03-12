import { NextFunction, Request, Response } from 'express'

const handleCallback = (callback: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await callback(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

export default handleCallback
