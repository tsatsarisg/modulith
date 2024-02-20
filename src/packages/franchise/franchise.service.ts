import FranchiseRepository from './franchise.repository'
import { FranchiseProps } from '../../ts/types/FranchiseTypes'
import { IFranchiseService } from './franchise.interface'
import Franchise from './franchise.model'

export default class FranchiseService implements IFranchiseService {
    private repository: FranchiseRepository

    constructor(franchiseRepository: FranchiseRepository) {
        this.repository = franchiseRepository
    }

    async getFranchise(id: string) {
        return await this.repository.getFranchise(id)
    }

    async getFranchises(query: Record<string, unknown>) {
        const franchises = await this.repository.getFranchises(query)

        return franchises
    }

    async createFranchise(props: FranchiseProps) {
        const franchise = new Franchise({ ...props })
        await this.repository.createFranchise(props)
        return franchise
    }

    async deleteFranchise(id: string) {
        await this.repository.deleteFranchise(id)
    }
}
