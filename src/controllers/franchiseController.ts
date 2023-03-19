import { NextFunction, Request, Response } from 'express'
import Service from '../service.js'
import FranchiseService from '../services/franchiseService.js'
import { FranchiseGetRequest } from '../ts/interfaces/FranchiseInterfaces'
import { FranchiseProps } from '../ts/types/FranchiseTypes.js'

export default class FranchiseController {
    private franchiseService: FranchiseService

    constructor() {
        this.franchiseService = new FranchiseService()
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
        const franchiseProps: FranchiseProps = { ...req.body }

        return res
            .status(201)
            .json(await this.franchiseService.createFranchise(franchiseProps))
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id

        return res.json(await this.franchiseService.deleteFranchise(id))
    }
}
