import express, { Express } from 'express'
import cors from 'cors'
import { MongoClient, Collection } from 'mongodb'
import routes from './routes'
import envs from './utils/env'
import errorHandler from './middlewares/errorHandler'

export default class Service {
    app: Express
    private port?: string
    collection?: Collection | undefined

    constructor() {
        this.app = express()
        this.port = envs('PORT_NUMBER')
    }

    init() {
        this.app.use(express.json())
        this.app.use(
            cors({
                origin: `http://localhost:${this.port}`,
            })
        )
    }

    async start() {
        //await this.createConnection()
        this.setRoutes()
        this.app.use(errorHandler)

        const server = this.app.listen(this.port, () => {
            console.log(
                `⚡️ Server is running at http://localhost:${this.port}`
            )
        })

        return server
    }

    private setRoutes() {
        const v1Routes = routes.v1(this)

        this.app.use('/api/v1', Object.values(v1Routes))
    }

    private async createConnection() {
        const client = new MongoClient(envs('DOCKER_MONGO_URL'))

        try {
            await client.connect()
            console.log('Connected to MongoDB!')

            const db = client.db(envs('DB_NAME'))

            //this.collection = await db.createCollection(envs('DB_NAME'));
            this.collection = db.collection(envs('COLLECTION_NAME'))
        } catch (err) {
            console.error(err)
        } finally {
            // await client.close();
        }
    }
}
