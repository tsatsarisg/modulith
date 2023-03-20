import { MongoClient, Db, Collection, ObjectId } from 'mongodb'

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

    collection(name: string): Collection<any> {
        return this.db.collection(name)
    }
}

class MongoDBAdapter {
    private collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    async find(query: any): Promise<any[]> {
        return this.collection.find(query).toArray()
    }

    async findOne(query: Record<string, unknown>): Promise<unknown> {
        return this.collection.findOne(query)
    }

    async findById(id: string): Promise<any> {
        const objectId = new ObjectId(id)
        const query = { _id: objectId }
        return this.findOne(query)
    }

    async insertOne(data: any): Promise<void> {
        await this.collection.insertOne(data)
    }

    async updateOne<T>(
        id: string,
        data: Record<string, unknown>
    ): Promise<void> {
        const objectId = new ObjectId(id)
        const query = { _id: objectId }

        await this.collection.updateOne(query, { $set: data })
    }

    async deleteOne(id: string): Promise<void> {
        const objectId = new ObjectId(id)
        const query = { _id: objectId }

        await this.collection.deleteOne(query)
    }
}

export default MongoDBAdapter
