import { NextFunction, Request, Response } from 'express'

const errorHandler = (
    err: Error | undefined,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof Error) {
        const message = err.message

        return res.status(500).json({ message })
    }
    if (err) return res.status(500)
    next()
}

export default errorHandler
