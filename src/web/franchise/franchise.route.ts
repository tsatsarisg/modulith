import { Router } from 'express'
import FranchiseController from './franchise.controller'
import errorWrapper from '../../utils/errorWrapper'
import { franchiseService } from '../../components/franchise'

const router = () => {
    const servicePaths = Router()
    const franchiseController = new FranchiseController(franchiseService)

    servicePaths.get('/franchise', errorWrapper(franchiseController.get))
    servicePaths.get('/franchises', errorWrapper(franchiseController.list))
    servicePaths.post('/franchises', errorWrapper(franchiseController.create))
    servicePaths.delete('/franchises/:id', franchiseController.delete)

    return servicePaths
}

export default router
