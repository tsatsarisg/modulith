import { Request } from 'express'
import { ErrorTypes, FranchiseCategories } from '../types/FranchiseTypes.js'

export interface IFranchise {
    name: string
    category: FranchiseCategories
}

export interface FranchiseGetRequest extends Request {
    id?: string
}

export interface IError {
    message: string
    code: string
    type: ErrorTypes
}
