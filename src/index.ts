import Application from './App'

const microservice = new Application()

microservice.init()
microservice.start()

const FRANCHISE_COLLECTION_NAME = process.env.COLLECTION_NAME || ''
export const franchiseCollection = microservice.mongoAdapter.collection(
    FRANCHISE_COLLECTION_NAME
)
