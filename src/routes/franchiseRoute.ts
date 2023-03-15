import { Router } from 'express'
import FranchiseController from '../controllers/franchiseController'
import Service from '../service'
import errorWrapper from '../utils/errorWrapper'

const router = (microservice: Service) => {
    const servicePaths = Router()
    const franchiseController = new FranchiseController(microservice)

    servicePaths.get(
        '/franchises',
        errorWrapper(franchiseController.get.bind(franchiseController))
    )

    servicePaths.post(
        '/franchises',
        franchiseController.create.bind(franchiseController)
    )

    servicePaths.delete(
        '/franchises/:id',
        franchiseController.delete.bind(franchiseController)
    )

    return servicePaths
}

export default router
