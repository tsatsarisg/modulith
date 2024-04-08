import { MongoAdapter } from './utils/MongoDBAdapter'
import franchiseRouter from './web/franchise/franchise.route'
import userRouter from './web/user/user.route'

export default (mongoAdapter: MongoAdapter) => ({
    franchiseRoutes: franchiseRouter(mongoAdapter),
    userRoutes: userRouter(mongoAdapter),
})
