import { NextFunction, Request, Response } from 'express'
import { OperationalError } from '../utils/OperationalError.js'

const errorHandler = (
    err: OperationalError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('Middleware Error Handling')
    if (err instanceof OperationalError) {
        const code = err.statusCode
        const message = err.message

        return res.status(code).json({ message })
    }

    return res.status(500).end()
}

export default errorHandler
