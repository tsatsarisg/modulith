import franchiseRouter from './controllers/franchise/franchise.route'

export default {
    v1: () => ({
        franchiseRoutes: franchiseRouter(),
    }),
}
