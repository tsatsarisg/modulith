import { MongoClient, Db, Collection } from 'mongodb'
import { FranchiseDocument } from '../ts/types/FranchiseTypes'

export class MongoDomain {
    private db!: Db
    private client!: MongoClient
    private url: string

    constructor(url: string) {
        this.url = url
        this.client = new MongoClient(this.url)
    }

    async connect(dbName: string): Promise<void> {
        await this.client.connect()
        console.log('Connected to MongoDB!')

        this.db = this.client.db(dbName)
    }

    async disconnect(): Promise<void> {
        await this.client.close()
    }

    collection(name: string): Collection<FranchiseDocument> {
        return this.db.collection(name)
    }
}
