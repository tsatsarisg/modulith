import { MongoServerError, ObjectId } from 'mongodb'
import MongoDBAdapter from '../adapters/MongoDBAdapter'
import Franchise from '../models/franchiseModel'
import Service from '../service.js'
import { EError, FranchiseProps } from '../ts/types/FranchiseTypes'
import envs from '../utils/env'
import { OperationalError } from '../utils/OperationalError'
import plainToClass from '../utils/plainToClass'

export default class FranchiseService {
    private adapter: MongoDBAdapter

    constructor() {
        this.adapter = new MongoDBAdapter(envs('DOCKER_MONGO_URL'))
    }

    async getFranchises(filters: { id?: string }) {
        const query: Record<string, unknown> = {}
        if (filters.id) query._id = new ObjectId(filters.id)

        const filteredDocs = await this.withDatabaseConnection(
            async () => await this.adapter.find('franchises', {})
        )

        if (!filteredDocs)
            throw new OperationalError('No matches found.', EError.BadRequest)

        const typedFilteredDocs = plainToClass(filteredDocs, Franchise)
        typedFilteredDocs.map((item) => item.toJson())

        return typedFilteredDocs
    }

    async createFranchise(props: FranchiseProps) {
        const franchise = new Franchise(props)

        const createdFranchise = await this.withDatabaseConnection(
            async () =>
                await this.adapter.insertOne('franchises', franchise.toJson())
        )

        return createdFranchise
    }

    async deleteFranchise(id: string) {
        console.log(id)
        const filteredDocs = await this.withDatabaseConnection(
            async () => await this.adapter.deleteOne('franchises', id)
        )
        return filteredDocs
    }

    async withDatabaseConnection(callback: () => Promise<any>) {
        await this.adapter.connect('franchises')
        try {
            const result = await callback()
            return result
        } finally {
            await this.adapter.disconnect()
        }
    }
}
