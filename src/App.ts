import express, { Express } from 'express'
import cors from 'cors'
import routes from './routes'
import errorHandler from './utils/middlewares/errorHandler'
import { MongoAdapter } from './utils/MongoDBAdapter'
import { getEnv } from './utils/env'

const MONGO_URL = getEnv('DOCKER_MONGO_URL')
const PORT_NUMBER = getEnv('PORT_NUMBER')

export default class Application {
    public mongoAdapter!: MongoAdapter
    private app: Express
    private port: string

    constructor() {
        this.app = express()
        this.port = PORT_NUMBER
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
        await this.createConnection()
        this.setRoutes()
        this.app.use(errorHandler)

        this.app.listen(this.port, () => {
            console.log(
                `⚡️ Server is running at http://localhost:${this.port}`
            )
        })
    }

    private setRoutes() {
        this.app.use('/api', Object.values(routes))
    }

    private async createConnection() {
        const mongoAdapter = new MongoAdapter(MONGO_URL)

        await mongoAdapter.connect()
        this.mongoAdapter = mongoAdapter
    }
}
