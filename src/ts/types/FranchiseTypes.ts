import { ObjectId } from 'mongodb'

export enum EError {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500,
}
export const franchiseCategories = ['Carwash', 'Bakery']

export type FranchiseCategories = 'Carwash' | 'Bakery'

export type FranchiseProps = {
    _id?: ObjectId
    name: string
    category: FranchiseCategories
}

export type FranchiseDocument = {
    _id?: ObjectId
    name: string
    category: FranchiseCategories
}
