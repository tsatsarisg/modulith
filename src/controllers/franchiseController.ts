import { Request, Response } from 'express'
import FranchiseRepository from '../repositories/franchise.repository.js'
import FranchiseService from '../services/franchiseService.js'
import { FranchiseGetRequest } from '../ts/interfaces/FranchiseInterfaces'
import { EError, FranchiseProps } from '../ts/types/FranchiseTypes.js'
import { OperationalError } from '../utils/OperationalError.js'
import { franchiseCollection } from '../index.js'

export default class FranchiseController {
    private franchiseService: FranchiseService

    constructor() {
        const franchiseRepository = new FranchiseRepository(franchiseCollection)
        this.franchiseService = new FranchiseService(franchiseRepository)
    }

    async get(req: FranchiseGetRequest, res: Response) {
        const { id } = req.query
        if (!id)
            throw new OperationalError('No matches found.', EError.BadRequest)

        const franchise = await this.franchiseService.getFranchise(id as string)

        return res.status(200).json(franchise)
    }

    async list(req: FranchiseGetRequest, res: Response) {
        let filters = req.body
        const franchises = await this.franchiseService.getFranchises(filters)

        return res.status(200).json(franchises)
    }

    async create(req: Request, res: Response) {
        const franchiseProps: FranchiseProps = { ...req.body }

        return res
            .status(201)
            .json(await this.franchiseService.createFranchise(franchiseProps))
    }

    async update(req: FranchiseGetRequest, res: Response) {
        const { id } = req.query
        if (!id)
            throw new OperationalError('No matches found.', EError.BadRequest)

        let filters = req.body

        const franchise = await this.franchiseService.updateFranchise(
            id as string,
            filters
        )

        return res.status(200).json(franchise)
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id

        return res.json(await this.franchiseService.deleteFranchise(id))
    }
}
