import Service from './service'

const microservice = new Service()

microservice.init()
microservice.start()

export function franchiseCollection() {
    return microservice.getCollection
}
