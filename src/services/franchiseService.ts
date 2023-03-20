import MongoDBAdapter from '../adapters/MongoDBAdapter'
import Franchise from '../models/franchiseModel'
import { EError, FranchiseProps } from '../ts/types/FranchiseTypes'
import envs from '../utils/env'
import { OperationalError } from '../utils/OperationalError'
import plainToClass from '../utils/plainToClass'

export default class FranchiseService {
    private adapter: MongoDBAdapter

    constructor(mongoAdapter: MongoDBAdapter) {
        this.adapter = mongoAdapter
    }

    async getFranchises(filters: { id?: string }) {
        const query: Record<string, unknown> = {}

        const filteredDocs = await this.adapter.find(query)

        if (!filteredDocs)
            throw new OperationalError('No matches found.', EError.BadRequest)

        const typedFilteredDocs = plainToClass(filteredDocs, Franchise)
        typedFilteredDocs.map((item) => item.toJson())

        return typedFilteredDocs
    }

    async createFranchise(props: FranchiseProps) {
        const franchise = new Franchise(props)

        const createdFranchise = await this.adapter.insertOne(
            franchise.toJson()
        )

        return createdFranchise
    }

    async deleteFranchise(id: string) {
        await this.adapter.deleteOne(id)
    }
}
