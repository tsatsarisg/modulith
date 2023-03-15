import { NextFunction, Request, Response } from 'express'
import { OperationalError } from '../utils/OperationalError'

const errorHandler = (
    err: OperationalError | undefined,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof OperationalError) {
        const code = err.statusCode
        const message = err.message

        return res.status(code).json({ message })
    }
    if (err) return res.status(500)
    next()
}

export default errorHandler
