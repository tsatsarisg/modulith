import Service from './service'

const microservice = new Service()

microservice.init()
microservice.start()

export const franchiseCollection = microservice.getCollection
