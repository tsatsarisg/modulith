import { ObjectId } from 'mongodb'

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
