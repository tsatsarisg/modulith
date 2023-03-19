import { MongoClient, Db, Collection, ObjectId } from 'mongodb'

class MongoDBAdapter {
    private db!: Db
    private client!: MongoClient
    private url: string

    constructor(url: string) {
        this.url = url
        this.client = new MongoClient(this.url)
    }

    async connect(dbName: string): Promise<void> {
        await this.client.connect()
        this.db = this.client.db(dbName)
    }

    async disconnect(): Promise<void> {
        await this.client.close()
    }

    collection(name: string): Collection<any> {
        return this.db.collection(name)
    }

    async find(collectionName: string, query: any): Promise<any[]> {
        const collection = this.collection(collectionName)
        return collection.find(query).toArray()
    }

    async findOne(
        collectionName: string,
        query: Record<string, unknown>
    ): Promise<unknown> {
        const collection = this.collection(collectionName)
        return collection.findOne(query)
    }

    async findById(collectionName: string, id: string): Promise<any> {
        const objectId = new ObjectId(id)
        const query = { _id: objectId }
        return this.findOne(collectionName, query)
    }

    async insertOne(collectionName: string, data: any): Promise<void> {
        const collection = this.collection(collectionName)
        await collection.insertOne(data)
    }

    async updateOne<T>(
        collectionName: string,
        id: string,
        data: Record<string, unknown>
    ): Promise<void> {
        const objectId = new ObjectId(id)
        const query = { _id: objectId }
        const collection = this.collection(collectionName)
        await collection.updateOne(query, { $set: data })
    }

    async deleteOne(collectionName: string, id: string): Promise<void> {
        const objectId = new ObjectId(id)
        const query = { _id: objectId }
        const collection = this.collection(collectionName)
        await collection.deleteOne(query)
    }
}

export default MongoDBAdapter
