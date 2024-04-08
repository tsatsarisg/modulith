import buildComponents from './components'
import { MongoAdapter } from './utils/MongoDBAdapter'
import franchiseRouter from './web/franchise/franchise.route'
import userRouter from './web/user/user.route'

export default (mongoAdapter: MongoAdapter) => {
    const components = buildComponents(mongoAdapter)

    return {
        franchiseRoutes: franchiseRouter(components),
        userRoutes: userRouter(components),
    }
}
