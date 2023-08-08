import { Collection, ObjectId } from 'mongodb'
import Franchise from '../models/franchise.model'
import {
    EError,
    FranchiseDocument,
    FranchiseProps,
} from '../ts/types/FranchiseTypes'
import { OperationalError } from '../utils/OperationalError'
import plainToClass from '../utils/plainToClass'

export default class FranchiseRepository {
    private collection: Collection<FranchiseDocument>

    constructor(collection: Collection<FranchiseDocument>) {
        this.collection = collection
    }

    async getFranchise(id: string) {
        const franchiseDocument = await this.collection.findOne({
            _id: new ObjectId(id),
        })

        if (!franchiseDocument)
            throw new OperationalError('No matches found.', EError.BadRequest)

        const franchise = new Franchise(franchiseDocument)

        return franchise
    }

    async getFranchises(query: Record<string, unknown>) {
        const cursor = this.collection.find(query)
        const filteredDocs = await cursor.toArray()

        if (!filteredDocs)
            throw new OperationalError('No matches found.', EError.BadRequest)

        const typedFilteredDocs = plainToClass(filteredDocs, Franchise)

        return typedFilteredDocs
    }

    async createFranchise(props: FranchiseProps) {
        const franchise = new Franchise(props)

        const createdFranchise = await this.collection.insertOne(
            franchise.toJson()
        )

        return createdFranchise
    }

    async updateFranchise(id: string, query: Record<string, unknown>) {
        const createdFranchise = await this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: query }
        )

        return createdFranchise
    }

    async deleteFranchise(id: string) {
        await this.collection.deleteOne({ _id: new ObjectId(id) })
    }
}
