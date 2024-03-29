import franchiseRouter from './web/franchise/franchise.route'
import userRouter from './web/user/user.route'

export default {
    franchiseRoutes: franchiseRouter(),
    userRoutes: userRouter(),
}
