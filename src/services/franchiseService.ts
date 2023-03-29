import FranchiseDAO from '../daos/franchiseDAO'
import { FranchiseProps } from '../ts/types/FranchiseTypes'

export default class FranchiseService {
    private dao: FranchiseDAO

    constructor(franchiseDAO: FranchiseDAO) {
        this.dao = franchiseDAO
    }

    async getFranchise(id: string) {
        const franchise = await this.dao.getFranchise(id)

        return franchise
    }

    async getFranchises(query: Record<string, unknown>) {
        const franchises = await this.dao.getFranchises(query)

        return franchises
    }

    async createFranchise(props: FranchiseProps) {
        const createdFranchise = await this.dao.createFranchise(props)

        return createdFranchise
    }

    async updateFranchise(id: string, query: Record<string, unknown>) {
        const updatedFranchise = await this.dao.updateFranchise(id, query)

        return updatedFranchise
    }

    async deleteFranchise(id: string) {
        await this.dao.deleteFranchise(id)
    }
}
