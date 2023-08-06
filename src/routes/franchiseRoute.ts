import { Router } from 'express'
import FranchiseController from '../controllers/franchiseController'
import errorWrapper from '../utils/errorWrapper'

const router = () => {
    const servicePaths = Router()
    const franchiseController = new FranchiseController()

    servicePaths.get(
        '/franchise',
        errorWrapper(franchiseController.get.bind(franchiseController))
    )

    servicePaths.get(
        '/franchises',
        errorWrapper(franchiseController.list.bind(franchiseController))
    )

    servicePaths.post(
        '/franchises',
        errorWrapper(franchiseController.create.bind(franchiseController))
    )

    servicePaths.put(
        '/franchises',
        errorWrapper(franchiseController.update.bind(franchiseController))
    )

    servicePaths.delete(
        '/franchises/:id',
        franchiseController.delete.bind(franchiseController)
    )

    return servicePaths
}

export default router
