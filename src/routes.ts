import franchiseRouter from './routes/franchiseRoute'
import Service from './service'

export default {
    v1: () => ({
        franchiseRoutes: franchiseRouter(),
    }),
}
