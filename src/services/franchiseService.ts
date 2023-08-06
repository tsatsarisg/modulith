import FranchiseRepository from '../repositories/franchise.repository'
import { FranchiseProps } from '../ts/types/FranchiseTypes'

export default class FranchiseService {
    private repository: FranchiseRepository

    constructor(franchiseRepository: FranchiseRepository) {
        this.repository = franchiseRepository
    }

    async getFranchise(id: string) {
        const franchise = await this.repository.getFranchise(id)

        return franchise
    }

    async getFranchises(query: Record<string, unknown>) {
        const franchises = await this.repository.getFranchises(query)

        return franchises
    }

    async createFranchise(props: FranchiseProps) {
        const createdFranchise = await this.repository.createFranchise(props)

        return createdFranchise
    }

    async updateFranchise(id: string, query: Record<string, unknown>) {
        const updatedFranchise = await this.repository.updateFranchise(
            id,
            query
        )

        return updatedFranchise
    }

    async deleteFranchise(id: string) {
        await this.repository.deleteFranchise(id)
    }
}
