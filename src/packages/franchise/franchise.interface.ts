import Franchise from './franchise.model'

export type FranchiseProps = {
    id?: string
    name: string
    category: FranchiseCategories
}

export const franchiseCategories = ['Carwash', 'Bakery']

export type FranchiseCategories = 'Carwash' | 'Bakery'

export interface IFranchiseService {
    getFranchise(id: string): Promise<Franchise>
    getFranchises(query: Record<string, unknown>): Promise<Franchise[]>
    createFranchise(props: FranchiseProps): Promise<Franchise>
    deleteFranchise(id: string): Promise<void>
}
