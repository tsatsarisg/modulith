import franchiseRouter from './routes/franchiseRoute.js'
import Service from './service.js'

export default {
    v1: (microservice: Service) => ({
        franchiseRoutes: franchiseRouter(microservice),
    }),
}
