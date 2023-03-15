import { EError } from '../ts/types/FranchiseTypes'

export class OperationalError extends Error {
    readonly type: EError
    readonly message: string
    readonly statusCode: number

    constructor(message: string, type: EError) {
        super(message)

        Object.setPrototypeOf(this, new.target.prototype)
        this.type = type
        this.message = message
        this.statusCode = type

        Error.captureStackTrace(this)
    }
}
