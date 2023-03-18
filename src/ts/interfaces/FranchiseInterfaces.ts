import { Request } from 'express'
import { FranchiseCategories } from '../types/FranchiseTypes'

export interface FranchiseGetRequest extends Request {
    id?: string
}
