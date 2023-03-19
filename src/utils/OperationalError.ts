import { EError } from '../ts/types/FranchiseTypes'

export class OperationalError extends Error {
    readonly type: EError
    readonly statusCode: number
    readonly name: string

    constructor(message: string, type: EError) {
        super(message)
        this.name = 'OperationalError'
        this.type = type
        this.statusCode = type
    }
}
