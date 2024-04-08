import { Router } from 'express'
import UserController from './user.controller'
import errorWrapper from '../../utils/errorWrapper'
import { buildUserService } from '../../components/user'
import { MongoAdapter } from '../../utils/MongoDBAdapter'

const router = (mongoAdapter: MongoAdapter) => {
    const servicePaths = Router()
    const userController = new UserController(
        buildUserService(mongoAdapter.collection('USER_COLLECTION_NAME'))
    )

    servicePaths.get('/users', errorWrapper(userController.get))
    servicePaths.post('/users', errorWrapper(userController.create))
    servicePaths.delete('/users/:id', userController.delete)

    return servicePaths
}

export default router
