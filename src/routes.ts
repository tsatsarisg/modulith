import { Collection } from 'mongodb'
import franchiseRouter from './routes/franchiseRoute'
import Service from './service'

export default {
    v1: (getCollection: Collection) => ({
        franchiseRoutes: franchiseRouter(getCollection),
    }),
}
