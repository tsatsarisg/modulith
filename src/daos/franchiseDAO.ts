import MongoDBAdapter from '../adapters/MongoDBAdapter'
import Franchise from '../models/franchiseModel'
import {
    EError,
    FranchiseDocument,
    FranchiseProps,
} from '../ts/types/FranchiseTypes'
import { OperationalError } from '../utils/OperationalError'
import plainToClass from '../utils/plainToClass'

export default class FranchiseDAO {
    private adapter: MongoDBAdapter

    constructor(mongoAdapter: MongoDBAdapter) {
        this.adapter = mongoAdapter
    }

    async getFranchise(id: string) {
        const franchiseDocument: FranchiseDocument =
            await this.adapter.findById(id)

        if (!franchiseDocument)
            throw new OperationalError('No matches found.', EError.BadRequest)

        const franchise = new Franchise(franchiseDocument)

        return franchise
    }

    async getFranchises(query: Record<string, unknown>) {
        const filteredDocs = await this.adapter.find(query)

        if (!filteredDocs)
            throw new OperationalError('No matches found.', EError.BadRequest)

        const typedFilteredDocs = plainToClass(filteredDocs, Franchise)

        return typedFilteredDocs
    }

    async createFranchise(props: FranchiseProps) {
        const franchise = new Franchise(props)

        const createdFranchise = await this.adapter.insertOne(
            franchise.toJson()
        )

        return createdFranchise
    }

    async updateFranchise(id: string, query: Record<string, unknown>) {
        const createdFranchise = await this.adapter.updateOne(id, query)

        return createdFranchise
    }

    async deleteFranchise(id: string) {
        await this.adapter.deleteOne(id)
    }
}
