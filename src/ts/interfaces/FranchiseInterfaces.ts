import { Request } from 'express'
import { FranchiseCategories } from '../types/FranchiseTypes'

export interface IFranchise {
    name: string
    category: FranchiseCategories
}

export interface FranchiseGetRequest extends Request {
    id?: string
}
