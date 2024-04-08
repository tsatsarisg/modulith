import { Router } from 'express'
import FranchiseController from './franchise.controller'
import errorWrapper from '../../utils/errorWrapper'
import { MongoAdapter } from '../../utils/MongoDBAdapter'
import { getEnv } from '../../utils/env'
import { buildFranchiseService } from '../../components/franchise'

const router = (mongoAdapter: MongoAdapter) => {
    const servicePaths = Router()
    const franchiseController = new FranchiseController(
        buildFranchiseService(
            mongoAdapter.collection(getEnv('FRANCHISE_COLLECTION_NAME'))
        )
    )

    servicePaths.get('/franchise', errorWrapper(franchiseController.get))
    servicePaths.get('/franchises', errorWrapper(franchiseController.list))
    servicePaths.post('/franchises', errorWrapper(franchiseController.create))
    servicePaths.delete('/franchises/:id', franchiseController.delete)

    return servicePaths
}

export default router
