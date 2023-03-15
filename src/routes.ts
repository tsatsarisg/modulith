import franchiseRouter from './routes/franchiseRoute'
import Service from './service'

export default {
    v1: (microservice: Service) => ({
        franchiseRoutes: franchiseRouter(microservice),
    }),
}
