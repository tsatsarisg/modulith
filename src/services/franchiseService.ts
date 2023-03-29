import MongoDBAdapter from '../adapters/MongoDBAdapter'
import FranchiseDAO from '../daos/franchiseDAO'
import Franchise from '../models/franchiseModel'
import { EError, FranchiseProps } from '../ts/types/FranchiseTypes'
import envs from '../utils/env'
import { OperationalError } from '../utils/OperationalError'
import plainToClass from '../utils/plainToClass'

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
        const filteredDocs = await this.dao.getFranchises(query)

        return filteredDocs
    }

    async createFranchise(props: FranchiseProps) {
        const createdFranchise = await this.dao.createFranchise(props)

        return createdFranchise
    }

    async updateFranchise(id: string, query: Record<string, unknown>) {
        const createdFranchise = await this.dao.updateFranchise(id, query)

        return createdFranchise
    }

    async deleteFranchise(id: string) {
        await this.dao.deleteFranchise(id)
    }
}
