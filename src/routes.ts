import franchiseRouter from './routes/franchiseRoute'

export default {
    v1: () => ({
        franchiseRoutes: franchiseRouter(),
    }),
}
