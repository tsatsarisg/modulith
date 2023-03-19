import express, { Express } from 'express'
import cors from 'cors'
import routes from './routes'
import envs from './utils/env'
import errorHandler from './middlewares/errorHandler'

export default class Service {
    private app: Express
    private port: string

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
        const v1Routes = routes.v1()

        this.app.use('/api/v1', Object.values(v1Routes))
    }
}
