import { MongoServerError, ObjectId } from 'mongodb'
import Franchise from '../models/franchiseModel'
import Service from '../service.js'
import { EError, FranchiseProps } from '../ts/types/FranchiseTypes'
import { OperationalError } from '../utils/OperationalError'
import plainToClass from '../utils/plainToClass'

export default class FranchiseService {
    constructor(private microservice: Service) {
        this.microservice = microservice
    }

    async getFranchises(filters: { id?: string }) {
        const query: Record<string, unknown> = {}
        if (filters.id) query._id = new ObjectId(filters.id)

        const filteredDocs = await this.microservice.collection
            ?.find(query)
            .toArray()

        if (!filteredDocs) throw new OperationalError('No matches found.', EError.BadRequest)

        const typedFilteredDocs = plainToClass(filteredDocs, Franchise)
        typedFilteredDocs.map((item) => item.toJson())

        return typedFilteredDocs
    }

    async createFranchise(props: FranchiseProps) {
        const franchise = new Franchise(props)

        const createdFranchise = await this.microservice.collection?.insertOne(franchise.toJson())
        
        return createdFranchise
        
    }

    async deleteFranchise(id: string) {
        const query: Record<string, unknown> = {}
        query._id = new ObjectId(id)

        const filteredDocs = await this.microservice.collection?.deleteOne(
            query
        )
        return filteredDocs
    }
}
