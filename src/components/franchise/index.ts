import { franchiseCollection } from '../..'
import FranchiseRepository from './franchise.repository'
import FranchiseService from './franchise.service'

export type FranchiseProps = {
    name: string
    category: FranchiseCategory
}

export type FranchiseCategory = 'Carwash' | 'Bakery'

export interface Franchise {
    name: string
    category: FranchiseCategory
}

export interface IFranchiseService {
    getFranchise(id: string): Promise<Franchise>
    getFranchises(): Promise<Franchise[]>
    createFranchise(props: FranchiseProps): Promise<Franchise>
    deleteFranchise(id: string): Promise<void>
}

const franchiseRepository = new FranchiseRepository(franchiseCollection)
export const franchiseService = new FranchiseService(franchiseRepository)
