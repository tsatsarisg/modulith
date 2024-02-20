export type FranchiseProps = {
    id?: string
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
    getFranchises(query: Record<string, unknown>): Promise<Franchise[]>
    createFranchise(props: FranchiseProps): Promise<Franchise>
    deleteFranchise(id: string): Promise<void>
}
