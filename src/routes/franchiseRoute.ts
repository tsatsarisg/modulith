import { Router } from 'express'
import { Collection } from 'mongodb'
import FranchiseController from '../controllers/franchiseController'
import Service from '../service'
import errorWrapper from '../utils/errorWrapper'

const router = (getCollection: Collection) => {
    const servicePaths = Router()
    const franchiseController = new FranchiseController(getCollection)

    servicePaths.get(
        '/franchises',
        errorWrapper(franchiseController.get.bind(franchiseController))
    )

    servicePaths.post(
        '/franchises',
        errorWrapper(franchiseController.create.bind(franchiseController))
    )

    servicePaths.delete(
        '/franchises/:id',
        franchiseController.delete.bind(franchiseController)
    )

    return servicePaths
}

export default router
