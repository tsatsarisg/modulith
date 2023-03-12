import { EError } from '../ts/types/FranchiseTypes.js'

export class OperationalError extends Error {
    type: EError
    message: string
    statusCode: number

    constructor(message: string, type: EError) {
        super(message)

        Object.setPrototypeOf(this, new.target.prototype)
        this.type = type
        this.message = message
        this.statusCode = type

        Error.captureStackTrace(this)
    }
}
