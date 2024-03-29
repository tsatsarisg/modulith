import { getEnv } from '@utils/env'
import Application from './App'

const microservice = new Application()

microservice.init()
microservice.start()

export const franchiseCollection = microservice.mongoAdapter.collection(
    getEnv('FRANCHISE_COLLECTION_NAME')
)

export const userCollection = microservice.mongoAdapter.collection(
    getEnv('USER_COLLECTION_NAME')
)
