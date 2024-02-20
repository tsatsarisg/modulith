import FranchiseRepository from './franchise.repository'
import { FranchiseProps, IFranchiseService } from './franchise.interface'
import FranchiseModel from './franchise.model'

export default class FranchiseService implements IFranchiseService {
    private repository: FranchiseRepository

    constructor(franchiseRepository: FranchiseRepository) {
        this.repository = franchiseRepository
    }

    async getFranchise(id: string) {
        return (await this.repository.getFranchise(id)).getFranchise
    }

    async getFranchises(query: Record<string, unknown>) {
        const franchises = await this.repository.getFranchises(query)

        return franchises.map((franchise) => franchise.getFranchise)
    }

    async createFranchise(props: FranchiseProps) {
        const franchise = new FranchiseModel({ ...props })
        await this.repository.createFranchise(props)
        return franchise.getFranchise
    }

    async deleteFranchise(id: string) {
        await this.repository.deleteFranchise(id)
    }
}
