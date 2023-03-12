import { NextFunction, Request, Response } from 'express'
import Service from '../service.js'
import FranchiseService from '../services/franchiseService.js'
import {
    FranchiseGetRequest,
    IFranchise,
} from '../ts/interfaces/FranchiseInterfaces.js'
import { EError } from '../ts/types/FranchiseTypes.js'
import { OperationalError } from '../utils/OperationalError.js'

export default class FranchiseController {
    private franchiseService: FranchiseService

    constructor(private microservice: Service) {
        this.microservice = microservice
        this.franchiseService = new FranchiseService(this.microservice)
    }

    async get(req: FranchiseGetRequest, res: Response, next: NextFunction) {
        const { id } = req.query
        let filters = {}

        if (id)
            filters = {
                id: String(id),
            }

        const franchises = await this.franchiseService.getFranchises(filters)

        return res.status(200).json(franchises)
    }

    async create(req: Request, res: Response) {
        const franchiseProps: IFranchise = { ...req.body }

        return res
            .status(201)
            .json(await this.franchiseService.createFranchise(franchiseProps))
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id

        return res.json(await this.franchiseService.deleteFranchise(id))
    }
}
