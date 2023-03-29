import { NextFunction, Request, Response } from 'express'
import { Collection } from 'mongodb'
import MongoDBAdapter from '../adapters/MongoDBAdapter.js'
import FranchiseDAO from '../daos/franchiseDAO.js'
import FranchiseService from '../services/franchiseService.js'
import { FranchiseGetRequest } from '../ts/interfaces/FranchiseInterfaces'
import { EError, FranchiseProps } from '../ts/types/FranchiseTypes.js'
import { OperationalError } from '../utils/OperationalError.js'

export default class FranchiseController {
    private franchiseService: FranchiseService

    constructor(getCollection: Collection) {
        const mongoAdapter = new MongoDBAdapter(getCollection)
        const franchiseDAO = new FranchiseDAO(mongoAdapter)
        this.franchiseService = new FranchiseService(franchiseDAO)
    }

    async get(req: FranchiseGetRequest, res: Response) {
        const { id } = req.query
        if (!id)
            throw new OperationalError('No matches found.', EError.BadRequest)

        const franchise = await this.franchiseService.getFranchise(id as string)

        return res.status(200).json(franchise)
    }

    async list(req: FranchiseGetRequest, res: Response) {
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
