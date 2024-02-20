import { Collection, ObjectId } from 'mongodb'
import Franchise from './franchise.model'
import {
    FranchiseDocument,
    FranchiseProps,
} from '../../ts/types/FranchiseTypes'
import plainToClass from '../../utils/plainToClass'

export default class FranchiseRepository {
    private collection: Collection<FranchiseDocument>

    constructor(collection: Collection<FranchiseDocument>) {
        this.collection = collection
    }

    async getFranchise(id: string) {
        const franchiseDocument = await this.collection.findOne({
            _id: new ObjectId(id),
        })

        if (!franchiseDocument) throw new Error('No matches found.')

        const franchise = new Franchise(franchiseDocument)

        return franchise
    }

    async getFranchises(query: Record<string, unknown>) {
        const cursor = this.collection.find(query)
        const filteredDocs = await cursor.toArray()

        if (!filteredDocs) throw new Error('No matches found.')

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

    async deleteFranchise(id: string) {
        await this.collection.deleteOne({ _id: new ObjectId(id) })
    }
}
