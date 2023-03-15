import { MongoServerError, ObjectId } from 'mongodb'
import Franchise from '../models/franchiseModel'
import Service from '../service.js'
import { IFranchise } from '../ts/interfaces/FranchiseInterfaces'

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

        return filteredDocs
    }

    async createFranchise(props: IFranchise) {
        const franchise = new Franchise(props)

        try {
            const createdFranchise =
                await this.microservice.collection?.insertOne(franchise)
            return createdFranchise
        } catch (error) {
            if (error instanceof MongoServerError) {
                console.log(`Error worth logging: ${error}`)
            }
            throw error
        }
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
