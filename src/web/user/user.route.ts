import { Router } from 'express'
import UserController from './user.controller'
import { userService } from '@components/user'
import errorWrapper from '@utils/errorWrapper'

const router = () => {
    const servicePaths = Router()
    const userController = new UserController(userService)

    servicePaths.get('/users', errorWrapper(userController.get))
    servicePaths.post('/users', errorWrapper(userController.create))
    servicePaths.delete('/users/:id', userController.delete)

    return servicePaths
}

export default router
