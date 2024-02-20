import { Router } from 'express'
import FranchiseController from './franchise.controller'
import errorWrapper from '../../utils/errorWrapper'
import FranchiseService from '../../packages/franchise/franchise.service'
import FranchiseRepository from '../../packages/franchise/franchise.repository'
import { franchiseCollection } from '../..'

const router = () => {
    const servicePaths = Router()
    const franchiseRepository = new FranchiseRepository(franchiseCollection())
    const franchiseService = new FranchiseService(franchiseRepository)
    const franchiseController = new FranchiseController(franchiseService)

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

    servicePaths.delete(
        '/franchises/:id',
        franchiseController.delete.bind(franchiseController)
    )

    return servicePaths
}

export default router
